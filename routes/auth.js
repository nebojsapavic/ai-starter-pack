const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../server/db');
const auth = require('../server/middleware');
const { sendWelcomeEmail } = require('../server/email');

const SECRET = process.env.JWT_SECRET || 'aistarterpack-secret-2025';

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, birthYear, postalCode } = req.body;
    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ error: 'Sva obavezna polja moraju biti popunjena.' });
    if (password.length < 6)
      return res.status(400).json({ error: 'Lozinka mora imati najmanje 6 karaktera.' });
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing)
      return res.status(409).json({ error: 'Email adresa je već registrovana.' });
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email: email.toLowerCase(), password: hash, birthYear, postalCode });
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '30d' });
    sendWelcomeEmail(firstName, email);
    res.json({ token, user: { id: user._id, firstName, lastName, email: user.email } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Unesite email i lozinku.' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Pogrešan email ili lozinka.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Pogrešan email ili lozinka.' });
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
});

// Update profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName)
      return res.status(400).json({ error: 'Ime i prezime su obavezni.' });
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName },
      { new: true }
    );
    res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

// Change password
router.put('/password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return res.status(400).json({ error: 'Unesite trenutnu i novu lozinku.' });
    if (newPassword.length < 6)
      return res.status(400).json({ error: 'Nova lozinka mora imati najmanje 6 karaktera.' });
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(401).json({ error: 'Trenutna lozinka nije ispravna.' });
    const hash = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(req.user.id, { password: hash });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

// Delete account
router.delete('/account', auth, async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Pogrešna lozinka.' });
    const { Progress, QuizResult } = require('../server/db');
    await Progress.deleteMany({ userId: req.user.id });
    await QuizResult.deleteMany({ userId: req.user.id });
    await User.findByIdAndDelete(req.user.id);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

module.exports = router;
