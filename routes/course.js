const router = require('express').Router();
const auth = require('../server/middleware');
const { User, Progress, QuizResult } = require('../server/db');

const TOTAL_MODULES = 7;
const LESSONS_PER_MODULE = 3;
const PASS_THRESHOLD = 0.4;

router.get('/progress', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const progress = await Progress.find({ userId });
    const quizResults = await QuizResult.find({ userId });
    const moduleProgress = {};
    for (let m = 1; m <= TOTAL_MODULES; m++) {
      moduleProgress[m] = { moduleId: m, lessons: {}, quizScore: null, quizPassed: false, quizAttempts: 0, completed: false };
      for (let l = 1; l <= LESSONS_PER_MODULE; l++) {
        const rec = progress.find(p => p.moduleId === m && p.lessonId === l);
        moduleProgress[m].lessons[l] = { completed: !!rec, completedAt: rec?.completedAt || null };
      }
      const quizRecs = quizResults.filter(q => q.moduleId === m);
      if (quizRecs.length > 0) {
        const best = quizRecs.reduce((a, b) => a.score > b.score ? a : b);
        moduleProgress[m].quizScore = best.score;
        moduleProgress[m].quizPassed = best.score >= PASS_THRESHOLD;
        moduleProgress[m].quizAttempts = quizRecs.length;
      }
      const allLessons = Object.values(moduleProgress[m].lessons).every(l => l.completed);
      moduleProgress[m].completed = allLessons && moduleProgress[m].quizPassed;
    }
    const completedModules = Object.values(moduleProgress).filter(m => m.completed).length;
    res.json({ moduleProgress, completedModules, totalModules: TOTAL_MODULES, certificateEarned: completedModules === TOTAL_MODULES });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška' }); }
});

