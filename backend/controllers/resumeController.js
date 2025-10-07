const Resume = require('../models/Resume');
const { parseResumeWithCpp } = require('../services/parserService');
const { extractKeywordsWithNLP } = require('../services/nlpService');

exports.uploadResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    try {
        const rawText = await parseResumeWithCpp(req.file.path);
        const { skills, name } = await extractKeywordsWithNLP(rawText);

        const newResume = new Resume({
            filename: req.file.originalname,
            originalText: rawText,
            extractedSkills: skills,
            candidateName: name
        });
        await newResume.save();

        res.status(201).json({ message: 'Resume processed!', resume: newResume });
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).json({ message: 'Server error during processing.' });
    }
};

exports.getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find().select('filename candidateName');
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};