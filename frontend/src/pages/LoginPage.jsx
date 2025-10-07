import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegister ? '/register' : '/login';
    const payload = isRegister ? { name, email, password } : { email, password };

    try {
      const { data } = await api.post(`/auth${endpoint}`, payload);
      login(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };
  
  const handleGuestLogin = () => {
      // For guest access, we can create a mock user object without a token
      // or handle guest state differently. Here's a simple mock.
      const guestUser = { name: "Guest", email: "guest@example.com", isGuest: true };
      login(guestUser);
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isRegister ? 'Create Account' : 'Welcome Back'}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegister && (
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="modern-button w-full" >{isRegister ? 'Register' : 'Login'}</button>
        </form>
        <p className="auth-toggle" onClick={() => setIsRegister(!isRegister)}>
          {isRegister 
            ? <>Already have an account? <span>Login</span></> 
            : <>Don't have an account? <span>Register</span></>
          }
        </p>
        <p className="guest-login-btn" onClick={handleGuestLogin}>
          Or, Continue as a Guest
        </p>
      </div>
    </div>
  );
};

export default LoginPage;