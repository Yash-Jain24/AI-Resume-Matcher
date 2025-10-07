const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }, // The full JD text
    requiredSkills: [{ type: String }],
    // Add other fields like 'company', 'location', etc.
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);