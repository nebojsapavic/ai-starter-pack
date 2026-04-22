// ============================================================
// STATE
// ============================================================
let currentPage = null;
let userProgress = null;
let quizState = null; // { moduleId, questions, answers, currentQ, submitted }

// ============================================================
// ROUTER
// ============================================================
function navigate(page, params = {}) {
  currentPage = page;
  window.scrollTo(0, 0);

  // Update nav active
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });

  // Show/hide float CTA and update its label
  const floatCta = document.getElementById('float-cta');
  const isAuth = ['login', 'register'].includes(page);
  floatCta.style.display = isAuth ? 'none' : 'flex';
  document.getElementById('float-label').innerHTML =
    page === 'modules' || page === 'dashboard' ? 'MEJ KURS<br><span>Nastavi učenje</span>' : 'ZAPOČNI<br><span>Otkrij moć AI-a</span>';

  // Render
  const app = document.getElementById('app');
  if (page === 'home') renderHome(app);
  else if (page === 'about') renderAbout(app);
  else if (page === 'modules') renderModules(app, params);
  else if (page === 'lesson') renderLesson(app, params);
  else if (page === 'quiz') renderQuiz(app, params);
  else if (page === 'quiz-results') renderQuizResults(app, params);
  else if (page === 'dashboard') renderDashboard(app);
  else if (page === 'certificate') renderCertificate(app);
  else if (page === 'faq') renderFaq(app);
  else if (page === 'login') renderLogin(app);
  else if (page === 'register') renderRegister(app);

  // Scroll reveal
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.08 });
      obs.observe(el);
    });
  }, 50);
}

function handleCta() {
  const user = API.getUser();
  if (!user) navigate('register');
  else if (currentPage === 'dashboard') navigate('modules');
  else navigate('dashboard');
}

// ============================================================
// NAV USER STATE
// ============================================================
function updateNav() {
  const user = API.getUser();
  const authBtns = document.querySelectorAll('.nav-auth-btn');
  const navUser = document.getElementById('nav-user');
  const dashLink = document.querySelector('.nav-auth-item');

  if (user) {
    authBtns.forEach(b => b.style.display = 'none');
    navUser.style.display = 'flex';
    document.getElementById('nav-user-name').textContent = user.firstName;
    if (dashLink) dashLink.style.display = 'inline';
  } else {
    authBtns.forEach(b => b.style.display = 'inline-block');
    navUser.style.display = 'none';
    if (dashLink) dashLink.style.display = 'none';
  }
}

async function logout() {
  API.logout();
  userProgress = null;
  updateNav();
  navigate('home');
  showToast('Uspešno ste se odjavili.', 'success');
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.className = 'toast', 3000);
}

// ============================================================
// MODAL
// ============================================================
function openModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function closeModalOuter(e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); }

// ============================================================
// HELPERS
// ============================================================
function logoSVG(h = 32) {
  return `<img src="/img/logo.svg" alt="AI Starter Pack" style="height:${h}px;width:auto;filter:brightness(1)">`;
}

async function loadProgress() {
  if (!API.getToken()) return null;
  try { userProgress = await API.getProgress(); return userProgress; }
  catch { return null; }
}

function getModuleProgress(moduleId) {
  if (!userProgress) return { lessons: {}, quizPassed: false, completed: false, quizScore: null };
  return userProgress.moduleProgress[moduleId] || { lessons: {}, quizPassed: false, completed: false, quizScore: null };
}

function lessonsDone(moduleId) {
  const mp = getModuleProgress(moduleId);
  return Object.values(mp.lessons).filter(l => l.completed).length;
}

// ============================================================
// HOME
// ============================================================
function renderHome(app) {
  app.innerHTML = `
  <div class="page">
    <section class="hero">
      <div class="hero-tag"><span class="dot"></span>Besplatno · Za sve · Bez predznanja</div>
      <h1 class="hero-h1">Veštačka<br>inteligencija,<br><em>objašnjena.</em></h1>
      <p class="hero-sub">Besplatan online kurs kroz 7 modula. Razumi AI, primeni ga odmah i ostani korak ispred u svetu koji se menja.</p>
      <div class="hero-ctas">
        <button class="btn btn-red" onclick="navigate('register')">Počni besplatno</button>
        <button class="btn btn-outline" onclick="navigate('about')">Saznaj više</button>
      </div>
      <div class="hero-meta">
        <span>Bez kreditne kartice</span>
        <span>2 ECTS boda</span>
        <span>Digitalni sertifikat</span>
      </div>
      <div class="hero-stats">
        <div class="hero-stat"><div class="hero-stat-val">7</div><div class="hero-stat-label">Modula</div></div>
        <div class="hero-stat"><div class="hero-stat-val">21</div><div class="hero-stat-label">Lekcija</div></div>
        <div class="hero-stat"><div class="hero-stat-val">35</div><div class="hero-stat-label">Pitanja</div></div>
        <div class="hero-stat"><div class="hero-stat-val">2</div><div class="hero-stat-label">ECTS boda</div></div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="sec reveal">
      <div class="sec-eyebrow">Sadržaj kursa</div>
      <h2 class="sec-title">Šta te čeka u kursu?</h2>
      <p class="sec-subtitle">Kroz primere, praktične vežbe i realne AI alate, učićeš sve što ti je potrebno da budeš na TI sa veštačkom inteligencijom.</p>
      <div class="course-grid">
        <div class="c-item"><div class="c-num">Modul 01</div><div class="c-title">Osnove AI i kako "razmišlja"</div><div class="c-desc">Pojmovi, razlike, istorija i svakodnevni primeri</div></div>
        <div class="c-item"><div class="c-num">Modul 02</div><div class="c-title">Kako AI rešava probleme</div><div class="c-desc">Logika, pretraga, algoritmi i igre</div></div>
        <div class="c-item"><div class="c-num">Modul 03</div><div class="c-title">Uvod u mašinsko učenje</div><div class="c-desc">Nadgledano učenje, klasifikacija, regresija</div></div>
        <div class="c-item"><div class="c-num">Modul 04</div><div class="c-title">Neuronske mreže</div><div class="c-desc">Slojevi, backpropagation, CNN i transformeri</div></div>
        <div class="c-item"><div class="c-num">Modul 05</div><div class="c-title">AI u učenju i poslu</div><div class="c-desc">Produktivnost, asistenti i organizacija</div></div>
        <div class="c-item"><div class="c-num">Modul 06</div><div class="c-title">Odgovorno korišćenje AI</div><div class="c-desc">Pristrasnost, privatnost i etika</div></div>
      </div>
    </section>

    <div class="divider"></div>

    <section class="sec reveal">
      <div class="sec-eyebrow">Zašto ovaj kurs</div>
      <h2 class="sec-title">Dizajniran za sve</h2>
      <div class="features-grid">
        <div class="feature-card"><div class="feature-icon">🎓</div><div class="feature-title">Bez predznanja</div><div class="feature-desc">Za učenike, nastavnike, roditelje i profesionalce. Nema kodiranja ni matematike.</div></div>
        <div class="feature-card"><div class="feature-icon">⚡</div><div class="feature-title">Odmah primenjivo</div><div class="feature-desc">Praktični zadaci i AI alati koje možeš koristiti već danas u poslu i učenju.</div></div>
        <div class="feature-card"><div class="feature-icon">🏆</div><div class="feature-title">Sertifikat + ECTS</div><div class="feature-desc">Digitalni sertifikat sa 2 ECTS boda i 100€ popust za ITS ili ITHS.</div></div>
        <div class="feature-card"><div class="feature-icon">📱</div><div class="feature-title">Uvek dostupno</div><div class="feature-desc">Radi na svim uređajima. Učiš kada i koliko ti odgovara, bez roka.</div></div>
        <div class="feature-card"><div class="feature-icon">🆓</div><div class="feature-title">Potpuno besplatno</div><div class="feature-desc">Bez skrivenih troškova. Registruj se i počni odmah.</div></div>
        <div class="feature-card"><div class="feature-icon">🤖</div><div class="feature-title">Aktuelni sadržaj</div><div class="feature-desc">ChatGPT, neuronske mreže, etika AI – sadržaj koji prati najnovija dešavanja.</div></div>
      </div>
    </section>

    <section class="world-sec reveal">
      <div class="world-text">
        <div class="world-eyebrow">Zašto sada</div>
        <h2 class="world-h">AI menja<br><em>sve</em></h2>
        <p class="world-sub">Oni koji razumeju AI imaće prednost u obrazovanju, poslu i svakodnevnom životu. Ovaj kurs ti daje taj temelj.</p>
        <button class="btn btn-red" onclick="navigate('modules')">Istraži module →</button>
      </div>
      <div class="world-img-wrap">
        <img src="/img/world.png" alt="AI World">
      </div>
    </section>

    <div class="its-bar">
      <span class="its-name">Information Technology School</span>
      <div class="its-badge">INFORMATION<br>TECHNOLOGY<br>SCHOOL</div>
      <span class="its-name">AI Starter Pack</span>
    </div>

    <section class="mobile-sec reveal">
      <div>
        <div class="sec-eyebrow">Fleksibilno učenje</div>
        <h2 class="mobile-h">Uči kad želiš.<br>Tempom koji<br>ti odgovara.</h2>
        <p class="mobile-p">Kurs je online, interaktivan i dostupan na svim uređajima bez vremenskog ograničenja.</p>
        <p class="mobile-p">Na kraju kursa dobijaš <span class="hi">digitalni sertifikat</span>, <span class="hi">2 ECTS boda</span> i <span class="hi">100€ popust</span> za ITS/ITHS.</p>
        <div style="display:flex;gap:12px;margin-top:36px;flex-wrap:wrap">
          <button class="btn btn-red" onclick="navigate('register')">Počni besplatno</button>
          <button class="btn btn-outline" onclick="navigate('about')">O kursu</button>
        </div>
      </div>
      <div class="mobile-img"><img src="/img/book.png" alt="Uči bilo gde"></div>
    </section>

    <section class="slogan-sec reveal">
      <div class="slogan-q">"Oni koji znaju AI biće šefovi onima koji ne znaju."</div>
      <div class="slogan-sub">Upoznaj moć veštačke inteligencije i pozicioniraj se za budućnost.</div>
      <button class="btn btn-red" onclick="navigate('register')" style="padding:14px 32px;font-size:15px">Registruj se besplatno</button>
    </section>
    <div class="div-h"></div>
  </div>`;
}

}

