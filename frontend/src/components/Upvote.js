import React from 'react';
import api from 'api';

const Upvote = ({ questionId, upvotes, onUpdate }) => {
  const handleUpvote = () => {
    const token = localStorage.getItem('token');
    api.post(`/api/questions/${questionId}/upvote`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => onUpdate(res.data))
      .catch(err => alert(err.response?.data?.message || 'Failed to upvote'));
  };

  return (
    <button className="btn btn-sm btn-success me-2" onClick={handleUpvote}>
      Upvote ({upvotes?.length || 0})
    </button>
  );
};

export default Upvote;