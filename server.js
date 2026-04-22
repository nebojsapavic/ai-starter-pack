require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/course');
const adminRoutes = require('./routes/admin');

async function startServer() {
  const AdminJS = (await import('adminjs')).default;
  const AdminJSExpress = await import('@adminjs/express');
  const AdminJSMongoose = await import('@adminjs/mongoose');
  const { User, Progress, QuizResult } = require('./server/db');

  AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
  });

  const adminJs = new AdminJS({
    resources: [
      {
        resource: User,
        options: {
          properties: {
            password: { isVisible: { list: false, edit: false, filter: false, show: false } },
            _id: { isVisible: { list: false, edit: false, filter: false, show: true } },
          },
          actions: {
            new: { isAccessible: false },
          },
          navigation: { name: 'Korisnici', icon: 'User' },
        },
      },
      {
        resource: Progress,
        options: { navigation: { name: 'Napredak', icon: 'ChartBar' } },
      },
      {
        resource: QuizResult,
        options: { navigation: { name: 'Kvizovi', icon: 'Star' } },
      },
    ],
    branding: {
      companyName: 'AI Starter Pack',
      logo: false,
      favicon: '/img/favicon.ico',
      theme: {
        colors: {
          primary100: '#E8192C',
          primary80: '#E8192C',
          primary60: '#c01020',
          primary40: '#ff4455',
          primary20: 'rgba(232,25,44,0.2)',
          accent: '#E8192C',
          love: '#E8192C',
        },
      },
    },
    locale: {
      language: 'en',
      translations: {
        en: {
          actions: {
            new: 'Dodaj novo',
            edit: 'Izmeni',
            show: 'Prikaži',
            delete: 'Obriši',
            list: 'Lista',
          },
          labels: {
            User: 'Korisnici',
            Progress: 'Napredak',
            QuizResult: 'Kviz rezultati',
            navigation: 'Navigacija',
            pages: 'Stranice',
          },
        },
      },
    },
    rootPath: '/adminjs',
  });

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs,
    {
      authenticate: async (email, password) => {
        if (email === 'nebojsa.pavic@its.edu.rs' && password === ADMIN_PASSWORD) {
          return { email, role: 'admin' };
        }
        return null;
      },
      cookieName: 'adminjs',
      cookiePassword: process.env.JWT_SECRET || 'adminjs-secret-2025-change-me',
    },
    null,
    {
      resave: false,
      saveUninitialized: false,
      secret: process.env.JWT_SECRET || 'session-secret-2025',
      cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true },
    }
  );

  const app = express();
  app.set('trust proxy', 1);

  // AdminJS mora biti PRE helmet-a
  app.use(adminJs.options.rootPath, adminRouter);

  // Security
  app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

  const globalLimit = rateLimit({
    windowMs: 15 * 60 * 1000, max: 300,
    standardHeaders: true, legacyHeaders: false,
    skip: (req) => req.path.startsWith('/img') || req.path.startsWith('/css') || req.path.startsWith('/js') || req.path.startsWith('/adminjs'),
  });
  const authLimit = rateLimit({
    windowMs: 15 * 60 * 1000, max: 15,
    message: { error: 'Previše pokušaja. Pokušaj za 15 minuta.' },
    standardHeaders: true, legacyHeaders: false,
  });

  app.use(globalLimit);
  app.use('/api/auth/login', authLimit);
  app.use('/api/auth/register', authLimit);
  app.use(hpp());

  app.use(cors({
    origin: ['https://www.ai-starterpack.edu.rs', 'https://ai-starterpack.edu.rs', 'http://localhost:3000'],
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
  app.listen(PORT, () => {
    console.log(`AI Starter Pack running on http://localhost:${PORT}`);
    console.log(`AdminJS available at http://localhost:${PORT}/adminjs`);
  });
}

startServer().catch(console.error);
