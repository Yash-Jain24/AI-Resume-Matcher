import { useState } from 'react';
import axios from 'axios';
import { useResume } from '../hooks/useResume'; // Import the hook

const ResumePage = () => {
    const [file, setFile] = useState(null);
    const [processedResume, setProcessedResume] = useState(null);
    const [message, setMessage] = useState('');
    const { setResumeSkills, setResumeText } = useResume(); // Use the context setter

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('resume', file);
        setMessage('Processing...');
        try {
            // NOTE: Add authentication token if you secured the route
            // const { token } = JSON.parse(localStorage.getItem('user'));
            // const config = { headers: { 'Authorization': `Bearer ${token}` } };
            const res = await axios.post('http://localhost:5001/api/resumes/upload', formData);
            
            setProcessedResume(res.data.resume);
            // Save skills and text to global context
            setResumeSkills(res.data.resume.extractedSkills);
            setResumeText(res.data.resume.originalText);
            
            setMessage('Resume processed successfully!');
        } catch (error) {
            setMessage('Error uploading file.');
            console.error(error);
        }
    };
    
    return (
        <div className="page-container">
            <h1 className="page-header">Upload & Process Resume</h1>
            <div className="card">
                <h3>Upload Your Resume File (PDF only)</h3>
                <input type="file" onChange={handleFileChange} style={{color: '#fff', background: '#1a1a2e', padding: '10px'}}/>
                <button onClick={handleUpload} disabled={!file} className="modern-button">Process Resume</button>
                {message && <p>{message}</p>}
            </div>

            {processedResume && (
                <div className="card">
                    <h3>Extracted Skills</h3>
                    <div className="skills-container">
                        {processedResume.extractedSkills.length > 0 ? processedResume.extractedSkills.map((skill, index) => (
                            <span key={index} className="skill-tag">{skill}</span>
                        )) : <p>No skills were extracted. The NLP model may need tuning.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};
export default ResumePage;