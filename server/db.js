const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// User
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, lowercase: true },
  password: String,
  birthYear: Number,
  postalCode: String,
  createdAt: { type: Date, default: Date.now }
});

// Progress
const progressSchema = new mongoose.Schema({
  userId: String,
  moduleId: Number,
  lessonId: Number,
  completedAt: { type: Date, default: Date.now }
});

// Quiz Results
const quizSchema = new mongoose.Schema({
  userId: String,
  moduleId: Number,
  score: Number,
  correct: Number,
  total: Number,
  passed: Boolean,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = {
  User: mongoose.model('User', userSchema),
  Progress: mongoose.model('Progress', progressSchema),
  QuizResult: mongoose.model('QuizResult', quizSchema),
};
