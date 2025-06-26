import React from 'react';
import { Link } from 'react-router-dom';

const QuestionsCard = ({ question }) => {
  // Truncate body to a short excerpt (e.g., first 100 characters)
  const excerpt = question.body.length > 100 ? `${question.body.substring(0, 100)}...` : question.body;

  return (
    <Link to={`/questions/${question._id}`} className="card mb-3 text-decoration-none" style={{ width: '30%', margin: '0 15px', backgroundColor: '#ffffff', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s', minHeight: '200px', flex: '1 0 auto' }} onClick={(e) => e.stopPropagation()}>
      <div className="card-body" style={{ padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
        <div>
          <h5 className="card-title" style={{ color: '#34495e', marginBottom: '10px', fontSize: '1.1rem' }}>
            {question.title}
          </h5>
          <p className="card-text" style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#6c757d' }}>{excerpt}</p>
        </div>
        <p className="card-text text-muted" style={{ marginBottom: '0', fontSize: '0.9rem' }}>Upvotes: {question.upvotes.length}</p>
      </div>
    </Link>
  );
};

export default QuestionsCard;