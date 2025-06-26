import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ searchQuery, onChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a search term.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      console.log('Sending search request:', { url: `http://localhost:5000/api/questions/search?q=${encodeURIComponent(searchQuery)}`, token });
      const res = await fetch(`http://localhost:5000/api/questions/search?q=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Search failed');
      }
      console.log('Search results:', data); // Debug response
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`, { state: { results: data } });
    } catch (err) {
      console.error('Search failed:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="d-flex ms-auto" onSubmit={handleSubmit}>
      {error && <div className="text-danger mb-2">{error}</div>}
      <div className="input-group" style={{ maxWidth: '150px' }}>
        <input
          className="form-control border-end-0"
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={onChange}
          disabled={loading}
        />
        <span className="input-group-text bg-white" onClick={handleSubmit} style={{ cursor: 'pointer' }}>
          <i className="bi bi-search"></i>
        </span>
      </div>
    </form>
  );
};

export default SearchBar;