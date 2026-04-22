const router = require('express').Router();
const auth = require('../server/middleware');
const db = require('../server/db');

const TOTAL_MODULES = 7;
const LESSONS_PER_MODULE = 3;
const PASS_THRESHOLD = 0.4; // 40%

// Get full progress for user
router.get('/progress', auth, async (req, res) => {
  const userId = req.user.id;
  const progress = await db.progress.find({ userId });
  const quizResults = await db.quizResults.find({ userId });

  // Build structured progress
  const moduleProgress = {};
  for (let m = 1; m <= TOTAL_MODULES; m++) {
    moduleProgress[m] = {
      moduleId: m,
      lessons: {},
      quizScore: null,
      quizPassed: false,
      quizAttempts: 0,
      completed: false,
    };
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
  const certificateEarned = completedModules === TOTAL_MODULES;

  res.json({ moduleProgress, completedModules, totalModules: TOTAL_MODULES, certificateEarned });
});

// Mark lesson complete
router.post('/lesson/complete', auth, async (req, res) => {
  const { moduleId, lessonId } = req.body;
  const userId = req.user.id;
  const existing = await db.progress.findOne({ userId, moduleId, lessonId });
  if (!existing) {
    await db.progress.insert({ userId, moduleId, lessonId, completedAt: new Date().toISOString() });
  }
  res.json({ ok: true });
});

// Submit quiz
router.post('/quiz/submit', auth, async (req, res) => {
  const { moduleId, answers } = req.body; // answers: [{questionId, answer}]
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

  await db.quizResults.insert({
    userId, moduleId, score, correct,
    total: module.questions.length,
    passed,
    submittedAt: new Date().toISOString(),
  });

  res.json({ score, correct, total: module.questions.length, passed, results });
});

// Get certificate data
router.get('/certificate', auth, async (req, res) => {
  const userId = req.user.id;
  const quizResults = await db.quizResults.find({ userId });
  const completedModuleIds = [];

  for (let m = 1; m <= TOTAL_MODULES; m++) {
    const best = quizResults.filter(q => q.moduleId === m).reduce((a, b) => (!a || b.score > a.score) ? b : a, null);
    const progressRecs = await db.progress.find({ userId, moduleId: m });
    if (best && best.passed && progressRecs.length >= LESSONS_PER_MODULE) {
      completedModuleIds.push(m);
    }
  }

  if (completedModuleIds.length < TOTAL_MODULES) {
    return res.status(403).json({ error: 'Kurs nije završen.', completedModules: completedModuleIds.length });
  }

  const user = await db.users.findOne({ _id: userId });
  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    completedAt: new Date().toISOString(),
    ects: 2,
    discount: 100,
  });
});

