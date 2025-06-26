import React from 'react';
import api from 'api';

const Flag = ({ questionId, flags, onUpdate }) => {
  const handleFlag = () => {
    const token = localStorage.getItem('token');
    api.post(`/api/questions/${questionId}/flag`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => onUpdate(res.data))
      .catch(err => alert(err.response?.data?.message || 'Failed to flag'));
  };

  return (
    <button className="btn btn-sm btn-warning" onClick={handleFlag}>
      Flag ({flags?.length || 0})
    </button>
  );
};

export default Flag;