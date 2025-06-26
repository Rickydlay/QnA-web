import React, { useState } from 'react';
import api from './api'; // Update import
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to ask a question.');
      navigate('/login');
      return;
    }
    try {
      const res = await api.post('/api/questions', // No URL prefix needed
        { title, body, tags: tags.split(',').map(tag => tag.trim()) }
      );
      navigate(`/questions/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to post question');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body</label>
          <textarea id="body" className="form-control" value={body} onChange={(e) => setBody(e.target.value)} rows="5"></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (comma-separated)</label>
          <input type="text" id="tags" className="form-control" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AskQuestion;