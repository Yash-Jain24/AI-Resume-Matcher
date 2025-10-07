import { useState } from 'react';
import axios from 'axios';
import { useResume } from '../hooks/useResume';

const mockJobs = [
    { id: 1, title: "Frontend Developer", description: "Looking for a React expert with experience in TypeScript and GraphQL. Must know Node.js for server-side rendering." },
    { id: 2, title: "Backend Engineer", description: "Seeking a Python and Django developer. Experience with PostgreSQL, Redis, and Docker is a must. AWS knowledge is a plus." },
    { id: 3, title: "DevOps Specialist", description: "Requires strong skills in Kubernetes, Terraform, and Jenkins for our CI/CD pipelines. Scripting in Bash or Python needed." }
];

const JobsPage = () => {
    const [jobs, setJobs] = useState(mockJobs);
    const [selectedJob, setSelectedJob] = useState(mockJobs[0]);
    const [customJD, setCustomJD] = useState('');
    const [matchResult, setMatchResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { resumeSkills } = useResume();

    // The core matching logic is now much smarter
    const calculateMatch = async (jobDescription) => {
        if (resumeSkills.length === 0) {
            alert("Please upload and process your resume on the 'Resume' tab first!");
            return;
        }
        if (!jobDescription.trim()) {
            alert("Job description cannot be empty.");
            return;
        }

        setIsLoading(true);
        setMatchResult(null);

        try {
            // 1. Get required skills from our intelligent backend
            const response = await axios.post('http://localhost:5001/api/jobs/analyze', {
                description: jobDescription
            });
            const requiredSkills = new Set(response.data.skills);

            // 2. Compare with resume skills
            const resumeSkillsSet = new Set(resumeSkills.map(s => s.toLowerCase()));
            
            const matchedSkills = [...requiredSkills].filter(skill => resumeSkillsSet.has(skill));
            const missingSkills = [...requiredSkills].filter(skill => !resumeSkillsSet.has(skill));
            
            const score = requiredSkills.size > 0 ? (matchedSkills.length / requiredSkills.size) * 100 : 0;
            
            setMatchResult({
                score: Math.round(score),
                matched: matchedSkills,
                missing: missingSkills
            });

        } catch (error) {
            console.error("Error calculating match:", error);
            alert("Failed to analyze the job description. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="page-header">Job Matching</h1>
            {/* ... The JSX for jobs-grid and job-description remains the same ... */}
            <div className="jobs-grid">
                <div className="job-list">
                     <h3>Available Jobs</h3>
                    {jobs.map(job => (
                        <div key={job.id} 
                             className={`job-item ${selectedJob?.id === job.id ? 'selected' : ''}`}
                             onClick={() => { setSelectedJob(job); setMatchResult(null); }}>
                            {job.title}
                        </div>
                    ))}
                </div>
                <div className="job-description">
                    <h3>Job Description</h3>
                    <p>{selectedJob?.description}</p>
                    <hr/>
                    <h3>Or, Paste Your Own JD</h3>
                    <textarea value={customJD} onChange={(e) => setCustomJD(e.target.value)} placeholder="Paste job description here..."></textarea>
                    <div className="calculate-match-area">
                        <button 
                            onClick={() => calculateMatch(customJD || selectedJob.description)} 
                            className="modern-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Analyzing...' : 'Calculate Match'}
                        </button>
                    </div>
                </div>
            </div>
            
            {/* ... The JSX for displaying match results remains the same ... */}
            {matchResult && (
                 <div className="match-results-container card">
                 <h3>Match Analysis</h3>
                 <p className="match-score">{matchResult.score}%</p>
                 <div className="skills-analysis">
                     <div className="skills-box">
                         <h4>✅ Matched Skills</h4>
                         <ul className="skills-list">
                             {matchResult.matched.length > 0 ? matchResult.matched.map(s => <li key={s}>{s}</li>) : <li>None.</li>}
                         </ul>
                     </div>
                     <div className="skills-box">
                         <h4>❌ Missing Skills</h4>
                         <ul className="skills-list">
                             {matchResult.missing.length > 0 ? matchResult.missing.map(s => <li key={s}>{s}</li>) : <li>None!</li>}
                         </ul>
                     </div>
                 </div>
             </div>
            )}
        </div>
    );
};

export default JobsPage;