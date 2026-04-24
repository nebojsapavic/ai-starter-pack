const router = require('express').Router();
const auth = require('../server/middleware');
const { User, Progress, QuizResult } = require('../server/db');
const { sendQuizResultEmail, sendCertificateEmail } = require('../server/email');

const TOTAL_MODULES = 7;
const LESSONS_PER_MODULE = 3;
const PASS_THRESHOLD = 0.4;

const MODULE_NAMES = {
  1: 'Šta je veštačka inteligencija?',
  2: 'Kako AI rešava probleme?',
  3: 'Uvod u mašinsko učenje',
  4: 'Neuronske mreže – digitalni mozak',
  5: 'AI u učenju, poslu i svakodnevici',
  6: 'Odgovorno korišćenje AI',
  7: 'AI i društvo – uticaji i budućnost',
};

// Get full progress
router.get('/progress', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.find({ userId });
    const quizResults = await QuizResult.find({ userId });

    const moduleProgress = {};
    for (let m = 1; m <= TOTAL_MODULES; m++) {
      moduleProgress[m] = { moduleId: m, lessons: {}, quizAttempts: 0, quizScore: null, quizPassed: false, completed: false };
      for (let l = 1; l <= LESSONS_PER_MODULE; l++) {
        const rec = progress.find(p => p.moduleId === m && p.lessonId === l);
        moduleProgress[m].lessons[l] = { completed: !!rec, completedAt: rec?.completedAt || null };
      }
      const quizRecs = quizResults.filter(q => q.moduleId === m);
      moduleProgress[m].quizAttempts = quizRecs.length;
      if (quizRecs.length > 0) {
        const best = quizRecs.reduce((a, b) => a.score > b.score ? a : b);
        moduleProgress[m].quizScore = best.score;
        moduleProgress[m].quizPassed = best.score >= PASS_THRESHOLD;
      }
      const allLessons = Object.values(moduleProgress[m].lessons).every(l => l.completed);
      moduleProgress[m].completed = allLessons && moduleProgress[m].quizPassed;
    }

    const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
    res.json({
      moduleProgress,
      completedModules,
      totalModules: TOTAL_MODULES,
      certificateEarned: completedModules === TOTAL_MODULES,
    });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Mark lesson complete
router.post('/lesson/complete', auth, async (req, res) => {
  try {
    const { moduleId, lessonId } = req.body;
    const userId = req.user.id;
    const existing = await Progress.findOne({ userId, moduleId, lessonId });
    if (!existing) {
      await Progress.create({ userId, moduleId, lessonId, completedAt: new Date() });
    }
    await User.findByIdAndUpdate(userId, { lastActiveAt: new Date() });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Submit quiz
router.post('/quiz/submit', auth, async (req, res) => {
  try {
    const { moduleId, answers } = req.body;
    const userId = req.user.id;

    // Load questions from data.js safely
    let moduleData;
    try {
      const rawData = require('fs').readFileSync(require('path').join(__dirname, '../public/js/data.js'), 'utf8');
      const match = rawData.match(/const modules\s*=\s*(\[[\s\S]*?\]);?\s*(?:if\s*\(typeof|$)/);
      if (!match) return res.status(500).json({ error: 'Nije moguće učitati podatke.' });
      moduleData = eval('(' + match[1] + ')').find(m => m.id === moduleId);
    } catch(e) { return res.status(500).json({ error: 'Greška pri učitavanju podataka.' }); }
    if (!moduleData) return res.status(404).json({ error: 'Modul nije pronađen.' });

    let correct = 0;
    const results = moduleData.questions.map((q, i) => {
      const isCorrect = answers[i] === q.correct;
      if (isCorrect) correct++;
      return { question: q.question, userAnswer: answers[i], correctAnswer: q.correct, isCorrect, explanation: q.explanation };
    });

    const score = correct / moduleData.questions.length;
    const passed = score >= PASS_THRESHOLD;

    await QuizResult.create({ userId, moduleId, score, correct, total: moduleData.questions.length, passed });
    await User.findByIdAndUpdate(userId, { lastActiveAt: new Date() });

    // Send quiz result email
    try {
      const user = await User.findById(userId);
      if (user) {
        sendQuizResultEmail(user.firstName, user.email, moduleId, MODULE_NAMES[moduleId], score, passed, correct, module.questions.length);
      }
    } catch(e) { console.error('Quiz email error:', e.message); }

    // Check if all modules completed
    if (passed) {
      try {
        let completedCount = 0;
        for (let m = 1; m <= TOTAL_MODULES; m++) {
          const best = await QuizResult.findOne({ userId, moduleId: m, passed: true });
          const lessons = await Progress.find({ userId, moduleId: m });
          if (best && lessons.length >= LESSONS_PER_MODULE) completedCount++;
        }
        if (completedCount === TOTAL_MODULES) {
          const user = await User.findById(userId);
          if (user) sendCertificateEmail(user.firstName, user.lastName, user.email);
        }
      } catch(e) { console.error('Cert email error:', e.message); }
    }

    res.json({ score, correct, total: moduleData.questions.length, passed, results });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Get certificate
router.get('/certificate', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let completedCount = 0;
    for (let m = 1; m <= TOTAL_MODULES; m++) {
      const best = await QuizResult.findOne({ userId, moduleId: m, passed: true });
      const lessons = await Progress.find({ userId, moduleId: m });
      if (best && lessons.length >= LESSONS_PER_MODULE) completedCount++;
    }
    const user = await User.findById(userId);
    res.json({
      earned: completedCount === TOTAL_MODULES,
      completedModules: completedCount,
      totalModules: TOTAL_MODULES,
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch(e) { res.status(500).json({ error: 'Greška na serveru.' }); }
});

module.exports = router;
