const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User, PasswordReset } = require('../server/db');
const auth = require('../server/middleware');
const { sendVerificationEmail, sendWelcomeEmail } = require('../server/email');

const SECRET = process.env.JWT_SECRET || 'aistarterpack-secret-2025';

// Register
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
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      firstName, lastName, email: email.toLowerCase(),
      password: hash, birthYear, postalCode,
      isVerified: false, verificationToken
    });
    sendVerificationEmail(firstName, email, verificationToken);
    res.json({ ok: true, message: 'Registracija uspešna! Proveri email da aktiviraš nalog.' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

// Verify email
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });
    if (!user) return res.status(400).json({ error: 'Nevažeći verifikacioni link.' });
    await User.findByIdAndUpdate(user._id, { isVerified: true, verificationToken: null });
    sendWelcomeEmail(user.firstName, user.email);
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Unesite email i lozinku.' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ error: 'Pogrešan email ili lozinka.' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Pogrešan email ili lozinka.' });
    // verification temporarily disabled
    await User.findByIdAndUpdate(user._id, { lastActiveAt: new Date() });
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '30d' });
    res.json({ token, user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
  } catch (e) {
    res.status(500).json({ error: 'Greška na serveru.' });
  }
});

// Get me
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
    const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName }, { new: true });
    res.json({ id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email });
  } catch (e) { res.status(500).json({ error: 'Greška na serveru.' }); }
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
  } catch (e) { res.status(500).json({ error: 'Greška na serveru.' }); }
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
  } catch (e) { res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Forgot password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Unesite email adresu.' });
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.json({ ok: true });
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await PasswordReset.create({ userId: user._id.toString(), token, expiresAt });
    const resetLink = `https://www.ai-starterpack.edu.rs/#reset-password?token=${token}`;
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'AI Starter Pack <noreply@ai-starterpack.edu.rs>',
      to: email,
      subject: 'Reset lozinke – AI Starter Pack',
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e2e7;border-radius:16px;overflow:hidden"><div style="background:#06080f;padding:24px 32px"><img src="https://www.ai-starterpack.edu.rs/img/logo.svg" height="28"></div><div style="padding:40px"><h1 style="font-size:24px;font-weight:800;color:#1a1a1a;margin-bottom:12px">Reset lozinke</h1><p style="font-size:15px;color:#6b6b72;line-height:1.7;margin-bottom:28px">Klikni na dugme ispod da postaviš novu lozinku. Link važi 1 sat.</p><a href="${resetLink}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Resetuj lozinku →</a><p style="font-size:13px;color:#ababb2;margin-top:28px">Ako nisi tražio/la reset, ignoriši ovaj email.</p></div><div style="background:#f5f5f7;padding:16px 32px;text-align:center"><p style="font-size:12px;color:#ababb2">AI Starter Pack · ITS · ITHS</p></div></div>`
    });
    res.json({ ok: true });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška na serveru.' }); }
});

// Reset password
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) return res.status(400).json({ error: 'Token i lozinka su obavezni.' });
    if (newPassword.length < 6) return res.status(400).json({ error: 'Lozinka mora imati najmanje 6 karaktera.' });
    const reset = await PasswordReset.findOne({ token, used: false });
    if (!reset) return res.status(400).json({ error: 'Nevažeći ili istekli link.' });
    if (new Date() > reset.expiresAt) return res.status(400).json({ error: 'Link je istekao. Zatraži novi reset.' });
    const hash = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(reset.userId, { password: hash });
    await PasswordReset.findByIdAndUpdate(reset._id, { used: true });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Greška na serveru.' }); }
});

module.exports = router;
