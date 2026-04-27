const router = require('express').Router();
const auth = require('../server/middleware');
const { User, Progress, QuizResult } = require('../server/db');
const { sendQuizResultEmail, sendCertificateEmail } = require('../server/email');
const { questions } = require('../server/questions');

const TOTAL_MODULES = 7;
const LESSONS_PER_MODULE = 3;
const PASS_THRESHOLD = 0.4;

const MODULE_NAMES = {
  1: 'Sta je vestacka inteligencija?',
  2: 'Kako AI resava probleme?',
  3: 'Uvod u masinsko ucenje',
  4: 'Neuronske mreze',
  5: 'AI u ucenju i poslu',
  6: 'Odgovorno koriscenje AI',
  7: 'AI i drustvo',
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
        moduleProgress[m].lessons[l] = { completed: !!rec, completedAt: rec ? rec.completedAt : null };
      }
      const quizRecs = quizResults.filter(q => q.moduleId === m);
      moduleProgress[m].quizAttempts = quizRecs.length;
      if (quizRecs.length > 0) {
        const best = quizRecs.reduce((a, b) => a.score > b.score ? a : b);
        moduleProgress[m].quizScore = best.score;
        moduleProgress[m].quizPassed = best.score >= PASS_THRESHOLD;
      }
      const allLessons = Object.values(moduleProgress[m].lessons).every(function(l) { return l.completed; });
      moduleProgress[m].completed = allLessons && moduleProgress[m].quizPassed;
    }

    const completedModules = Object.values(moduleProgress).filter(function(m) { return m.completed; }).length;
    res.json({
      moduleProgress,
      completedModules,
      totalModules: TOTAL_MODULES,
      certificateEarned: completedModules === TOTAL_MODULES,
    });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greska na serveru.' }); }
});

// Mark lesson complete
router.post('/lesson/complete', auth, async (req, res) => {
  try {
    const { moduleId, lessonId } = req.body;
    const userId = req.user.id;
    const existing = await Progress.findOne({ userId, moduleId: parseInt(moduleId), lessonId: parseInt(lessonId) });
    if (!existing) {
      await Progress.create({ userId, moduleId: parseInt(moduleId), lessonId: parseInt(lessonId), completedAt: new Date() });
    }
    await User.findByIdAndUpdate(userId, { lastActiveAt: new Date() });
    res.json({ ok: true });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greska na serveru.' }); }
});

// Submit quiz
router.post('/quiz/submit', auth, async (req, res) => {
  try {
    const { moduleId, answers } = req.body;
    const userId = req.user.id;
    const mid = parseInt(moduleId);

    const moduleQuestions = questions[mid];
    if (!moduleQuestions) return res.status(404).json({ error: 'Modul nije pronadjen.' });

    let correct = 0;
    const results = moduleQuestions.map(function(q, i) {
      const isCorrect = answers[i] === q.correct;
      if (isCorrect) correct++;
      return { question: q.question, userAnswer: answers[i], correctAnswer: q.correct, isCorrect: isCorrect, explanation: q.explanation };
    });

    const score = correct / moduleQuestions.length;
    const passed = score >= PASS_THRESHOLD;

    await QuizResult.create({ userId, moduleId: mid, score, correct, total: moduleQuestions.length, passed });
    await User.findByIdAndUpdate(userId, { lastActiveAt: new Date() });

    // Send quiz result email
    try {
      const user = await User.findById(userId);
      if (user) {
        sendQuizResultEmail(user.firstName, user.email, mid, MODULE_NAMES[mid], score, passed, correct, moduleQuestions.length);
      }
    } catch(emailErr) { console.error('Quiz email error:', emailErr.message); }

    // Check if all modules completed - send certificate
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
      } catch(certErr) { console.error('Cert error:', certErr.message); }
    }

    res.json({ score, correct, total: moduleQuestions.length, passed, results });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greska na serveru.' }); }
});

// Get certificate
router.get('/certificate', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let completedCount = 0;
    let lastCompletedAt = null;
    for (let m = 1; m <= TOTAL_MODULES; m++) {
      const best = await QuizResult.findOne({ userId, moduleId: m, passed: true });
      const lessons = await Progress.find({ userId, moduleId: m });
      if (best && lessons.length >= LESSONS_PER_MODULE) {
        completedCount++;
        if (best.submittedAt && (!lastCompletedAt || best.submittedAt > lastCompletedAt)) {
          lastCompletedAt = best.submittedAt;
        }
      }
    }
    if (completedCount < TOTAL_MODULES) {
      return res.status(403).json({ error: `Završi svih 7 modula da dobiješ sertifikat. Trenutno: ${completedCount}/7` });
    }
    const user = await User.findById(userId);
    res.json({
      earned: true,
      completedModules: completedCount,
      totalModules: TOTAL_MODULES,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      completedAt: lastCompletedAt || new Date(),
      ects: 2,
      discount: 100,
    });
  } catch(e) { res.status(500).json({ error: 'Greska na serveru.' }); }
});

module.exports = router;
