const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS config to allow frontend on render
const corsOptions = {
  origin: 'https://qna-web-frontend.onrender.com', // your deployed frontend URL
  credentials: true, // optional, only needed if using cookies or Authorization headers
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('✅ QnA Web Backend is live and ready!');
});

// API routes
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/profile', profileRoutes);

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
