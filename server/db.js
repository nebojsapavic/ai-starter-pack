const Datastore = require('nedb-promises');
const path = require('path');

const dbDir = path.join(__dirname, '..', 'data');

const db = {
  users: Datastore.create({ filename: path.join(dbDir, 'users.db'), autoload: true }),
  progress: Datastore.create({ filename: path.join(dbDir, 'progress.db'), autoload: true }),
  quizResults: Datastore.create({ filename: path.join(dbDir, 'quiz_results.db'), autoload: true }),
};

// Indexes
db.users.ensureIndex({ fieldName: 'email', unique: true });
db.progress.ensureIndex({ fieldName: 'userId' });
db.quizResults.ensureIndex({ fieldName: 'userId' });

module.exports = db;
