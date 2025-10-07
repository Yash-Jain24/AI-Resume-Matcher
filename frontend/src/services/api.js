import axios from 'axios';

// This line reads the VITE_API_URL from the environment variables.
// If it's not found (like in local development), it defaults to localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
    baseURL: API_URL
});

// We can also add an interceptor to automatically include the auth token
api.interceptors.request.use(config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;