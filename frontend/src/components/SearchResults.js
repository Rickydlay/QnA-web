import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { results } = location.state || { results: [] };

  return (
    <div className="container mt-4">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <div className="row g-3">
          {results.map((result) => (
            <div key={result._id} className="col-12">
              <div className="card shadow-sm" style={{ border: '1px solid rgb(205, 215, 234)' }}>
                <div className="card-body p-3">
                  <h5 className="card-title fw-bold">{result.title}</h5>
                  <p className="card-text">{result.body || 'No description'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;