// ===================== QUIZ DATA =====================
const QUIZ_DATA = {
  1: {
    questions: [
      {
        q: 'Koja od sledećih tehnologija koristi veštačku inteligenciju?',
        options: ['Digitalni sat', 'Kalkulator', 'Prepoznavanje glasa u telefonu', 'Rerna sa tajmerom'],
        correct: 2,
        explanation: 'Prepoznavanje glasa koristi AI da razume ljudski govor, pretvara zvuk u tekst i reaguje na komande – to je tipičan primer AI sistema.'
      },
      {
        q: 'Šta je osnovna karakteristika veštačke inteligencije?',
        options: ['Može da koristi bateriju duže', 'Može da obavlja zadatke koji zahtevaju ljudsku inteligenciju', 'Ima metalno telo i pištolj', 'Radi samo kad ima internet'],
        correct: 1,
        explanation: 'AI se koristi za obavljanje zadataka koje bi inače zahtevale ljudsku sposobnost razumevanja, odlučivanja i učenja.'
      },
      {
        q: 'Kako se zove skup uputstava koje AI koristi da bi rešila problem?',
        options: ['Generator', 'Algoritam', 'Automat', 'Motor'],
        correct: 1,
        explanation: 'Algoritam je niz precizno definisanih koraka koje mašina koristi za rešavanje problema.'
      },
      {
        q: 'Koji od sledećih primera je verovatno uska (slaba) veštačka inteligencija?',
        options: ['Robot koji razume sve oblasti života', 'AI koji predlaže sledeću pesmu na Spotify-u', 'Ljubimac robot koji sanja', 'Šrafciger sa senzorom'],
        correct: 1,
        explanation: 'Uska AI je specijalizovana za jedan zadatak – poput preporuke pesama. Ne razume kontekst, ne razmišlja globalno.'
      },
      {
        q: 'Šta AI koristi da nauči kako da prepoznaje obrasce i donosi odluke?',
        options: ['Emocije', 'Podatke i primere', 'Magnete', 'Kompas'],
        correct: 1,
        explanation: 'AI sistem uči iz velikog broja primera (podataka). Nema emocije – koristi podatke za donošenje zaključaka.'
      },
    ]
  },
  2: {
    questions: [
      {
        q: 'Kako AI vidi "problem" koji treba da reši?',
        options: ['Kao emociju koju treba prepoznati', 'Kao slučajan niz podataka', 'Kao niz stanja, pravila i ciljeva', 'Kao listu reči koju treba prevesti'],
        correct: 2,
        explanation: 'Za AI, svaki problem je formalizovan kao početno stanje, ciljno stanje, dozvoljene akcije i pravila.'
      },
      {
        q: 'Koja je uloga algoritma pretrage u rešavanju problema?',
        options: ['Da unapred zna tačno rešenje', 'Da pretvori problem u sliku', 'Da pretraži moguće puteve od početka do cilja', 'Da pošalje podatke korisniku'],
        correct: 2,
        explanation: 'Algoritam pretrage omogućava AI sistemu da istraži sve potencijalne pravce i pronađe optimalan put do rešenja.'
      },
      {
        q: 'Zašto AI koristi funkciju cilja?',
        options: ['Da izrazi svoje mišljenje', 'Da generiše nasumične odgovore', 'Da uporedi korisnike', 'Da zna kada je problem uspešno rešen'],
        correct: 3,
        explanation: 'Funkcija cilja pomaže AI da prepozna trenutak kada je dostigla očekivani ishod.'
      },
      {
        q: 'Koji od sledećih primera prikazuje AI koja rešava problem optimizacije?',
        options: ['AI koja prepoznaje lice na slici', 'AI koja bira najkraći put za dostavu', 'AI koja prevodi tekst reč po reč', 'AI koja sortira slike po veličini'],
        correct: 1,
        explanation: 'Optimizacija podrazumeva da AI ne traži samo bilo koje rešenje, već ono koje zadovoljava kriterijum "najboljeg" – najkraći put.'
      },
      {
        q: 'Kako AI zna koje akcije su dozvoljene prilikom rešavanja problema?',
        options: ['Na osnovu ljudskih emocija', 'Na osnovu unapred definisanih pravila', 'Kroz svesno rasuđivanje', 'Pogađanjem'],
        correct: 1,
        explanation: 'AI sistem koristi eksplicitno zadate uslove i pravila okruženja da bi znao koje poteze može ili ne može da izvrši.'
      },
    ]
  },
  3: {
    questions: [
      {
        q: 'Koja je tačna tvrdnja o odnosu AI, mašinskog učenja i dubokog učenja?',
        options: ['AI je podskup mašinskog učenja', 'Mašinsko učenje je deo AI, a duboko učenje je deo mašinskog učenja', 'AI, ML i DL su potpuno nepovezane oblasti', 'Duboko učenje i mašinsko učenje su isto'],
        correct: 1,
        explanation: 'Veštačka inteligencija je najširi pojam. Mašinsko učenje je metoda unutar AI, a duboko učenje je posebna vrsta mašinskog učenja.'
      },
      {
        q: 'Koji primer prikazuje AI bez mašinskog učenja?',
        options: ['Šahovski program koji igra po pravilima unetim od strane čoveka', 'E-mail filter koji se poboljšava analizom novih poruka', 'TikTok algoritam koji uči šta voliš', 'Aplikacija koja prevodi tekst koristeći podatke iz više jezika'],
        correct: 0,
        explanation: 'Ako program ne uči iz primera već se oslanja na unapred zadate instrukcije, to je AI bez mašinskog učenja.'
      },
      {
        q: 'Koji od sledećih scenarija koristi mašinsko učenje?',
        options: ['Kalkulator koji računa 56 + 27', 'YouTube koji predlaže video na osnovu prethodnog gledanja', 'Semafor koji menja svetla na svakih 60 sekundi', 'Štampač koji ispisuje dokumente'],
        correct: 1,
        explanation: 'YouTube koristi podatke o prethodnom ponašanju korisnika da bi predložio nove sadržaje – klasičan primer mašinskog učenja.'
      },
      {
        q: 'Zašto duboko učenje nosi naziv "duboko"?',
        options: ['Zato što koristi puno memorije', 'Zato što se koristi za dubinske analize', 'Zato što koristi više slojeva u neuronskoj mreži', 'Zato što zahteva dubinsko znanje programiranja'],
        correct: 2,
        explanation: 'Duboko učenje koristi višeslojne neuronske mreže – slojevi koji obrađuju podatke na različitim nivoima kompleksnosti.'
      },
      {
        q: 'Koji zadatak najverovatnije koristi duboko učenje?',
        options: ['Sabiranje dva broja', 'Pretraga reči u Word dokumentu', 'Sortiranje spiska po abecedi', 'Prepoznavanje lica na fotografiji'],
        correct: 3,
        explanation: 'Prepoznavanje lica zahteva analizu kompleksnih obrazaca – za to se koristi duboko učenje i složene neuronske mreže.'
      },
    ]
  },
  4: {
    questions: [
      {
        q: 'Šta je neuronska mreža?',
        options: ['Mreža interneta koja povezuje računare', 'Softverski model inspirisan radom ljudskog mozga', 'Skup pravila za igranje igrica', 'Program za obradu teksta'],
        correct: 1,
        explanation: 'Neuronska mreža je softverski model koji imitira strukturu i funkcionisanje neurona u ljudskom mozgu.'
      },
      {
        q: 'Šta je "duboko" u dubokom učenju?',
        options: ['Duboka memorija računara', 'Višeslojne neuronske mreže', 'Složeni matematički algoritmi', 'Obrada dubokih podataka'],
        correct: 1,
        explanation: 'Naziv "duboko" dolazi od više slojeva (layera) neurona, gde svaki sloj uči sve složenije karakteristike podataka.'
      },
      {
        q: 'Koja tehnika omogućava neuronskoj mreži da uči iz grešaka?',
        options: ['Feedforward', 'Backpropagation', 'Klasifikacija', 'Klasterizacija'],
        correct: 1,
        explanation: 'Backpropagation (povratno prostiranje greške) je algoritam koji koriguje težine u mreži na osnovu napravljenih grešaka.'
      },
      {
        q: 'Koje aplikacije koriste duboko učenje za prepoznavanje slika?',
        options: ['Tekstualni editori', 'Face unlock i sistemi za medicinsku dijagnostiku', 'Kalkulator', 'Tabele i baze podataka'],
        correct: 1,
        explanation: 'Face unlock, medicinska dijagnostika i autonomna vožnja su primeri gde duboko učenje analizira i prepoznaje vizuelne podatke.'
      },
      {
        q: 'Zašto duboko učenje zahteva više resursa od klasičnog ML?',
        options: ['Jer koristi starije algoritme', 'Jer treba više podataka i snažnije računare za obuku složenih mreža', 'Jer radi sporije', 'Jer zahteva internet vezu'],
        correct: 1,
        explanation: 'Duboko učenje zahteva mnogo više podataka, snažnije računare (GPU) i duže vreme za obuku, ali daje najpreciznije rezultate.'
      },
    ]
  },
  5: {
    questions: [
      {
        q: 'Koji AI alat pomaže u personalizaciji učenja?',
        options: ['Microsoft Word', 'Duolingo AI i Khan Academy', 'Adobe Photoshop', 'YouTube'],
        correct: 1,
        explanation: 'Duolingo koristi AI da predloži ponavljanje lekcija koje ti ne idu, a Khan Academy ima AI asistenta za pomoć pri rešavanju zadataka.'
      },
      {
        q: 'Kako AI može da pomogne u pisanju?',
        options: ['Može da zameni čoveka potpuno', 'Može da predloži ideje, koriguje gramatiku i poboljša strukturu teksta', 'Može samo da kopira tekst', 'Ne može da pomogne u pisanju'],
        correct: 1,
        explanation: 'AI alati kao ChatGPT mogu predlagati nastavke, korigovati greške, prestrukturirati tekst – ali odluke i kreativnost ostaju tvoje.'
      },
      {
        q: 'Šta je ograničenje AI asistenta pri donošenju odluka?',
        options: ['Previše je pametan', 'Nema internet pristup', 'Nema emocije ni kontekst tvog ličnog iskustva', 'Radi samo na engleskom'],
        correct: 2,
        explanation: 'AI ne razume tvoj lični kontekst, vrednosti i osećaje – zato ti si taj koji donosi konačnu odluku, AI je samo alat.'
      },
      {
        q: 'Koja razlika postoji između AI kalendara i običnog?',
        options: ['AI kalendar je skuplji', 'AI može da prilagođava planove u realnom vremenu i predlaže nove', 'Obični kalendar je pametniji', 'AI se koristi samo za velike kompanije'],
        correct: 1,
        explanation: 'AI ne samo da beleži – razume promene, postavlja pitanja i nudi rešenja kada se planovi poremete.'
      },
      {
        q: 'Zašto AI ne bi trebalo da zameni tvoju odgovornost?',
        options: ['Jer ne zna da razmišlja', 'Jer je alat, ne tvoj menadžer – ti odlučuješ, on pomaže', 'Jer nije dovoljno efikasan', 'Jer radi samo ako si programer'],
        correct: 1,
        explanation: 'AI je tu da ti olakša donošenje odluka, ne da ih donosi umesto tebe. On strukturira ono što ti već znaš – ali ti si i dalje taj koji vodi.'
      },
    ]
  },
  6: {
    questions: [
      {
        q: 'Kako nastaje pristrasnost u veštačkoj inteligenciji?',
        options: ['AI je programiran da bude nepravedan', 'AI automatski favorizuje moćne korisnike', 'AI uči iz istorijskih podataka koji mogu sadržati nesvesne pristrasnosti', 'Pristrasnost je posledica preopterećenja sistema'],
        correct: 2,
        explanation: 'AI ne razume pravednost. Ako su istorijski podaci pristrasni, AI će te obrasce samo preneti – ne zna da ih preispita.'
      },
      {
        q: 'Zašto je privatnost važna prilikom korišćenja AI alata?',
        options: ['Jer AI ne može funkcionisati bez privatnih podataka', 'Jer korisnici često nesvesno unose osetljive informacije koje se mogu koristiti dalje', 'Jer se privatnost odnosi na dizajn softvera', 'Jer zakon ne dozvoljava postavljanje pitanja'],
        correct: 1,
        explanation: 'Korisnici često otkrivaju lične informacije u interakciji sa AI. Te informacije mogu biti pohranjene i analizirane.'
      },
      {
        q: 'Koja je potencijalna opasnost od AI alata koji generišu slike i glas?',
        options: ['Usporavaju uređaje', 'Mogu da se koriste za pravljenje lažnih sadržaja (deepfake)', 'Koriste više RAM memorije', 'Ne mogu da razumeju nijanse jezika'],
        correct: 1,
        explanation: 'AI alati koji generišu slike ili glas mogu biti zloupotrebljeni za lažno predstavljanje i manipulaciju javnim mnjenjem.'
      },
      {
        q: 'Ko može snositi odgovornost kada AI sistem pogreši?',
        options: ['Samo programer', 'Samo korisnik', 'Samo vlada', 'Programeri, kompanije koje koriste AI i korisnici – kolektivna odgovornost'],
        correct: 3,
        explanation: 'Odgovornost u AI svetu je kolektivna: programeri, kompanije, korisnici i zakonodavci dele odgovornost za posledice.'
      },
      {
        q: 'Koja od sledećih tvrdnji je najtačnija o AI pristrasnosti?',
        options: ['AI je nepristrasan jer ne misli kao čovek', 'AI može biti pristrasan jer uči iz podataka koji odražavaju ljudske greške', 'AI uvek zna šta je etički ispravno', 'Ako AI odluči pogrešno, niko nije odgovoran'],
        correct: 1,
        explanation: 'AI nema vrednosni sistem. On uči iz podataka koje mu dajemo. Ako su podaci pogrešni ili diskriminatorni – i njegovi zaključci mogu biti takvi.'
      },
    ]
  },
  7: {
    questions: [
      {
        q: 'Koje veštine su najvažnije u svetu sa AI?',
        options: ['Samo tehničke IT veštine', 'Kritičko mišljenje, kreativnost, komunikacija i sposobnost učenja', 'Fizičke veštine', 'Poznavanje stranih jezika'],
        correct: 1,
        explanation: 'U svetu sa AI, veštine koje mašina ne može lako da imitira – kritičko mišljenje, empatija, kreativnost – postaju najvrednije.'
      },
      {
        q: 'Kako AI menja obrazovanje?',
        options: ['Ukida nastavnike potpuno', 'Personalizuje učenje, pomaže nastavnicima i prilagođava gradivo', 'Nema uticaja na obrazovanje', 'Pogoršava kvalitet nastave'],
        correct: 1,
        explanation: 'AI personalizuje učenje na osnovu napretka učenika, pomaže nastavnicima u pripremi i pruža trenutnu povratnu informaciju.'
      },
      {
        q: 'Šta je AGI (Artificial General Intelligence)?',
        options: ['Naziv za ChatGPT', 'AI sistem koji može da razume i rešava bilo koji intelektualni zadatak kao čovek', 'Robot sa veštačkim mišićima', 'Baza podataka'],
        correct: 1,
        explanation: 'AGI bi bio AI sistem sposoban da obavlja bilo koji intelektualni zadatak kao čovek – za razliku od današnje uske AI koja je specijalizovana.'
      },
      {
        q: 'Zašto je važna međunarodna regulacija AI?',
        options: ['Da uspori razvoj tehnologije', 'Da obezbedi sigurnost, pravičnost i sprečavanje zloupotreba na globalnom nivou', 'Da zaštiti patente', 'Da poveća cenu AI alata'],
        correct: 1,
        explanation: 'Bez regulacije, AI može biti zloupotrebljavan za nadzor, dezinformacije i diskriminaciju – međunarodni okviri štite građane.'
      },
      {
        q: 'Šta je najvažnija poruka ovog kursa?',
        options: ['AI je opasan i treba ga izbegavati', 'AI je alat koji uz znanje i odgovornost može osnažiti svakog čoveka', 'Samo stručnjaci trebaju koristiti AI', 'AI će zameniti sve ljude na poslu'],
        correct: 1,
        explanation: 'AI Starter Pack postoji da pokaže da je AI dostupan svima – i da znanje, odgovornost i radoznalost čine razliku.'
      },
    ]
  },
};

module.exports = router;
