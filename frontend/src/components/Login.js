import React, { useState } from 'react';
import api from 'api';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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
      const res = await api.post('/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      setMessage('Login successful');

      setTimeout(() => {
        setIsLoading(false);
        navigate('/'); // Navigate home after login
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Check your email or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4" style={{ color: '#ff5733' }}>Welcome Back</h2>

        {message && (
          <div className={`alert ${message.includes('failed') ? 'alert-danger' : 'alert-success'} text-center`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            style={{ backgroundColor: '#ff5733', color: '#ffffff', border: '2px solid #4a704a', padding: '8px' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#ff5733', textDecoration: 'none' }} className="fw-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
