import axios from 'axios';

// 1. Define the base URL from the environment variable or localhost for development
const SPACY_BASE_URL = process.env.SPACY_SERVICE_URL || "http://localhost:5002";

async function extractKeywordsWithNLP(text) {
    console.log(`Using NLP Microservice at base: ${SPACY_BASE_URL}`);

    try {
        // 2. Always append the correct endpoint path to the base URL
        const response = await axios.post(`${SPACY_BASE_URL}/extract`, { text });
        
        console.log("Extracted Name:", response.data.name);
        console.log("Extracted Skills:", response.data.skills);
        
        return response.data;

    } catch (error) {
        console.error("Could not connect to or process with spaCy microservice. Is it running?", error.message);
        // This is the error message you are seeing on the frontend
        return { skills: ['error: nlp service unavailable'], name: 'N/A' };
    }
}

export default {
    extractKeywordsWithNLP
};