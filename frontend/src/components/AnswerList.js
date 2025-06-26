import React from 'react';
// Remove: import { Link } from 'react-router-dom';

const AnswersList = ({ answers }) => (
  <div className="accordion-item">
    <h2 className="accordion-header" id="headingAnswers">
      <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAnswers" aria-expanded="false" aria-controls="collapseAnswers">
        Your Answers
      </button>
    </h2>
    <div id="collapseAnswers" className="accordion-collapse collapse" aria-labelledby="headingAnswers" data-bs-parent="#profileAccordion">
      <div className="accordion-body">
        {answers.length > 0 ? (
          <div className="row g-3">
            {answers.map((a) => (
              <div key={a._id} className="col-12">
                <div className="card shadow-sm" style={{ border: '1px solid rgb(205, 215, 234)' }}>
                  <div className="card-body p-3">
                    <p className="card-text">{a.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No answers given yet.</p>
        )}
      </div>
    </div>
  </div>
);

export default AnswersList;