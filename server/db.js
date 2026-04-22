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
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  lastActiveAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Progress
const progressSchema = new mongoose.Schema({
  userId: String,
  moduleId: Number,
  lessonId: Number,
  completedAt: { type: Date, default: Date.now }
});
const Progress = mongoose.model('Progress', progressSchema);

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
const QuizResult = mongoose.model('QuizResult', quizSchema);

// Password Reset
const passwordResetSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
}, { timestamps: true });
const PasswordReset = mongoose.model('PasswordReset', passwordResetSchema);

module.exports = { User, Progress, QuizResult, PasswordReset };
