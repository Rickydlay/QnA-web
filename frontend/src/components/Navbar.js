import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import SearchBar from './SearchBar';
import React, { useState } from 'react';

const Navbar = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic is now in SearchBar
  };

  const avatarUrl = user?.avatar ? `${process.env.REACT_APP_API_URL}${user.avatar}` : `${process.env.REACT_APP_API_URL}/uploads/user.png`;

  return (
    <nav className="navbar navbar-expand-lg" style={{ marginLeft: '0', borderBottom: '1px solid rgb(205, 215, 234)', paddingTop: '5px', paddingBottom: '5px' }}>
      <div className="container-sm">
        <Link className="navbar-brand" to="/" style={{ marginLeft: '0' }}>
          <img
            src={`${process.env.PUBLIC_URL}/site-logo.png`}
            alt="Student Forum Academic Logo"
            style={{ height: '80px', width: '250px', marginLeft: '-50px', marginBottom: '0px' }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                to="/"
                style={{ transition: 'color 0.3s', color: '#ff5733', textDecoration: location.pathname === '/' ? 'underline' : 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#e04b2a')}
                onMouseLeave={(e) => (e.target.style.color = location.pathname === '/' ? '#ff5733' : '#000')}
              >
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/questions' ? 'active' : ''}`}
                to="/questions"
                style={{ transition: 'color 0.3s', color: '#ff5733', textDecoration: location.pathname === '/questions' ? 'underline' : 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#e04b2a')}
                onMouseLeave={(e) => (e.target.style.color = location.pathname === '/questions' ? '#ff5733' : '#000')}
              >
                QUESTIONS
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/ask' ? 'active' : ''}`}
                to="/ask"
                style={{ transition: 'color 0.3s', color: '#ff5733', textDecoration: location.pathname === '/ask' ? 'underline' : 'none' }}
                onMouseEnter={(e) => (e.target.style.color = '#e04b2a')}
                onMouseLeave={(e) => (e.target.style.color = location.pathname === '/ask' ? '#ff5733' : '#000')}
              >
                ASK QUESTION
              </Link>
            </li>
          </ul>
          <SearchBar
            searchQuery={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSubmit={handleSearch}
          />
          <ul className="navbar-nav ms-2 d-flex align-items-center">
            {user ? (
              <li className="nav-item">
                <Link to="/profile" className="nav-link d-flex align-items-center">
                  <img
                    src={avatarUrl}
                    alt={`${user.username || 'User'}'s avatar`}
                    className="rounded-circle"
                    width="40"
                    height="40"
                    onError={(e) => (e.target.src = `${process.env.REACT_APP_API_URL}/uploads/user.png`)}
                  />
                  <span className="ms-2">{user.username || 'Guest'}</span>
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-link btn"
                  style={{ backgroundColor: '#ff5733', color: '#ffffff', border: '2px solid #4a704a', padding: '5px 15px' }}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;