// ============================================================
// ABOUT
// ============================================================
function renderAbout(app) {
  app.innerHTML = `
  <div class="page">
    <section class="about-hero sec">
      <div class="sec-label">O kursu</div>
      <h1 class="about-h1">AI Starter Pack<span>.</span></h1>
      <p class="sec-sub">Veštačka inteligencija više nije daleka budućnost – ona je tu, u tvom telefonu, pretraživaču, aplikacijama i poslu. Kurs "AI Starter Pack" je osmišljen da ti pomogne da razumeš kako AI funkcioniše – bez potrebe za prethodnim znanjem iz programiranja ili matematike.</p>
      <div class="two-col">
        ${[
          ['Šta ćeš naučiti?', ['Osnove AI i mašinskog učenja','Kako AI donosi odluke i rešava probleme','Kako AI uči iz podataka','Šta su neuronske mreže','AI u učenju, poslu i svakodnevici','Odgovorno i bezbedno korišćenje AI','Izazovi i budući uticaji AI na društvo']],
          ['Kako funkcioniše?', ['Online, samostalno, kad god želiš','Pristup s telefona, tableta ili računara','Nema ograničenog trajanja','Lekcije, zadaci, kvizovi i eksperimenti','Završni test: min. 40% za sertifikat','Potpuno besplatan']],
          ['Šta kurs jeste?', ['Uvod u AI kroz 7 modula','Praktičan – zadaci koje možeš odmah koristiti','Jednostavan jezik – bez tehničkog predznanja','Samostalno tempiran','Sa digitalnim sertifikatom na kraju']],
          ['Za koga je?', ['Učenici i studenti','Nastavnici i profesori','Roditelji','Zaposleni i nezaposleni','Svi koji žele da razumeju svet koji se menja']],
        ].map(([h, items]) => `
          <div class="info-block">
            <h3>${h}</h3>
            <ul class="info-list">${items.map(i => `<li>${i}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>
    </section>

    <div class="cert-box reveal" style="margin-bottom:0">
      <div>
        <div class="cert-title">Digitalni sertifikat + 2 ECTS</div>
        <div class="cert-desc">Po završetku kursa dobijaš personalizovani digitalni sertifikat koji možeš podeliti na LinkedIn-u ili priložiti uz CV. Sertifikat nosi 2 ECTS boda i popust od <strong>100€</strong> za upis na ITS ili ITHS.</div>
        <div class="cert-badges"><span class="cert-badge">2 ECTS Boda</span><span class="cert-badge">100€ Popust</span><span class="cert-badge">Besplatno</span></div>
      </div>
      <div style="text-align:center;font-size:80px;color:rgba(227,6,19,.15);line-height:1">🎓</div>
    </div>

    <section class="sec reveal">
      <div class="sec-label">Ko smo mi</div>
      <h2 class="sec-h">Podrška i partneri</h2>
      <div class="partners-grid">
        ${[
          ['www.its.edu.rs','ITS – Visoka škola za IT','Savremena visokoobrazovna ustanova lider u IT obrazovanju. Kombinuje teorijska znanja i praktične veštine, rad na realnim projektima i saradnju sa vodećim IT kompanijama.'],
          ['www.iths.edu.rs','ITHS – Srednja škola za IT','Jedna od najmodernijih IT škola u Srbiji. Smerovi: softverski inženjering, multimedija, sajber bezbednost, administracija mreža.'],
          ['ai.org.rs','Savez za AI Srbije','Nacionalna platforma koja ocuplja aktere iz akademije, IT sektora i privrede. Suorganizator kursa i ključni nosilac inicijative za AI pismenost u Srbiji.'],
        ].map(([url,name,desc]) => `
          <div class="partner-card">
            <div class="partner-url">${url}</div>
            <div class="partner-name">${name}</div>
            <div class="partner-desc">${desc}</div>
          </div>`).join('')}
      </div>
    </section>
    <div class="div-h"></div>
  </div>`;
}

// ============================================================
// MODULES
// ============================================================
async function renderModules(app, params) {
  await loadProgress();
  const user = API.getUser();

  const cards = MODULES.map(m => {
    const mp = getModuleProgress(m.id);
    const done = lessonsDone(m.id);
    const total = m.lessons.length;
    const pct = Math.round((done / total) * 100);
    const isCompleted = mp.completed;
    const quizPassed = mp.quizPassed;

    let statusLabel = 'Nije početo';
    if (isCompleted) statusLabel = '✓ Završeno';
    else if (done > 0) statusLabel = `${done}/${total} lekcija`;

    return `
    <div class="mod-card${isCompleted ? ' completed' : ''}" onclick="openModuleModal(${m.id})">
      <div class="mod-num">${m.id.toString().padStart(2,'0')}</div>
      <span class="mod-emoji">${m.emoji}</span>
      <div class="mod-title">${m.title}</div>
      <div class="mod-desc">${m.desc.substring(0,85)}…</div>
      <div class="mod-progress"><div class="mod-progress-bar" style="width:${pct}%"></div></div>
      <div style="font-size:11px;color:var(--grey2);font-family:var(--font-u);margin-bottom:12px">${statusLabel}${quizPassed ? ' · Kviz ✓' : ''}</div>
      <button class="mod-btn">${isCompleted ? 'PONOVI MODUL' : done > 0 ? 'NASTAVI' : 'SAZNAJ VIŠE'}</button>
    </div>`;
  }).join('');

  app.innerHTML = `
  <div class="page">
    <section class="modules-hero">
      <div class="m7-bg">7</div>
      <div class="sec-label">Kurs</div>
      <h1 class="modules-h">Šta te čeka u <span>7</span> modula?</h1>
      <p class="modules-sub">Kroz zanimljive primere, praktične vežbe i realne AI alate, učićeš sve što ti je potrebno da budeš na TI sa veštačkom inteligencijom.</p>
      ${user && userProgress ? `
      <div style="margin-top:20px;font-family:var(--font-u);font-size:13px;color:var(--grey)">
        Završeni moduli: <strong style="color:var(--white)">${userProgress.completedModules}/${userProgress.totalModules}</strong>
        ${userProgress.certificateEarned ? ' · <span style="color:var(--green)">🎓 Sertifikat dostupan!</span>' : ''}
      </div>` : ''}
    </section>
    <div class="modules-grid">${cards}</div>
  </div>`;
}

function openModuleModal(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  const mp = getModuleProgress(moduleId);
  const user = API.getUser();

  const lessonsHtml = m.lessons.map((l, i) => {
    const done = mp.lessons[l.id]?.completed;
    return `
    <div class="lesson-row" style="cursor:pointer" onclick="closeModal();navigate('lesson',{moduleId:${moduleId},lessonId:${l.id}})">
      <div class="lesson-n" style="${done ? 'color:var(--green)' : ''}">${done ? '✓' : `L${i+1}`}</div>
      <div>
        <div class="lesson-name">${l.title}</div>
        <div class="lesson-desc-sm">${done ? '<span style="color:var(--green)">Završeno</span>' : 'Nije početo'}</div>
      </div>
    </div>`;
  }).join('');

  const allLessonsDone = m.lessons.every(l => mp.lessons[l.id]?.completed);
  const quizBtn = user ? (allLessonsDone
    ? `<button class="btn btn-red btn-wide" style="margin-top:16px" onclick="closeModal();navigate('quiz',{moduleId:${moduleId}})">
        ${mp.quizPassed ? '🔄 Ponovi kviz' : '📝 Uradi kviz'}
       </button>`
    : `<div style="margin-top:14px;font-size:12px;color:var(--grey2);font-family:var(--font-u)">Završi sve lekcije da otključaš kviz.</div>`)
    : `<button class="btn btn-red btn-wide" style="margin-top:16px" onclick="closeModal();navigate('register')">Registruj se da počneš</button>`;

  const startBtn = user
    ? `<button class="btn btn-outline btn-wide" onclick="closeModal();navigate('lesson',{moduleId:${moduleId},lessonId:1})">
        ${mp.lessons[1]?.completed ? 'Nastavi' : 'Počni modul'}
       </button>`
    : '';

  openModal(`
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-header">
      <div class="modal-num-big">${m.id.toString().padStart(2,'0')}</div>
      <span class="modal-emoji">${m.emoji}</span>
      <div class="modal-title">${m.title}</div>
      <div class="modal-goal">Cilj: ${m.goal}</div>
    </div>
    <div class="modal-body">
      <div class="modal-desc">${m.desc}</div>
      <div class="modal-lessons">
        <h4>Lekcije</h4>
        ${lessonsHtml}
      </div>
      ${m.lessons[0]?.task ? `<div class="modal-task"><div class="modal-task-label">✅ Zadatak</div><p>${m.lessons[0].task}</p></div>` : ''}
      <div style="margin-top:20px;display:flex;flex-direction:column;gap:10px">
        ${startBtn}
        ${quizBtn}
      </div>
    </div>`);
}

// ============================================================
// LESSON VIEWER
// ============================================================
async function renderLesson(app, { moduleId, lessonId }) {
  const m = MODULES.find(x => x.id === moduleId);
  const lesson = m.lessons.find(l => l.id === lessonId);
  const user = API.getUser();

  // Mark as complete if logged in
  if (user) {
    API.completeLesson(moduleId, lessonId).then(() => loadProgress()).catch(() => {});
  }

  const dotsHtml = m.lessons.map(l => {
    const isDone = l.id < lessonId;
    const isActive = l.id === lessonId;
    return `<div class="l-dot${isDone ? ' done' : isActive ? ' active' : ''}"
      onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${l.id}})" title="Lekcija ${l.id}"></div>`;
  }).join('');

  const sectionsHtml = lesson.sections.map(s => `
    <div class="lesson-section">
      <h4>${s.heading}</h4>
      ${s.content.split('\n').map(line => {
        if (line.startsWith('•')) return `<p style="padding-left:16px;position:relative"><span style="position:absolute;left:0;color:var(--red)">›</span> ${line.substring(1).trim()}</p>`;
        if (line.trim() === '') return '';
        return `<p>${line}</p>`;
      }).join('')}
    </div>`).join('');

  const termsHtml = lesson.keyTerms ? `
    <div class="lesson-section">
      <h4>Ključni pojmovi</h4>
      <div class="key-term">
        ${lesson.keyTerms.map(kt => `
          <div class="kt-item">
            <div class="kt-term">${kt.term}</div>
            <div class="kt-def">${kt.def}</div>
          </div>`).join('')}
      </div>
    </div>` : '';

  const taskHtml = lesson.task ? `
    <div class="task-box">
      <div class="task-label">✅ Mini zadatak</div>
      <p>${lesson.task}</p>
    </div>` : '';

  const prevLesson = m.lessons.find(l => l.id === lessonId - 1);
  const nextLesson = m.lessons.find(l => l.id === lessonId + 1);

  const navHtml = `
    <div class="lesson-nav">
      ${prevLesson
        ? `<button class="btn btn-outline" onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${prevLesson.id}})">← Prethodna</button>`
        : `<button class="btn btn-outline" onclick="navigate('modules')">← Svi moduli</button>`}
      <span style="font-family:var(--font-u);font-size:11px;color:var(--grey2);letter-spacing:2px;text-transform:uppercase">${lessonId} / ${m.lessons.length}</span>
      ${nextLesson
        ? `<button class="btn btn-red" onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${nextLesson.id}})">Sledeća lekcija →</button>`
        : user
          ? `<button class="btn btn-red" onclick="navigate('quiz',{moduleId:${moduleId}})">📝 Idi na kviz →</button>`
          : `<button class="btn btn-red" onclick="navigate('modules')">Svi moduli →</button>`}
    </div>`;

  app.innerHTML = `
  <div class="page lesson-page">
    <div class="lesson-header">
      <div class="lesson-header-left">
        <div style="font-family:var(--font-u);font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red);margin-bottom:6px;cursor:pointer" onclick="navigate('modules')">
          ${m.emoji} MODUL ${m.id.toString().padStart(2,'0')}
        </div>
        <h2>${lesson.title}</h2>
        <p>Lekcija ${lessonId} od ${m.lessons.length} · ${m.title}</p>
      </div>
      <div class="lesson-progress-track">${dotsHtml}</div>
    </div>
    <div class="lesson-body">
      <h3>${lesson.title}</h3>
      <div class="lesson-intro">${lesson.intro}</div>
      ${sectionsHtml}
      ${termsHtml}
      ${taskHtml}
      ${navHtml}
    </div>
  </div>`;
}

// ============================================================
// QUIZ
// ============================================================
const QUIZ_QUESTIONS = {
  1: [
    { q:'Koja od sledećih tehnologija koristi veštačku inteligenciju?', opts:['Digitalni sat','Kalkulator','Prepoznavanje glasa u telefonu','Rerna sa tajmerom'], correct:2, exp:'Prepoznavanje glasa koristi AI da razume ljudski govor – to je tipičan primer AI sistema.' },
    { q:'Šta je osnovna karakteristika veštačke inteligencije?', opts:['Može da koristi bateriju duže','Može da obavlja zadatke koji zahtevaju ljudsku inteligenciju','Ima metalno telo i pištolj','Radi samo kad ima internet'], correct:1, exp:'AI se koristi za obavljanje zadataka koje bi inače zahtevale ljudsku sposobnost razumevanja i odlučivanja.' },
    { q:'Kako se zove skup uputstava koje AI koristi da reši problem?', opts:['Generator','Algoritam','Automat','Motor'], correct:1, exp:'Algoritam je niz precizno definisanih koraka koje mašina koristi za rešavanje problema.' },
    { q:'Koji od primera je uska (slaba) veštačka inteligencija?', opts:['Robot koji razume sve oblasti','AI koji predlaže pesmu na Spotify-u','Ljubimac robot koji sanja','Šrafciger sa senzorom'], correct:1, exp:'Uska AI je specijalizovana za jedan zadatak. Preporuka pesama je klasičan primer uske AI.' },
    { q:'Šta AI koristi da nauči da prepoznaje obrasce?', opts:['Emocije','Podatke i primere','Magnete','Kompas'], correct:1, exp:'AI sistem uči iz velikog broja primera (podataka), ne iz emocija ili fizičkih alata.' },
  ],
  2: [
    { q:'Kako AI vidi "problem" koji treba da reši?', opts:['Kao emociju','Kao slučajan niz podataka','Kao niz stanja, pravila i ciljeva','Kao listu reči'], correct:2, exp:'Za AI, svaki problem je formalizovan kao početno stanje, ciljno stanje, dozvoljene akcije i pravila.' },
    { q:'Koja je uloga algoritma pretrage?', opts:['Da unapred zna rešenje','Da pretvori problem u sliku','Da pretraži puteve od početka do cilja','Da pošalje podatke'], correct:2, exp:'Algoritam pretrage omogućava AI da istraži sve potencijalne pravce i pronađe optimalan put.' },
    { q:'Zašto AI koristi funkciju cilja?', opts:['Da izrazi mišljenje','Da generiše nasumične odgovore','Da uporedi korisnike','Da zna kada je problem rešen'], correct:3, exp:'Funkcija cilja pomaže AI da prepozna kada je dostigla očekivani ishod.' },
    { q:'Koji primer prikazuje AI koja rešava problem optimizacije?', opts:['AI koja prepoznaje lice','AI koja bira najkraći put za dostavu','AI koja prevodi tekst','AI koja sortira slike'], correct:1, exp:'Optimizacija znači tražiti ne bilo koje rešenje, već ono koje zadovoljava kriterijum "najboljeg".' },
    { q:'Kako AI zna koje akcije su dozvoljene?', opts:['Na osnovu emocija','Na osnovu unapred definisanih pravila','Kroz svesno rasuđivanje','Pogađanjem'], correct:1, exp:'AI koristi eksplicitno zadate uslove i pravila okruženja.' },
  ],
  3: [
    { q:'Tačna tvrdnja o AI, ML i dubokom učenju?', opts:['AI je podskup ML','ML je deo AI, a DL je deo ML','AI, ML i DL su nepovezani','DL i ML su isto'], correct:1, exp:'AI je najširi pojam, ML je metoda unutar AI, a DL je posebna vrsta ML zasnovana na neuronskim mrežama.' },
    { q:'Koji primer prikazuje AI bez ML?', opts:['Šahovski program koji igra po unapred zadatim pravilima','Email filter koji se poboljšava','TikTok algoritam koji uči','Prevodilač koji koristi podatke'], correct:0, exp:'Ako program ne uči iz primera već sledi unapred zadate instrukcije, to je AI bez mašinskog učenja.' },
    { q:'Koji scenario koristi mašinsko učenje?', opts:['Kalkulator koji računa','YouTube koji predlaže video','Semafor koji menja svetla','Štampač koji ispisuje'], correct:1, exp:'YouTube koristi podatke o prethodnom ponašanju korisnika da predloži sadržaj – klasičan ML.' },
    { q:'Zašto DL nosi naziv "duboko"?', opts:['Koristi puno memorije','Za dubinske analize','Ima više slojeva u neuronskoj mreži','Zahteva dubinsko znanje'], correct:2, exp:'Naziv dolazi od višeslojnih neuronskih mreža koje obrađuju podatke na rastućim nivoima apstrakcije.' },
    { q:'Koji zadatak koristi duboko učenje?', opts:['Sabiranje brojeva','Pretraga reči','Sortiranje po abecedi','Prepoznavanje lica na fotografiji'], correct:3, exp:'Prepoznavanje lica zahteva analizu kompleksnih vizuelnih obrazaca – to je domen dubokog učenja.' },
  ],
  4: [
    { q:'Šta je neuronska mreža?', opts:['Mreža interneta','Softverski model inspirisan radom mozga','Skup pravila za igrice','Program za obradu teksta'], correct:1, exp:'Neuronska mreža je softverski model koji imitira strukturu i funkcionisanje neurona u mozgu.' },
    { q:'Šta je "duboko" u dubokom učenju?', opts:['Duboka memorija','Višeslojne neuronske mreže','Složeni algoritmi','Obrada dubokih podataka'], correct:1, exp:'Naziv dolazi od više slojeva neurona, gde svaki sloj uči sve složenije karakteristike.' },
    { q:'Koja tehnika omogućava neuronskoj mreži da uči iz grešaka?', opts:['Feedforward','Backpropagation','Klasifikacija','Klasterizacija'], correct:1, exp:'Backpropagation propagira grešku unazad kroz mrežu i koriguje težine da bi smanjio grešku.' },
    { q:'Koje aplikacije koriste DL za prepoznavanje slika?', opts:['Tekstualni editori','Face unlock i medicinska dijagnostika','Kalkulator','Tabele i baze podataka'], correct:1, exp:'Face unlock, medicinska dijagnostika i autonomna vožnja su primeri gde DL analizira vizuelne podatke.' },
    { q:'Zašto DL zahteva više resursa?', opts:['Koristi starije algoritme','Treba više podataka i snažnije računare','Radi sporije','Zahteva internet'], correct:1, exp:'DL mreže sa mnogo slojeva zahtevaju ogromne količine podataka i snažne GPU za obuku.' },
  ],
  5: [
    { q:'Koji AI alat pomaže u personalizaciji učenja?', opts:['Microsoft Word','Duolingo AI i Khan Academy','Adobe Photoshop','YouTube'], correct:1, exp:'Duolingo i Khan Academy koriste AI da prilagode lekcije napretku i greškama korisnika.' },
    { q:'Kako AI može pomoći u pisanju?', opts:['Može potpuno zameniti čoveka','Predlaže ideje, koriguje gramatiku i poboljšava strukturu','Može samo kopirati tekst','Ne može pomoći'], correct:1, exp:'AI alati mogu predlagati nastavke, korigovati greške i prestrukturirati tekst – ali odluke su tvoje.' },
    { q:'Šta je ograničenje AI asistenta?', opts:['Previše je pametan','Nema internet','Nema emocije ni lični kontekst','Radi samo na engleskom'], correct:2, exp:'AI ne razume tvoj lični kontekst, vrednosti i osećaje – zato ti donosiš konačnu odluku.' },
    { q:'Razlika između AI kalendara i običnog?', opts:['AI je skuplji','AI prilagođava planove u realnom vremenu','Obični je pametniji','AI samo za firme'], correct:1, exp:'AI ne samo beleži – razume promene, postavlja pitanja i nudi rešenja kada se planovi poremete.' },
    { q:'Zašto AI ne bi trebalo da zameni tvoju odgovornost?', opts:['Ne zna da razmišlja','Jer je alat – ti odlučuješ, on pomaže','Nije efikasan','Radi samo ako si programer'], correct:1, exp:'AI je tu da olakša donošenje odluka, ne da ih donosi umesto tebe.' },
  ],
  6: [
    { q:'Kako nastaje pristrasnost u AI?', opts:['Programiran je da bude nepravedan','Favorizuje moćne korisnike','Uči iz istorijskih podataka koji mogu biti pristrasni','Posledica je preopterećenja'], correct:2, exp:'AI ne razume pravednost. Ako su istorijski podaci pristrasni, AI će te obrasce preneti.' },
    { q:'Zašto je privatnost važna pri korišćenju AI alata?', opts:['AI ne može bez privatnih podataka','Korisnici unose osetljive info koje se mogu koristiti dalje','Odnosi se na dizajn','Zakon ne dozvoljava pitanja'], correct:1, exp:'Korisnici često otkrivaju lične informacije koje mogu biti pohranjene i analizirane.' },
    { q:'Opasnost od AI alata koji generišu slike i glas?', opts:['Usporavaju uređaje','Mogu se koristiti za deepfake i lažni sadržaj','Koriste RAM','Ne razumeju nijanse'], correct:1, exp:'AI alati mogu biti zloupotrebljeni za lažno predstavljanje i manipulaciju javnim mnjenjem.' },
    { q:'Ko snosi odgovornost kada AI pogreši?', opts:['Samo programer','Samo korisnik','Samo vlada','Programeri, kompanije i korisnici – kolektivno'], correct:3, exp:'Odgovornost u AI svetu je kolektivna: programeri, kompanije, korisnici i zakonodavci dele je.' },
    { q:'Najtačnija tvrdnja o AI pristrasnosti?', opts:['AI je nepristrasan jer ne misli kao čovek','AI može biti pristrasan jer uči iz podataka koji odražavaju ljudske greške','AI uvek zna šta je etički','Ako AI pogreši, niko nije odgovoran'], correct:1, exp:'AI nema vrednosni sistem. Ako su podaci pogrešni ili diskriminatorni, i zaključci mogu biti takvi.' },
  ],
  7: [
    { q:'Koje veštine su najvažnije u svetu sa AI?', opts:['Samo IT veštine','Kritičko mišljenje, kreativnost, komunikacija','Fizičke veštine','Strani jezici'], correct:1, exp:'Veštine koje mašina ne može lako imitirati – kritičko mišljenje, empatija, kreativnost – postaju najvrednije.' },
    { q:'Kako AI menja obrazovanje?', opts:['Ukida nastavnike','Personalizuje učenje i pomaže nastavnicima','Nema uticaja','Pogoršava nastavu'], correct:1, exp:'AI personalizuje učenje na osnovu napretka, pomaže nastavnicima i pruža trenutnu povratnu informaciju.' },
    { q:'Šta je AGI?', opts:['Naziv za ChatGPT','AI koji rešava bilo koji intelektualni zadatak kao čovek','Robot sa veštačkim mišićima','Baza podataka'], correct:1, exp:'AGI bi bio AI sistem sposoban za bilo koji intelektualni zadatak – za razliku od danas uske AI.' },
    { q:'Zašto je važna međunarodna regulacija AI?', opts:['Da uspori razvoj','Da obezbedi sigurnost, pravičnost i spreči zloupotrebe','Da zaštiti patente','Da poveća cenu'], correct:1, exp:'Bez regulacije, AI može biti zloupotrebljavan – međunarodni okviri štite građane.' },
    { q:'Najvažnija poruka ovog kursa?', opts:['AI je opasan','AI je alat koji uz znanje i odgovornost može osnažiti svakog čoveka','Samo stručnjaci treba da koriste AI','AI će zameniti sve ljude'], correct:1, exp:'AI Starter Pack postoji da pokaže da je AI dostupan svima – znanje i odgovornost čine razliku.' },
  ],
};

async function renderQuiz(app, { moduleId }) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }

  await loadProgress();
  const mp = getModuleProgress(moduleId);
  const allLessonsDone = MODULES.find(m => m.id === moduleId).lessons.every(l => mp.lessons[l.id]?.completed);
  if (!allLessonsDone) {
    showToast('Završi sve lekcije pre kviza.', 'error');
    navigate('modules');
    return;
  }

  const m = MODULES.find(x => x.id === moduleId);
  const questions = QUIZ_QUESTIONS[moduleId];

  quizState = { moduleId, questions, answers: new Array(questions.length).fill(null), currentQ: 0, submitted: false };
  renderQuizQuestion(app);
}

function renderQuizQuestion(app) {
  const { questions, answers, currentQ, moduleId } = quizState;
  const m = MODULES.find(x => x.id === moduleId);
  const q = questions[currentQ];
  const answered = answers[currentQ] !== null;
  const letters = ['A', 'B', 'C', 'D'];

  const dotsHtml = questions.map((_, i) => `
    <div class="qp-dot${answers[i] !== null ? ' answered' : ''}"></div>`).join('');

  const optsHtml = q.opts.map((opt, i) => {
    let cls = '';
    if (answered) {
      if (i === q.correct) cls = ' correct';
      else if (i === answers[currentQ]) cls = ' wrong';
    } else if (i === answers[currentQ]) cls = ' selected';
    return `
    <button class="option${cls}" ${answered ? 'disabled' : ''} onclick="selectAnswer(${i})">
      <span class="opt-letter">${letters[i]}</span> ${opt}
    </button>`;
  }).join('');

  const isLast = currentQ === questions.length - 1;
  const allAnswered = answers.every(a => a !== null);

  app.innerHTML = `
  <div class="page quiz-page">
    <div class="quiz-wrap">
      <div class="quiz-header">
        <div style="font-family:var(--font-u);font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--red);margin-bottom:8px;cursor:pointer" onclick="navigate('modules')">
          ${m.emoji} MODUL ${moduleId.toString().padStart(2,'0')} · KVIZ
        </div>
        <h2>Provjeri znanje</h2>
        <p>Pitanje ${currentQ + 1} od ${questions.length} · Potrebno 40% za prolaz</p>
      </div>
      <div class="quiz-progress">${dotsHtml}</div>
      <div class="question-card">
        <div class="question-num">Pitanje ${currentQ + 1}</div>
        <div class="question-text">${q.q}</div>
        <div class="options">${optsHtml}</div>
        <div class="explanation${answered ? ' show' : ''}" id="explanation">
          📌 ${q.exp}
        </div>
      </div>
      <div class="quiz-actions">
        ${currentQ > 0
          ? `<button class="btn btn-outline" onclick="quizPrev()">← Prethodno</button>`
          : `<button class="btn btn-outline" onclick="navigate('modules')">← Odustani</button>`}
        <div style="display:flex;gap:10px">
          ${!isLast && answered
            ? `<button class="btn btn-red" onclick="quizNext()">Sledeće →</button>`
            : ''}
          ${isLast && allAnswered
            ? `<button class="btn btn-red" onclick="submitQuiz()">📊 Pogledaj rezultate</button>`
            : ''}
          ${isLast && !allAnswered && answered
            ? `<button class="btn btn-dark" disabled>Odgovori na sva pitanja</button>`
            : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function selectAnswer(optionIndex) {
  if (quizState.answers[quizState.currentQ] !== null) return;
  quizState.answers[quizState.currentQ] = optionIndex;
  renderQuizQuestion(document.getElementById('app'));
}

function quizNext() {
  if (quizState.currentQ < quizState.questions.length - 1) {
    quizState.currentQ++;
    renderQuizQuestion(document.getElementById('app'));
  }
}

function quizPrev() {
  if (quizState.currentQ > 0) {
    quizState.currentQ--;
    renderQuizQuestion(document.getElementById('app'));
  }
}

async function submitQuiz() {
  const { moduleId, questions, answers } = quizState;
  try {
    const payload = answers.map((a, i) => ({ questionId: i, answer: a }));
    const result = await API.submitQuiz(moduleId, payload);
    await loadProgress();
    navigate('quiz-results', { moduleId, result });
  } catch (e) {
    showToast(e.message, 'error');
  }
}

function renderQuizResults(app, { moduleId, result }) {
  const m = MODULES.find(x => x.id === moduleId);
  const pct = Math.round(result.score * 100);
  const isPassed = result.passed;

  const detailsHtml = result.results.map((r, i) => {
    const q = QUIZ_QUESTIONS[moduleId][i];
    const letters = ['A','B','C','D'];
    return `
    <div style="padding:16px 0;border-bottom:1px solid var(--border)">
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">${i+1}. ${q.q}</div>
      <div style="font-size:12px;margin-bottom:4px;color:${r.correct ? 'var(--green)' : '#ef4444'}">
        ${r.correct ? '✓' : '✗'} Tvoj odgovor: ${letters[r.userAnswer]} – ${q.opts[r.userAnswer]}
      </div>
      ${!r.correct ? `<div style="font-size:12px;color:var(--green)">✓ Tačan: ${letters[r.correctAnswer]} – ${q.opts[r.correctAnswer]}</div>` : ''}
      <div style="font-size:11px;color:var(--grey2);margin-top:6px;padding:8px 12px;background:rgba(255,255,255,.03);border-left:2px solid var(--grey2)">
        ${r.explanation}
      </div>
    </div>`;
  }).join('');

  app.innerHTML = `
  <div class="page">
    <div class="results-wrap">
      <div class="results-icon">${isPassed ? '🎉' : '📚'}</div>
      <div class="results-score ${isPassed ? 'pass' : 'fail'}">${pct}%</div>
      <div class="results-label">${result.correct} od ${result.total} tačnih odgovora</div>
      <div class="results-msg">
        ${isPassed
          ? `<strong style="color:var(--green)">Čestitamo! Prošli ste kviz za Modul ${moduleId}.</strong><br>Možeš nastaviti na sledeći modul.`
          : `<strong style="color:#ef4444">Nisi prošao/la ovaj put.</strong><br>Potrebno je min. 40% (${Math.ceil(result.total * 0.4)} tačna odgovora). Ponovi lekcije i pokušaj ponovo.`}
      </div>
      <div class="results-btns">
        ${isPassed && moduleId < 7
          ? `<button class="btn btn-red" onclick="navigate('lesson',{moduleId:${moduleId+1},lessonId:1})">Sledeći modul →</button>`
          : ''}
        ${isPassed && moduleId === 7
          ? `<button class="btn btn-green" onclick="navigate('certificate')">🎓 Preuzmi sertifikat</button>`
          : ''}
        <button class="btn btn-outline" onclick="navigate('quiz',{moduleId:${moduleId}})">🔄 Ponovi kviz</button>
        <button class="btn btn-dark" onclick="navigate('modules')">Svi moduli</button>
      </div>
      <div style="margin-top:40px;text-align:left">
        <div style="font-family:var(--font-u);font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--grey2);margin-bottom:16px">Pregled odgovora</div>
        ${detailsHtml}
      </div>
    </div>
  </div>`;
}

// ============================================================
// DASHBOARD
// ============================================================
async function renderDashboard(app) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }
  await loadProgress();
  const p = userProgress || { moduleProgress: {}, completedModules: 0, totalModules: 7, certificateEarned: false };

  const totalLessons = MODULES.reduce((a, m) => a + m.lessons.length, 0);
  let doneLessons = 0;
  let quizzesPassed = 0;
  Object.values(p.moduleProgress).forEach(mp => {
    doneLessons += Object.values(mp.lessons).filter(l => l.completed).length;
    if (mp.quizPassed) quizzesPassed++;
  });
  const overallPct = Math.round((p.completedModules / p.totalModules) * 100);

  const modCards = MODULES.map(m => {
    const mp = p.moduleProgress[m.id] || { lessons: {}, quizPassed: false, completed: false };
    const done = Object.values(mp.lessons).filter(l => l.completed).length;
    const pct = Math.round((done / m.lessons.length) * 100);
    const isCompleted = mp.completed;
    let nextAction, nextLabel;
    if (isCompleted) { nextAction = `navigate('quiz',{moduleId:${m.id}})`; nextLabel = '🔄 Ponovi'; }
    else if (done < m.lessons.length) {
      const nextLesson = m.lessons.find(l => !mp.lessons[l.id]?.completed);
      nextAction = `navigate('lesson',{moduleId:${m.id},lessonId:${nextLesson ? nextLesson.id : 1}})`;
      nextLabel = done === 0 ? '▶ Počni' : '▶ Nastavi';
    } else {
      nextAction = `navigate('quiz',{moduleId:${m.id}})`;
      nextLabel = '📝 Uradi kviz';
    }

    return `
    <div class="dash-mod${isCompleted ? ' completed' : ''}" onclick="${nextAction}">
      <div class="dash-mod-top">
        <div class="dash-mod-num">${m.id.toString().padStart(2,'0')}</div>
        <div class="dash-mod-status">${isCompleted ? '✓ Završeno' : done > 0 ? 'U toku' : 'Nije početo'}</div>
      </div>
      <div class="dash-mod-title">${m.emoji} ${m.title}</div>
      <div class="dash-progress"><div class="dash-progress-bar" style="width:${pct}%"></div></div>
      <div class="dash-mod-info">${done}/${m.lessons.length} lekcija · ${mp.quizPassed ? 'Kviz ✓' : mp.quizAttempts > 0 ? `Kviz (${Math.round((mp.quizScore||0)*100)}%)` : 'Kviz čeka'}</div>
      <span class="dash-mod-cta">${nextLabel} →</span>
    </div>`;
  }).join('');

  app.innerHTML = `
  <div class="page">
    <div class="dashboard-hero">
      <div class="dash-greeting">Zdravo, <span>${user.firstName}</span>!</div>
      <div class="dash-meta">Nastavi tamo gde si stao/la · AI Starter Pack</div>
      ${p.certificateEarned
        ? `<div style="margin-top:16px;padding:14px 20px;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.3);display:inline-block">
            <span style="color:var(--green);font-family:var(--font-u);font-size:13px;font-weight:700;letter-spacing:1px">
              🎓 Čestitamo! Kurs je završen. 
            </span>
            <button class="btn btn-green btn-sm" style="margin-left:16px" onclick="navigate('certificate')">Preuzmi sertifikat</button>
           </div>` : ''}
    </div>
    <div class="dash-stats">
      <div class="stat-card"><div class="stat-val">${overallPct}%</div><div class="stat-label">Kurs završen</div></div>
      <div class="stat-card"><div class="stat-val">${doneLessons}</div><div class="stat-label">Lekcija završeno</div></div>
      <div class="stat-card"><div class="stat-val">${quizzesPassed}</div><div class="stat-label">Kvizova položeno</div></div>
      <div class="stat-card"><div class="stat-val">${p.completedModules}/7</div><div class="stat-label">Modula završeno</div></div>
    </div>
    <div class="dash-modules">
      <div class="sec-label">Moduli</div>
      <h2 class="sec-h">Tvoj napredak</h2>
      <div class="dash-mod-grid">${modCards}</div>
    </div>
  </div>`;
}

