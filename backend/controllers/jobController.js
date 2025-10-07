const Job = require('../models/Job');
const Resume = require('../models/Resume');
const axios = require('axios');
const { extractKeywordsWithNLP } = require('../services/nlpService');

exports.postJob = async (req, res) => {
    try {
        const { title, description } = req.body;
        const { skills } = await extractKeywordsWithNLP(description);
        const newJob = new Job({ title, description, requiredSkills: skills });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().select('title');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

exports.findMatchesForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ message: 'Job not found.' });

        const resumes = await Resume.find({});
        const matches = resumes.map(resume => {
            const jobSkills = new Set(job.requiredSkills.map(s => s.toLowerCase()));
            const resumeSkills = new Set(resume.extractedSkills.map(s => s.toLowerCase()));

            const intersection = new Set([...jobSkills].filter(skill => resumeSkills.has(skill)));
            const union = new Set([...jobSkills, ...resumeSkills]);
            const score = union.size === 0 ? 0 : (intersection.size / jobSkills.size) * 100;

            const missingSkills = [...jobSkills].filter(skill => !resumeSkills.has(skill));
            const matchedSkills = [...intersection];

            return {
                resumeId: resume._id,
                candidateName: resume.candidateName,
                score: score > 100 ? 100 : Math.round(score),
                missingSkills,
                matchedSkills,
            };
        }).sort((a, b) => b.score - a.score);

        res.json(matches);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
};
exports.analyzeJobDescription = async (req, res) => {
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ message: 'Job description is required.' });
    }

    try {
        const nlpApiUrl = process.env.SPACY_SERVICE_URL ? `${process.env.SPACY_SERVICE_URL}/analyze_jd` : 'http://localhost:5002/analyze_jd';
        const nlpResponse = await axios.post(nlpApiUrl, ... {
            text: description
        });
        res.json(nlpResponse.data); // Forward the response { skills: [...] } to the frontend
    } catch (error) {
        console.error("Error calling NLP service for JD analysis:", error.message);
        res.status(500).json({ message: "Failed to analyze job description." });
    }
};