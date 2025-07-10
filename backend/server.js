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

// ✅ CORS setup for Render frontends
const corsOptions = {
  origin: ['https://my-qna-frontend.onrender.com', 'https://qna-web-frontend.onrender.com'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ API routes
app.get('/', (req, res) => {
  res.send('✅ QnA Web Backend is live and ready!');
});

app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// ✅ Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
});