// ============================================================
// CERTIFICATE
// ============================================================
async function renderCertificate(app) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }

  app.innerHTML = `<div class="page cert-page"><div style="text-align:center;padding:80px;color:var(--grey)">Učitavanje...</div></div>`;

  let certData;
  try {
    certData = await API.getCertificate();
  } catch (e) {
    app.innerHTML = `
    <div class="page cert-page">
      <div style="max-width:600px;margin:80px auto;text-align:center">
        <div style="font-size:48px;margin-bottom:20px">🔒</div>
        <h2 style="font-family:var(--font-d);font-size:28px;text-transform:uppercase;margin-bottom:12px">Sertifikat nije dostupan</h2>
        <p style="color:var(--grey);margin-bottom:8px">Potrebno je završiti sve module i položiti sve kvizove (min. 40%).</p>
        <p style="color:var(--grey2);font-size:13px;margin-bottom:32px">${e.message}</p>
        <button class="btn btn-red" onclick="navigate('dashboard')">Nastavi kurs</button>
      </div>
    </div>`;
    return;
  }

  const date = new Date(certData.completedAt).toLocaleDateString('sr-RS', { day:'numeric', month:'long', year:'numeric' });

  app.innerHTML = `
  <div class="page cert-page">
    <div class="sec-label" style="justify-content:center;margin-bottom:12px">Sertifikat</div>
    <h2 class="sec-h" style="text-align:center;margin-bottom:40px">Tvoj AI Starter Pack sertifikat</h2>
    <div class="cert-preview" id="cert-preview">
      <div class="cert-inner">
        <div class="cert-logo-wrap">${logoSVG(36)}</div>
        <div class="cert-word">Sertifikat o završetku</div>
        <div class="cert-title-big">AI Starter Pack</div>
        <div class="cert-to">Dodeljuje se</div>
        <div class="cert-name">${certData.firstName} ${certData.lastName}</div>
        <div class="cert-body">
          za uspešno završen kurs <strong>AI Starter Pack</strong> – besplatni online kurs o veštačkoj inteligenciji kroz 7 modula, koji obuhvata osnove AI, mašinsko učenje, neuronske mreže, praktičnu primenu i etiku AI.
        </div>
        <div class="cert-badges-wrap">
          <div class="cert-badge-big"><span>${certData.ects}</span> ECTS Boda</div>
          <div class="cert-badge-big"><span>${certData.discount}€</span> Popust ITS/ITHS</div>
        </div>
        <div class="cert-date">${date}</div>
        <div class="cert-partners">
          <div><div class="cert-partner-name">Visoka škola za IT</div><div style="font-size:9px;color:var(--grey2)">www.its.edu.rs</div></div>
          <div style="text-align:center"><div style="font-size:28px">🤖</div><div class="cert-partner-name" style="font-size:9px">Savez za AI Srbije</div></div>
          <div style="text-align:right"><div class="cert-partner-name">Srednja škola za IT</div><div style="font-size:9px;color:var(--grey2)">www.iths.edu.rs</div></div>
        </div>
      </div>
    </div>
    <div class="cert-actions">
      <button class="btn btn-red" onclick="window.print()">🖨️ Štampaj / PDF</button>
      <button class="btn btn-outline" onclick="navigate('dashboard')">← Nazad na kurs</button>
    </div>
  </div>`;
}

