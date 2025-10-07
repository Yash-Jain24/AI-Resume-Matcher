const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalText: { type: String }, // Raw text from parsing
    extractedSkills: [{ type: String }],
    candidateName: { type: String, default: 'N/A' },
    // Add other fields like 'experience', 'education', etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', ResumeSchema);