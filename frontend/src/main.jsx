import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { AuthProvider } from './hooks/useAuth';
import { ResumeProvider } from './hooks/useResume'; // Import this

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ResumeProvider> {/* Add this wrapper */}
        <App />
      </ResumeProvider>
    </AuthProvider>
  </React.StrictMode>
);