// ============================================================
// FAQ
// ============================================================
function renderFaq(app) {
  const faqs = [
    ['Da li je kurs stvarno besplatan?', 'Da! Kurs je potpuno besplatan za sve korisnike. Dovoljno je da se registruješ i možeš odmah da počneš sa učenjem.'],
    ['Da li moram da znam programiranje?', 'Ne. Kurs je osmišljen za sve – bez obzira na prethodno znanje. Nema kodiranja, samo jednostavna i jasna objašnjenja.'],
    ['Koliko vremena mi je potrebno?', 'Kurs ima 7 modula sa po 3 lekcije. Svaki modul traje oko 1–1.5 sat, ali tempo određuješ ti – učiš kad hoćeš.'],
    ['Da li mogu da učim preko telefona?', 'Naravno! Kurs je dostupan na svim uređajima – telefonu, tabletu ili računaru. Potrebna je internet veza.'],
    ['Kako se dobija sertifikat?', 'Za sertifikat trebaš završiti sve lekcije u svih 7 modula i položiti svaki kviz sa min. 40% tačnih odgovora. Sertifikat nosi 2 ECTS boda i 100€ popust za ITS/ITHS.'],
    ['Šta ako ne položim kviz?', 'Nema problema! Možeš ponovo proći lekcije i pokušati kviz koliko god puta želiš. Nema vremenskog ograničenja.'],
    ['Da li mogu da se vratim na prethodne lekcije?', 'Apsolutno. Imaš stalni pristup svim lekcijama i možeš ih ponovo čitati kad god poželiš.'],
    ['Može li se kurs koristiti u školama?', 'Da! Idealan je za kolektivno učenje u školama i firmama. Kontaktiraj nas na upis@its.edu.rs za implementaciju.'],
    ['Da li je kurs dostupan van Srbije?', 'Da, svi koji govore srpski mogu pristupiti kursu bez obzira na lokaciju.'],
    ['Imam još pitanja – kome da se obratim?', 'Piši nam na upis@its.edu.rs ili pozovi +381 (0)11/40-11-216. Viber/WhatsApp: +381 (0)65/20-15-880'],
  ];

  app.innerHTML = `
  <div class="page">
    <section class="sec faq-section">
      <div class="sec-label">Pitanja i odgovori</div>
      <h2 class="sec-h">Sve što te zanima<br>pre nego što kreneš</h2>
      <div class="faq-list">
        ${faqs.map(([q, a], i) => `
          <div class="faq-item">
            <button class="faq-q" onclick="toggleFaq(this)">
              <span>${i+1}. ${q}</span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-a"><div class="faq-a-inner">${a}</div></div>
          </div>`).join('')}
      </div>
    </section>
    <div class="div-h"></div>
  </div>`;
}

