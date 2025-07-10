import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qna-web-backend.onrender.com', // Replace with your backend URL (e.g., your server address)
  timeout: 5000, // Optional: set a timeout for requests
});

// Optional: Add a request interceptor to include the token in all requests
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