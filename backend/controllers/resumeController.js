const Resume = require('../models/Resume');
const { extractKeywordsWithNLP } = require('../services/nlpService');
const pdf = require('pdf-parse'); // 1. Require pdf-parse directly

exports.uploadResume = async (req, res) => {
    // 2. Check if req.file exists and has a buffer
    if (!req.file || !req.file.buffer) {
        return res.status(400).json({ message: 'No file uploaded or file is empty.' });
    }

    try {
        // 3. Parse the PDF directly from the memory buffer
        const pdfData = await pdf(req.file.buffer);
        const rawText = pdfData.text;

        // 4. The rest of the logic remains the same
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