function toggleFaq(btn) {
  const a = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(b => { b.classList.remove('open'); b.nextElementSibling.style.maxHeight = '0'; });
  if (!isOpen) { btn.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; }
}

// ============================================================
// AUTH
// ============================================================
function renderLogin(app) {
  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-bg"></div><div class="auth-grid-bg"></div>
    <div class="auth-wrap">
      <div class="auth-tabs">
        <button class="auth-tab active" onclick="navigate('login')">Prijava</button>
        <button class="auth-tab" onclick="navigate('register')">Registracija</button>
      </div>
      <div class="auth-box">
        <h2>Login</h2>
        <div class="f-error" id="login-err"></div>
        <div class="f-group"><label class="f-label">Email adresa:</label><input type="email" class="f-input" id="l-email" placeholder="tvoj@email.com"></div>
        <div class="f-group"><label class="f-label">Lozinka:</label><input type="password" class="f-input" id="l-pass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()"></div>
        <button class="f-submit" onclick="doLogin()">PRIJAVI SE</button>
        <div class="f-alt" style="margin-top:10px;color:#333">Zaboravio/la lozinku? <a href="#">Resetuj ovde</a></div>
        <div class="f-alt">Nemaš nalog? <a onclick="navigate('register')">Registruj se</a></div>
      </div>
    </div>
  </div>`;
}

async function doLogin() {
  const email = document.getElementById('l-email')?.value.trim();
  const pass = document.getElementById('l-pass')?.value;
  const err = document.getElementById('login-err');
  if (!email || !pass) { showErr(err, 'Unesite email i lozinku.'); return; }
  try {
    await API.login(email, pass);
    updateNav();
    showToast('Dobrodošao/la! 👋', 'success');
    navigate('dashboard');
  } catch (e) { showErr(err, e.message); }
}

function renderRegister(app) {
  const years = [];
  for (let y = 2010; y >= 1940; y--) years.push(`<option value="${y}"${y===2000?' selected':''}>${y}</option>`);

  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-bg"></div><div class="auth-grid-bg"></div>
    <div class="auth-wrap">
      <div class="auth-tabs">
        <button class="auth-tab" onclick="navigate('login')">Prijava</button>
        <button class="auth-tab active" onclick="navigate('register')">Registracija</button>
      </div>
      <div class="auth-box">
        <h2>Registracija</h2>
        <div class="f-error" id="reg-err"></div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Ime:</label><input type="text" class="f-input" id="r-first" placeholder="Ime"></div>
          <div class="f-group"><label class="f-label">Prezime:</label><input type="text" class="f-input" id="r-last" placeholder="Prezime"></div>
        </div>
        <div class="f-group"><label class="f-label">Email adresa:</label><input type="email" class="f-input" id="r-email" placeholder="tvoj@email.com"></div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Lozinka:</label><input type="password" class="f-input" id="r-pass" placeholder="min. 6 karaktera"></div>
          <div class="f-group"><label class="f-label">Potvrdi lozinku:</label><input type="password" class="f-input" id="r-pass2" placeholder="••••••••"></div>
        </div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Godina rođenja:</label><select class="f-input f-select" id="r-year">${years.join('')}</select></div>
          <div class="f-group"><label class="f-label">Poštanski broj:</label><input type="text" class="f-input" id="r-postal" placeholder="11000"></div>
        </div>
        <div class="checks">
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c1"> <span class="f-check-label">Pristajem da se podaci o napretku koriste u statističke svrhe (anonimno).</span></label>
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c2"> <span class="f-check-label">Želim da primam informacije o novim kursevima. (opciono)</span></label>
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c3"> <span class="f-check-label">Prihvatam <a href="#">Politiku privatnosti</a> i <a href="#">Uslove korišćenja</a>. <strong>(obavezno)</strong></span></label>
        </div>
        <button class="f-submit" onclick="doRegister()">REGISTRUJ SE</button>
        <div class="f-alt">Već imaš nalog? <a onclick="navigate('login')">Prijavi se</a></div>
      </div>
    </div>
  </div>`;
}

