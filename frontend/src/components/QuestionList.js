import React, { useEffect, useState } from 'react';
import api from 'api';
import { Link } from 'react-router-dom';
import Upvote from './Upvote';
import Flag from './Flag';

const BACKEND_BASE_URL = process.env.REACT_APP_API_URL?.replace('/api', '');

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    api.get('/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  const handleUpdate = (updatedQuestion) => {
    setQuestions(questions.map(q =>
      q._id === updatedQuestion._id ? updatedQuestion : q
    ));
  };

  const getUsername = (user) => {
    if (!user || !user.username) return 'Anonymous';
    return user.username;
  };

  const getAvatar = (user) => {
    return user?.avatar
      ? `${BACKEND_BASE_URL}${user.avatar}`
      : `${BACKEND_BASE_URL}/uploads/user.png`;
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Questions Page</h1>
      <Link to="/ask" className="btn btn-primary mb-4">Ask a Question</Link>
      <div className="row g-3">
        {questions.map(question => (
          <div key={question._id} className="col-12">
            <div className="card shadow-sm mb-3" style={{ border: '1px solid rgb(205, 215, 234)' }}>
              <div className="card-header d-flex align-items-center p-2">
                <img
                  src={getAvatar(question.userId)}
                  alt={`${getUsername(question.userId)}'s avatar`}
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${BACKEND_BASE_URL}/uploads/user.png`;
                  }}
                />
                <span className="fw-bold">{getUsername(question.userId)}</span>
              </div>
              <div className="card-body p-3">
                <Link to={`/questions/${question._id}`} className="text-decoration-none">
                  <h5 className="card-title fw-bold mb-2" style={{ color: '#000' }}>{question.title}</h5>
                </Link>
                <p className="card-text text-muted mb-2">
                  {question.body.substring(0, 100)}...
                </p>
                <div className="mb-2">
                  {question.tags.map(tag => (
                    <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center p-2 bg-light">
                <div>
                  <Upvote questionId={question._id} upvotes={question.upvotes} onUpdate={handleUpdate} />
                  <Flag questionId={question._id} flags={question.flags} onUpdate={handleUpdate} />
                </div>
                <small className="text-muted">
                  {new Date(question.createdAt).toLocaleDateString()}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionList;
