import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api'; // Update import
import QuestionsCard from './QuestionsCard';

const Home = () => {
  const [topQuestions, setTopQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get('/api/questions'); // No URL prefix needed
        const sortedQuestions = res.data
          .sort((a, b) => b.upvotes.length - a.upvotes.length)
          .slice(0, 5);
        setTopQuestions(sortedQuestions);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <div>
      <div
        className="position-relative"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/hero.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          paddingBottom: '20px',
        }}
      >
        <div
          className="position-absolute top-50 start-0 translate-middle-y text-start"
          style={{
            paddingLeft: '20px',
            maxWidth: '50%',
          }}
        >
          <h1 className="mb-4" style={{ color: '#ff5733' }}>Welcome to Q&A</h1>
          <p className="lead" style={{ color: '#000000' }}>
            This platform connects students and faculty to ask and answer questions related to school work.
            Explore the community, ask your questions, or contribute to discussions!
          </p>
          <div className="d-flex gap-3 mt-4 justify-content-start">
            <Link to="/questions" className="btn" style={{ backgroundColor: '#ff5733', color: '#ffffff', border: '2px solid #4a704a', padding: '8px 20px' }}>View All Questions</Link>
            <Link to="/ask" className="btn" style={{ backgroundColor: 'transparent', color: '#ff5733', border: '2px solid #ff5733', padding: '8px 20px' }}>Ask a Question</Link>
          </div>
        </div>
      </div>
      <div className="container mt-5" style={{ padding: '0 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="mb-4" style={{ color: '#ff5733' }}>Featured Q&A</h2>
        <div className="d-flex flex-wrap justify-content-start">
          {topQuestions.map((question) => (
            <QuestionsCard key={question._id} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;