async function doRegister() {
  const g = id => document.getElementById(id)?.value.trim();
  const err = document.getElementById('reg-err');
  const firstName = g('r-first'), lastName = g('r-last'), email = g('r-email');
  const password = g('r-pass'), pass2 = g('r-pass2');
  const birthYear = parseInt(g('r-year')), postalCode = g('r-postal');
  const agreed = document.getElementById('r-c3')?.checked;

  if (!firstName || !lastName || !email || !password) { showErr(err, 'Sva obavezna polja moraju biti popunjena.'); return; }
  if (password.length < 6) { showErr(err, 'Lozinka mora imati najmanje 6 karaktera.'); return; }
  if (password !== pass2) { showErr(err, 'Lozinke se ne podudaraju.'); return; }
  if (!agreed) { showErr(err, 'Morate prihvatiti Politiku privatnosti i Uslove korišćenja.'); return; }

  try {
    await API.register({ firstName, lastName, email, password, birthYear, postalCode });
    updateNav();
    showToast('Dobrodošao/la! Nalog je kreiran. 🎉', 'success');
    navigate('dashboard');
  } catch (e) { showErr(err, e.message); }
}

function showErr(el, msg) {
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

// ============================================================
// PRINT CSS (certificate)
// ============================================================
const printStyle = document.createElement('style');
printStyle.textContent = `
@media print {
  nav, .float-cta, .cert-actions, .modal-overlay { display: none !important; }
  body { background: white !important; color: black !important; }
  .cert-preview { border-color: #ccc !important; background: white !important; page-break-inside: avoid; }
  .cert-preview * { color: black !important; }
  .cert-name { color: #E30613 !important; }
}`;
document.head.appendChild(printStyle);

// ============================================================
// INIT
// ============================================================
updateNav();
navigate('home');
