const fs = require('fs');
const pdf = require('pdf-parse');

// This function now correctly uses a dedicated library to parse PDF files.
async function parseResumeWithCpp(filePath) {
    try {
        console.log(`Parsing PDF file with pdf-parse: ${filePath}`);
        
        // Read the file buffer from the disk
        const dataBuffer = fs.readFileSync(filePath);
        
        // Let pdf-parse extract the text content
        const data = await pdf(dataBuffer);
        
        // Clean up the file from the /uploads directory after parsing
        fs.unlinkSync(filePath);

        return data.text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        // Clean up the file even if parsing fails
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw new Error("Failed to parse PDF file.");
    }
}

module.exports = { parseResumeWithCpp };