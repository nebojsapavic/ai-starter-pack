require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const adminRoutes = require('./routes/admin');

const app = express();

// Trust Railway proxy
app.set('trust proxy', 1);

// Security headers
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

// Rate limiting
const globalLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/img') || req.path.startsWith('/css') || req.path.startsWith('/js'),
});

const authLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { error: 'Previše pokušaja. Pokušaj za 15 minuta.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(globalLimit);
app.use('/api/auth/login', authLimit);
app.use('/api/auth/register', authLimit);

// HPP
app.use(hpp());

// CORS
app.use(cors({
  origin: [
    'https://www.ai-starterpack.edu.rs',
    'https://ai-starterpack.edu.rs',
    'http://localhost:3000'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Interna greška servera.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`AI Starter Pack running on http://localhost:${PORT}`));
