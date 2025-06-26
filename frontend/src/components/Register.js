import React, { useState } from 'react';
import api from './api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    try {
      const res = await api.post('/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        setIsLoading(false);
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('Registration failed. Email or username might already exist.');
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#ff8c42' }}>Join Us</h2>
        {message && (
          <div className={`alert ${message.includes('failed') ? 'alert-danger' : 'alert-success'} text-center`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#ff8c42', color: '#ffffff', border: 'none', transition: 'background-color 0.3s' }}
            disabled={isLoading}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e07b38')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff8c42')}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" style={{ color: '#ff8c42', textDecoration: 'none' }} className="fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;