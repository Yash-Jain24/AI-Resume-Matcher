import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-brand">AI Resume Matcher</div>
      <div className="nav-links">
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/resume">Resume</NavLink>
        <NavLink to="/jobs">Jobs</NavLink>
      </div>
      <div>
        <span style={{ marginRight: '1rem' }}>Welcome, {user?.name || 'Guest'}!</span>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
};

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <Navbar />
      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;