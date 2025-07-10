import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qna-web-backend.onrender.com', // Your backend Render URL
  timeout: 5000,
  withCredentials: true, // Allows cookies or secure headers if needed
});

// Add Authorization header automatically if token is stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
