import { createContext, useContext, useState, useMemo } from 'react';

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumeSkills, setResumeSkills] = useState([]);
  const [resumeText, setResumeText] = useState('');

  const value = useMemo(() => ({
    resumeSkills,
    setResumeSkills,
    resumeText,
    setResumeText
  }), [resumeSkills, resumeText]);

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};

export const useResume = () => {
  return useContext(ResumeContext);
};