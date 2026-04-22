const { User, Progress, QuizResult } = require('./db');
const { sendInactivityEmail } = require('./email');

async function checkInactiveUsers() {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
    const thirtyOneDaysAgo = new Date(now - 31 * 24 * 60 * 60 * 1000);
    const eightDaysAgo = new Date(now - 8 * 24 * 60 * 60 * 1000);

    // 7-day inactive users (last active between 7-8 days ago)
    const sevenDayUsers = await User.find({
      isVerified: true,
      lastActiveAt: { $gte: eightDaysAgo, $lte: sevenDaysAgo }
    });

    for (const user of sevenDayUsers) {
      const progress = await Progress.distinct('moduleId', { userId: user._id.toString() });
      const completedModules = new Set(progress).size;
      if (completedModules < 7) {
        await sendInactivityEmail(user.firstName, user.email, 7, completedModules);
      }
    }

    // 30-day inactive users (last active between 30-31 days ago)
    const thirtyDayUsers = await User.find({
      isVerified: true,
      lastActiveAt: { $gte: thirtyOneDaysAgo, $lte: thirtyDaysAgo }
    });

    for (const user of thirtyDayUsers) {
      const progress = await Progress.distinct('moduleId', { userId: user._id.toString() });
      const completedModules = new Set(progress).size;
      if (completedModules < 7) {
        await sendInactivityEmail(user.firstName, user.email, 30, completedModules);
      }
    }

    console.log(`Inactivity check: ${sevenDayUsers.length} (7d) + ${thirtyDayUsers.length} (30d) emails sent`);
  } catch(e) { console.error('Cron error:', e.message); }
}

// Run every day at 10:00
function startCron() {
  const now = new Date();
  const msUntil10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
  const delay = msUntil10 < 0 ? msUntil10 + 24 * 60 * 60 * 1000 : msUntil10;

  setTimeout(() => {
    checkInactiveUsers();
    setInterval(checkInactiveUsers, 24 * 60 * 60 * 1000);
  }, delay);

  console.log(`Inactivity cron scheduled (next run in ${Math.round(delay/1000/60)} minutes)`);
}

module.exports = { startCron };