router.post('/lesson/complete', auth, async (req, res) => {
  try {
    const { moduleId, lessonId } = req.body;
    const userId = req.user.id;
    const existing = await Progress.findOne({ userId, moduleId, lessonId });
    if (!existing) await Progress.create({ userId, moduleId, lessonId });
    res.json({ ok: true });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

router.post('/quiz/submit', auth, async (req, res) => {
  try {
    const { moduleId, answers } = req.body;
    const userId = req.user.id;
    const module = QUIZ_DATA[moduleId];
    if (!module) return res.status(400).json({ error: 'Neispravan modul.' });
    let correct = 0;
    const results = module.questions.map((q, i) => {
      const userAnswer = answers[i]?.answer;
      const isCorrect = userAnswer === q.correct;
      if (isCorrect) correct++;
      return { questionId: i, correct: isCorrect, userAnswer, correctAnswer: q.correct, explanation: q.explanation };
    });
    const score = correct / module.questions.length;
    const passed = score >= PASS_THRESHOLD;
    await QuizResult.create({ userId, moduleId, score, correct, total: module.questions.length, passed });
    // Check if all modules completed - send certificate email
    if (passed) {
      let completedCount = 0;
      for (let m = 1; m <= TOTAL_MODULES; m++) {
        const best = await QuizResult.findOne({ userId, moduleId: m, passed: true });
        const lessons = await Progress.find({ userId, moduleId: m });
        if (best && lessons.length >= LESSONS_PER_MODULE) completedCount++;
      }
      if (completedCount === TOTAL_MODULES) {
        const user = await User.findById(userId);
        const { sendCertificateEmail } = require("../server/email");
        sendCertificateEmail(user.firstName, user.lastName, user.email);
      }
    }
    res.json({ score, correct, total: module.questions.length, passed, results });
  } catch(e) { console.error(e); res.status(500).json({ error: 'Greška' }); }
});

router.get('/certificate', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    let completedCount = 0;
    for (let m = 1; m <= TOTAL_MODULES; m++) {
      const best = await QuizResult.findOne({ userId, moduleId: m, passed: true });
      const lessons = await Progress.find({ userId, moduleId: m });
      if (best && lessons.length >= LESSONS_PER_MODULE) completedCount++;
    }
    if (completedCount < TOTAL_MODULES) return res.status(403).json({ error: 'Kurs nije završen.', completedModules: completedCount });
    const user = await User.findById(userId);
    res.json({ firstName: user.firstName, lastName: user.lastName, email: user.email, completedAt: new Date().toISOString(), ects: 2, discount: 100 });
  } catch(e) { res.status(500).json({ error: 'Greška' }); }
});

const QUIZ_DATA = {
  1: { questions: [
    { q:'Koja tehnologija koristi AI?', opts:['Digitalni sat','Kalkulator','Prepoznavanje glasa','Rerna'], correct:2, explanation:'Prepoznavanje glasa koristi AI da razume ljudski govor.' },
    { q:'Osnovna karakteristika AI?', opts:['Duža baterija','Obavlja zadatke koji zahtevaju ljudsku inteligenciju','Metalno telo','Samo uz internet'], correct:1, explanation:'AI obavlja zadatke koje bi inače zahtevale ljudsku sposobnost.' },
    { q:'Skup uputstava koje AI koristi?', opts:['Generator','Algoritam','Automat','Motor'], correct:1, explanation:'Algoritam je niz koraka koje mašina koristi za rešavanje problema.' },
    { q:'Primer uske AI?', opts:['Robot koji razume sve','Spotify preporuka pesme','Robot koji sanja','Šrafciger sa senzorom'], correct:1, explanation:'Uska AI je specijalizovana za jedan zadatak poput preporuke muzike.' },
    { q:'Šta AI koristi da uči obrasce?', opts:['Emocije','Podatke i primere','Magnete','Kompas'], correct:1, explanation:'AI uči iz podataka i primera, ne iz emocija.' },
  ]},
  2: { questions: [
    { q:'Kako AI vidi problem?', opts:['Kao emociju','Kao slučajne podatke','Kao niz stanja, pravila i ciljeva','Kao listu reči'], correct:2, explanation:'Za AI, problem je formalizovan kao početno stanje, cilj i pravila.' },
    { q:'Uloga algoritma pretrage?', opts:['Unapred zna rešenje','Pretvori u sliku','Pretražuje puteve od početka do cilja','Šalje podatke'], correct:2, explanation:'Algoritam pretrage istražuje sve pravce ka rešenju.' },
    { q:'Zašto AI koristi funkciju cilja?', opts:['Da izrazi mišljenje','Nasumični odgovori','Poredi korisnike','Zna kada je problem rešen'], correct:3, explanation:'Funkcija cilja pomaže AI da prepozna kada je dostigla željeni ishod.' },
    { q:'Primer AI optimizacije?', opts:['Prepoznaje lice','Bira najkraći put','Prevodi tekst','Sortira slike'], correct:1, explanation:'Optimizacija znači tražiti "najbolje" rešenje, poput najkraćeg puta.' },
    { q:'Kako AI zna koje akcije su dozvoljene?', opts:['Emocije','Unapred definisana pravila','Svesno rasuđivanje','Pogađanje'], correct:1, explanation:'AI koristi eksplicitno zadate uslove i pravila okruženja.' },
  ]},
  3: { questions: [
    { q:'Odnos AI, ML i DL?', opts:['AI je podskup ML','ML je deo AI, DL je deo ML','Potpuno nepovezani','DL i ML su isto'], correct:1, explanation:'AI je najširi pojam, ML metoda unutar AI, DL posebna vrsta ML.' },
    { q:'AI bez ML?', opts:['Šahovski program po unapred zadatim pravilima','Email filter koji uči','TikTok algoritam','Prevodilac sa podacima'], correct:0, explanation:'Program koji ne uči iz primera već sledi instrukcije je AI bez ML.' },
    { q:'Scenario sa ML?', opts:['Kalkulator','YouTube preporuke','Semafor na 60s','Štampač'], correct:1, explanation:'YouTube koristi podatke o ponašanju korisnika za preporuke – klasičan ML.' },
    { q:'Zašto DL je "duboko"?', opts:['Puno memorije','Dubinske analize','Više slojeva neuronske mreže','Znanje programiranja'], correct:2, explanation:'Višeslojne neuronske mreže obrađuju podatke na rastućim nivoima apstrakcije.' },
    { q:'Zadatak sa DL?', opts:['Sabiranje','Pretraga reči','Sortiranje','Prepoznavanje lica'], correct:3, explanation:'Prepoznavanje lica zahteva analizu kompleksnih obrazaca – domen DL.' },
  ]},
  4: { questions: [
    { q:'Šta je neuronska mreža?', opts:['Mreža interneta','Softverski model inspirisan mozgom','Skup pravila za igrice','Program za tekst'], correct:1, explanation:'Neuronska mreža imitira strukturu neurona u ljudskom mozgu.' },
    { q:'Šta je "duboko" u DL?', opts:['Duboka memorija','Višeslojne neuronske mreže','Složeni algoritmi','Duboki podaci'], correct:1, explanation:'Naziv dolazi od više slojeva neurona koji uče složenije karakteristike.' },
    { q:'Tehnika koja uči iz grešaka?', opts:['Feedforward','Backpropagation','Klasifikacija','Klasterizacija'], correct:1, explanation:'Backpropagation koriguje težine mreže na osnovu napravljenih grešaka.' },
    { q:'Primena DL za slike?', opts:['Tekstualni editori','Face unlock i medicinska dijagnostika','Kalkulator','Tabele'], correct:1, explanation:'Face unlock i medicinska dijagnostika koriste DL za vizuelne podatke.' },
    { q:'Zašto DL treba više resursa?', opts:['Stariji algoritmi','Više podataka i jači računari','Radi sporije','Zahteva internet'], correct:1, explanation:'DL zahteva ogromne količine podataka i snažne GPU za obuku.' },
  ]},
  5: { questions: [
    { q:'AI alat za personalizovano učenje?', opts:['Microsoft Word','Duolingo i Khan Academy','Photoshop','YouTube'], correct:1, explanation:'Duolingo i Khan Academy koriste AI da prilagode lekcije napretku korisnika.' },
    { q:'Kako AI pomaže u pisanju?', opts:['Potpuno zamenjuje čoveka','Predlaže ideje i koriguje grematiku','Samo kopira','Ne može da pomogne'], correct:1, explanation:'AI predlaže nastavke i koriguje greške, ali odluke ostaju tvoje.' },
    { q:'Ograničenje AI asistenta?', opts:['Previše pametan','Nema internet','Nema emocije ni lični kontekst','Samo engleski'], correct:2, explanation:'AI ne razume tvoj lični kontekst – ti donosiš konačnu odluku.' },
    { q:'Razlika AI i običnog kalendara?', opts:['AI je skuplji','AI prilagođava planove u realnom vremenu','Obični je pametniji','AI samo za firme'], correct:1, explanation:'AI razume promene i nudi rešenja kada se planovi poremete.' },
    { q:'Zašto AI ne zamenjuje tvoju odgovornost?', opts:['Ne zna da razmišlja','Alat je – ti odlučuješ, on pomaže','Nije efikasan','Samo za programere'], correct:1, explanation:'AI olakšava donošenje odluka, ali ti si taj koji vodi.' },
  ]},
  6: { questions: [
    { q:'Kako nastaje pristrasnost u AI?', opts:['Programiran da bude nepravedan','Favorizuje moćne','Uči iz pristrasnih istorijskih podataka','Preopterećenje sistema'], correct:2, explanation:'AI ne razume pravednost – prenosi obrasce iz podataka koje dobija.' },
    { q:'Zašto je privatnost važna uz AI?', opts:['AI ne može bez podataka','Korisnici unose osetljive info koje se mogu koristiti','Dizajn softvera','Zakon ne dozvoljava'], correct:1, explanation:'Lične informacije mogu biti pohranjene i analizirane bez znanja korisnika.' },
    { q:'Opasnost AI koji generiše slike/glas?', opts:['Usporava uređaje','Deepfake i lažni sadržaj','Koristi RAM','Ne razume nijanse'], correct:1, explanation:'AI može biti zloupotrebljavan za lažno predstavljanje i manipulaciju.' },
    { q:'Ko snosi odgovornost kada AI pogreši?', opts:['Samo programer','Samo korisnik','Samo vlada','Programeri, kompanije i korisnici zajedno'], correct:3, explanation:'Odgovornost u AI svetu je kolektivna – svi akteri je dele.' },
    { q:'Najtačnija tvrdnja o AI pristrasnosti?', opts:['AI je nepristrasan','AI može biti pristrasan jer uči iz ljudskih grešaka','AI zna šta je etički','Niko nije odgovoran'], correct:1, explanation:'AI nema vrednosni sistem – uči iz podataka koje mu dajemo.' },
  ]},
  7: { questions: [
    { q:'Najvažnije veštine uz AI?', opts:['Samo IT veštine','Kritičko mišljenje, kreativnost, komunikacija','Fizičke veštine','Strani jezici'], correct:1, explanation:'Veštine koje AI teško imitira postaju najvrednije.' },
    { q:'Kako AI menja obrazovanje?', opts:['Ukida nastavnike','Personalizuje učenje i pomaže nastavnicima','Nema uticaja','Pogoršava nastavu'], correct:1, explanation:'AI personalizuje učenje i pruža trenutnu povratnu informaciju.' },
    { q:'Šta je AGI?', opts:['Naziv za ChatGPT','AI koji rešava bilo koji zadatak kao čovek','Robot sa mišićima','Baza podataka'], correct:1, explanation:'AGI bi bio AI sposoban za bilo koji intelektualni zadatak kao čovek.' },
    { q:'Zašto je važna regulacija AI?', opts:['Da uspori razvoj','Da obezbedi sigurnost i spreči zloupotrebe','Da zaštiti patente','Da poveća cenu'], correct:1, explanation:'Bez regulacije AI može biti zloupotrebljavan na globalnom nivou.' },
    { q:'Najvažnija poruka kursa?', opts:['AI je opasan','AI uz znanje i odgovornost može osnažiti svakog','Samo stručnjaci koriste AI','AI zamenjuje sve ljude'], correct:1, explanation:'AI Starter Pack postoji da pokaže da je AI dostupan svima.' },
  ]},
};

module.exports = router;
