require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const { startCron } = require('./server/cron');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const adminRoutes = require('./routes/admin');

const app = express();
app.set('trust proxy', 1);

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000, max: 15,
  message: { error: 'Previše pokušaja. Pokušaj za 15 minuta.' },
  standardHeaders: true, legacyHeaders: false,
});

app.use('/api/auth/login', authLimit);
app.use('/api/auth/register', authLimit);
app.use(hpp());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '10kb' }));

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/admin', adminRoutes);

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    if (!name || !email || !topic || !message)
      return res.status(400).json({ error: 'Sva polja su obavezna.' });
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'AI Starter Pack <noreply@ai-starterpack.edu.rs>',
      to: 'upis@its.edu.rs',
      replyTo: email,
      subject: '[Kontakt] ' + topic + ' – ' + name,
      html: '<div style="font-family:Arial,sans-serif;max-width:600px;padding:32px"><h2>' + topic + '</h2><p><strong>Ime:</strong> ' + name + '</p><p><strong>Email:</strong> ' + email + '</p><hr><p>' + message + '</p></div>'
    });
    res.json({ ok: true });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška na serveru.' }); }
});

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Interna greška servera.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Starter Pack running on http://localhost:${PORT}`);
  startCron();
});
