const axios = require('axios');

// The URL of our local Python service
const SPACY_SERVICE_URL = "http://localhost:5002/extract";

async function extractKeywordsWithNLP(text) {
    console.log("Using local spaCy NLP Microservice...");

    try {
        // Send the resume text to the Python service
        const response = await axios.post(SPACY_SERVICE_URL, { text });
        
        // The Python service returns data in the format { name, skills }
        console.log("Extracted Name:", response.data.name);
        console.log("Extracted Skills:", response.data.skills);
        
        return response.data;

    } catch (error) {
        // This error will be shown if the Python service is not running
        console.error("Could not connect to spaCy microservice. Is it running?", error.message);
        return { skills: ['error: nlp service unavailable'], name: 'N/A' };
    }
}

module.exports = { extractKeywordsWithNLP };