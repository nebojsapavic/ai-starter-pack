const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, Progress, QuizResult } = require('../server/db');

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'aistarterpack-secret-2025';

// Admin login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_SECRET) return res.status(401).json({ error: 'Pogrešna lozinka.' });
  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// Admin auth middleware
function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.admin) return res.status(401).json({ error: 'Unauthorized' });
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
}

// Get all users with progress
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    const result = await Promise.all(users.map(async (u) => {
      const progress = await Progress.find({ userId: u._id.toString() });
      const quizResults = await QuizResult.find({ userId: u._id.toString() });
      const completedModules = [];
      for (let m = 1; m <= 7; m++) {
        const lessons = progress.filter(p => p.moduleId === m);
        const passed = quizResults.find(q => q.moduleId === m && q.passed);
        if (lessons.length >= 3 && passed) completedModules.push(m);
      }
      const bestScores = {};
      for (let m = 1; m <= 7; m++) {
        const recs = quizResults.filter(q => q.moduleId === m);
        if (recs.length > 0) bestScores[m] = Math.round(Math.max(...recs.map(r => r.score)) * 100);
      }
      return {
        id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        createdAt: u.createdAt,
        lessonsCompleted: progress.length,
        completedModules: completedModules.length,
        certificateEarned: completedModules.length === 7,
        quizAttempts: quizResults.length,
        bestScores,
      };
    }));
    res.json(result);
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška' }); }
});

// Stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProgress = await Progress.countDocuments();
    const totalQuizzes = await QuizResult.countDocuments();
    const passedQuizzes = await QuizResult.countDocuments({ passed: true });
    const today = new Date(); today.setHours(0,0,0,0);
    const newToday = await User.countDocuments({ createdAt: { $gte: today } });
    const certUsers = [];
    const users = await User.find({}, '_id');
    for (const u of users) {
      let count = 0;
      for (let m = 1; m <= 7; m++) {
        const lessons = await Progress.countDocuments({ userId: u._id.toString(), moduleId: m });
        const passed = await QuizResult.findOne({ userId: u._id.toString(), moduleId: m, passed: true });
        if (lessons >= 3 && passed) count++;
      }
      if (count === 7) certUsers.push(u._id);
    }
    res.json({ totalUsers, totalProgress, totalQuizzes, passedQuizzes, newToday, certificatesEarned: certUsers.length });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Progress.deleteMany({ userId: req.params.id });
    await QuizResult.deleteMany({ userId: req.params.id });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

module.exports = router;
