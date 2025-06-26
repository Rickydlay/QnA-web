import React, { useEffect, useState } from 'react';
import api from 'api';
import { useParams } from 'react-router-dom';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

const QuestionDetail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    api.get(`/api/questions/${id}`)
      .then(res => setQuestion(res.data))
      .catch(err => console.error('Error fetching question:', err));

    api.get(`/api/answers/question/${id}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.error('Error fetching answers:', err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to answer.');
      return;
    }
    if (!newAnswer.trim()) {
      alert('Please enter an answer.');
      return;
    }
    api.post(`/api/answers/question/${id}`, { body: newAnswer }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setAnswers([...answers, res.data]);
        setNewAnswer('');
      })
      .catch(err => {
        console.error('Error submitting answer:', err);
        alert(err.response?.data?.message || 'Failed to submit answer');
      });
  };

  const handleUpvoteAnswer = (answerId) => {
    const token = localStorage.getItem('token');
    api.post(`/api/answers/${answerId}/upvote`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAnswers(answers.map(a => a._id === answerId ? res.data : a)))
      .catch(err => alert(err.response?.data?.message || 'Failed to upvote'));
  };

  const handleFlagAnswer = (answerId) => {
    const token = localStorage.getItem('token');
    api.post(`/api/answers/${answerId}/flag`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setAnswers(answers.map(a => a._id === answerId ? res.data : a)))
      .catch(err => alert(err.response?.data?.message || 'Failed to flag'));
  };

  if (!question) return <div className="container mt-4">Loading...</div>;

  return (
    <ErrorBoundary>
      <div className="container mt-4">
        <h1 className="mb-4">Question and Answers</h1>
        <div className="card mb-4">
          <div className="card-header">
            <h2>{question.title}</h2>
          </div>
          <div className="card-body">
            <p>{question.body}</p>
            <div>
              {question.tags && question.tags.length > 0 ? (
                question.tags.map(tag => (
                  <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                ))
              ) : (
                <span className="text-muted">No tags</span>
              )}
            </div>
          </div>
        </div>
        <h3>Answers</h3>
        <div className="mb-4">
          {answers.length === 0 ? (
            <p>No answers yet.</p>
          ) : (
            answers.map(answer => (
              <div key={answer._id} className="card mb-2">
                <div className="card-body">
                  {answer.body}
                  <div className="mt-2">
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleUpvoteAnswer(answer._id)}>
                      Upvote ({answer.upvotes?.length || 0})
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => handleFlagAnswer(answer._id)}>
                      Flag ({answer.flags?.length || 0})
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="answerBody" className="form-label">Your Answer</label>
            <textarea
              id="answerBody"
              className="form-control"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Answer</button>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default QuestionDetail;