const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, Progress, QuizResult } = require('../server/db');

const ADMIN_SECRET = process.env.ADMIN_PASSWORD || 'admin123';
const JWT_SECRET = process.env.JWT_SECRET || 'aistarterpack-secret-2025';

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_SECRET) return res.status(401).json({ error: 'Pogrešna lozinka.' });
  const token = jwt.sign({ admin: true }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

function adminAuth(req, res, next) {
  const header = req.headers.authorization;
  const queryToken = req.query.token;
  const token = queryToken || (header && header.split(' ')[1]);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
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
        birthYear: u.birthYear,
        postalCode: u.postalCode,
        createdAt: u.createdAt,
        lessonsCompleted: progress.length,
        completedModules: completedModules.length,
        certificateEarned: completedModules.length === 7,
        quizAttempts: quizResults.length,
        bestScores,
        lastActivity: progress.length > 0 ?
          progress.sort((a,b) => new Date(b.completedAt) - new Date(a.completedAt))[0].completedAt : null,
      };
    }));
    res.json(result);
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška' }); }
});

// Get single user detail
router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const u = await User.findById(req.params.id, '-password');
    if (!u) return res.status(404).json({ error: 'Korisnik nije pronađen.' });
    const progress = await Progress.find({ userId: req.params.id });
    const quizResults = await QuizResult.find({ userId: req.params.id });
    const moduleDetails = {};
    for (let m = 1; m <= 7; m++) {
      const lessons = progress.filter(p => p.moduleId === m);
      const quizzes = quizResults.filter(q => q.moduleId === m);
      const best = quizzes.length > 0 ? quizzes.reduce((a,b) => a.score > b.score ? a : b) : null;
      moduleDetails[m] = {
        lessonsCompleted: lessons.length,
        quizAttempts: quizzes.length,
        bestScore: best ? Math.round(best.score * 100) : null,
        passed: best ? best.passed : false,
      };
    }
    res.json({ user: u, moduleDetails, totalLessons: progress.length, totalQuizzes: quizResults.length });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
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
    const thisWeek = new Date(Date.now() - 7*24*60*60*1000);
    const newThisWeek = await User.countDocuments({ createdAt: { $gte: thisWeek } });
    const users = await User.find({}, '_id');
    let certCount = 0;
    for (const u of users) {
      let count = 0;
      for (let m = 1; m <= 7; m++) {
        const lessons = await Progress.countDocuments({ userId: u._id.toString(), moduleId: m });
        const passed = await QuizResult.findOne({ userId: u._id.toString(), moduleId: m, passed: true });
        if (lessons >= 3 && passed) count++;
      }
      if (count === 7) certCount++;
    }
    res.json({ totalUsers, totalProgress, totalQuizzes, passedQuizzes, newToday, newThisWeek, certificatesEarned: certCount });
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

// Export CSV
router.get('/export/csv', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    const rows = await Promise.all(users.map(async (u) => {
      const progress = await Progress.countDocuments({ userId: u._id.toString() });
      const quizResults = await QuizResult.find({ userId: u._id.toString() });
      let completedModules = 0;
      for (let m = 1; m <= 7; m++) {
        const lessons = await Progress.countDocuments({ userId: u._id.toString(), moduleId: m });
        const passed = await QuizResult.findOne({ userId: u._id.toString(), moduleId: m, passed: true });
        if (lessons >= 3 && passed) completedModules++;
      }
      return [
        u._id, u.firstName, u.lastName, u.email,
        u.birthYear || '', u.postalCode || '',
        new Date(u.createdAt).toLocaleDateString('sr-RS'),
        progress, completedModules, completedModules === 7 ? 'Da' : 'Ne'
      ].join(',');
    }));
    const csv = 'ID,Ime,Prezime,Email,God.rodjenja,Postanski,Registrovan,Lekcije,Moduli,Sertifikat\n' + rows.join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="korisnici.csv"');
    res.send('\uFEFF' + csv); // BOM for Excel
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

// Send email to all users
router.post('/send-email', adminAuth, async (req, res) => {
  try {
    const { subject, message } = req.body;
    if (!subject || !message) return res.status(400).json({ error: 'Naslov i poruka su obavezni.' });
    const users = await User.find({}, 'firstName email');
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    let sent = 0;
    for (const u of users) {
      try {
        await resend.emails.send({
          from: 'AI Starter Pack <noreply@ai-starterpack.edu.rs>',
          to: u.email,
          subject,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
              <div style="background:#06080f;padding:24px 32px">
                <img src="https://www.ai-starterpack.edu.rs/img/logo.svg" height="28">
              </div>
              <div style="padding:32px;background:#fff;border:1px solid #e2e2e7">
                <p style="font-size:16px;color:#3a3a3a;margin-bottom:16px">Zdravo, ${u.firstName}!</p>
                <div style="font-size:15px;color:#6b6b72;line-height:1.7">${message.replace(/\n/g,'<br>')}</div>
              </div>
              <div style="padding:16px 32px;background:#f5f5f7;text-align:center">
                <p style="font-size:12px;color:#ababb2">AI Starter Pack · ITS · ITHS · Savez za AI Srbije</p>
              </div>
            </div>`,
        });
        sent++;
      } catch(e) { console.error('Email fail:', u.email, e.message); }
    }
    res.json({ ok: true, sent, total: users.length });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

module.exports = router;
