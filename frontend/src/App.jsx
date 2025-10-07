import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardLayout from './pages/DashboardLayout';
import ProfilePage from './pages/ProfilePage';
import ResumePage from './pages/ResumePage';
import JobsPage from './pages/JobsPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <DashboardLayout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/profile" />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="jobs" element={<JobsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;