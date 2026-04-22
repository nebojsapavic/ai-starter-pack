// ============================================================
// STATE
// ============================================================
let currentPage = null;
let userProgress = null;
let quizState = null;

// ============================================================
// ROUTER
// ============================================================
function navigate(page, params = {}) {
  currentPage = page;
  window.scrollTo(0, 0);
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  const floatCta = document.getElementById('float-cta');
  const isAuth = ['login', 'register'].includes(page);
  floatCta.style.display = isAuth ? 'none' : 'flex';

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

  setTimeout(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
      }, { threshold: 0.06 });
      obs.observe(el);
    });
  }, 50);
}

function handleCta() {
  const user = API.getUser();
  if (!user) navigate('register');
  else navigate('dashboard');
}

// ============================================================
// NAV
// ============================================================
function updateNav() {
  const user = API.getUser();
  document.querySelectorAll('.nav-auth-btn').forEach(b => b.style.display = user ? 'none' : 'inline-flex');
  const navUser = document.getElementById('nav-user');
  const dashLink = document.querySelector('.nav-auth-item');
  if (user) {
    navUser.style.display = 'flex';
    document.getElementById('nav-user-name').textContent = user.firstName;
    if (dashLink) dashLink.style.display = 'inline';
  } else {
    navUser.style.display = 'none';
    if (dashLink) dashLink.style.display = 'none';
  }
}

async function logout() {
  API.logout(); userProgress = null; updateNav(); navigate('home');
  showToast('Uspešno ste se odjavili.', 'success');
}

// ============================================================
// TOAST + MODAL
// ============================================================
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  t.textContent = msg; t.className = 'toast show ' + type;
  setTimeout(() => t.className = 'toast', 3000);
}
function openModal(html) { document.getElementById('modal-box').innerHTML = html; document.getElementById('modal-overlay').classList.add('open'); }
function closeModal() { document.getElementById('modal-overlay').classList.remove('open'); }
function closeModalOuter(e) { if (e.target === document.getElementById('modal-overlay')) closeModal(); }

// ============================================================
// HELPERS
// ============================================================
function logoSVG(h = 28) {
  return `<img src="/img/logo.svg" alt="AI Starter Pack" style="height:${h}px;width:auto;">`;
}
async function loadProgress() {
  if (!API.getToken()) return null;
  try { userProgress = await API.getProgress(); return userProgress; } catch { return null; }
}
function getModuleProgress(moduleId) {
  if (!userProgress) return { lessons: {}, quizPassed: false, completed: false, quizScore: null, quizAttempts: 0 };
  return userProgress.moduleProgress[moduleId] || { lessons: {}, quizPassed: false, completed: false, quizScore: null, quizAttempts: 0 };
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
      <div class="hero-bg-img" id="hero-bg"></div>
      <div class="hero-overlay"></div>
      <div class="hero-grid-lines"></div>
      <div class="hero-inner">
        <div class="hero-badge"><span class="hero-dot"></span>Besplatno &middot; Online &middot; Sertifikat</div>
        <h1 class="hero-h1">Veštačka inteligencija,<br><span>objašnjena jednostavno.</span></h1>
        <p class="hero-p">Besplatan online kurs kroz 7 praktičnih modula – nauči kako AI funkcioniše, gde ga koristiš svakodnevno i kako ti može pomoći da učiš, radiš i misliš pametnije.</p>
        <div class="hero-btns">
          <button class="btn btn-red btn-lg" onclick="navigate('register')">Počni besplatno →</button>
          <button class="btn btn-ghost btn-lg" onclick="navigate('about')">Saznaj više</button>
        </div>
        <div class="hero-trust">
          <div class="trust-item"><span class="trust-check">✓</span> Bez kreditne kartice</div>
          <div class="trust-item"><span class="trust-check">✓</span> 2 ECTS boda</div>
          <div class="trust-item"><span class="trust-check">✓</span> Digitalni sertifikat</div>
          <div class="trust-item"><span class="trust-check">✓</span> Dostupno na svim uređajima</div>
        </div>
        <div class="hero-stats-row">
          <div class="hero-stat"><div class="hs-val" data-count="7">7</div><div class="hs-label">Modula</div></div>
          <div class="hero-stat-div"></div>
          <div class="hero-stat"><div class="hs-val" data-count="21">21</div><div class="hs-label">Lekcija</div></div>
          <div class="hero-stat-div"></div>
          <div class="hero-stat"><div class="hs-val" data-count="35">35</div><div class="hs-label">Pitanja</div></div>
          <div class="hero-stat-div"></div>
          <div class="hero-stat"><div class="hs-val">100%</div><div class="hs-label">Besplatno</div></div>
        </div>
      </div>
      <div class="scroll-hint">
        <span>Skroluj</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <section class="modules-preview">
      <div class="container">
        <div class="modules-preview-inner">
          <div class="modules-img-panel reveal-left">
            <img src="/img/modules-img.png" alt="AI Neuronska mreža">
            <div class="modules-img-caption">Neuronske mreže i AI koncepti koje ćeš savladati</div>
          </div>
          <div class="reveal-right">
            <div class="section-label">Sadržaj kursa</div>
            <h2 class="section-title">Šta te čeka u 7 modula?</h2>
            <p class="section-sub">Kroz zanimljive primere, praktične vežbe i realne AI alate, učićeš sve što ti je potrebno da budeš na TI sa veštačkom inteligencijom.</p>
            <div class="modules-list">
              ${[
                ['🟣','01','Šta je veštačka inteligencija?','Nauči osnovne pojmove, razliku između AI i ML'],
                ['🔵','02','Kako AI rešava probleme?','Logika, algoritmi i strategije odlučivanja'],
                ['🟢','03','Uvod u mašinsko učenje','Klasifikacija, predikcija i obrasci'],
                ['🔴','04','Neuronske mreže','Digitalni mozak i prepoznavanje obrazaca'],
                ['🧩','05','AI u učenju i poslu','Produktivnost, alati i organizacija'],
                ['⚖️','06','Odgovorno korišćenje AI','Etika, privatnost i bezbednost'],
                ['🌐','07','AI i društvo','Uticaji, izazovi i budućnost do 2030'],
              ].map(([em,n,t,d]) => `
                <div class="module-row" onclick="openModuleModal(${parseInt(n)})">
                  <div class="mr-num">${n}</div>
                  <div class="mr-emoji">${em}</div>
                  <div class="mr-content"><div class="mr-title">${t}</div><div class="mr-desc">${d}</div></div>
                  <button class="mr-btn">Više</button>
                </div>`).join('')}
            </div>
            <div class="modules-cta">
              <button class="btn btn-red btn-lg" onclick="navigate('register')">Počni kurs besplatno</button>
              <button class="btn btn-outline" onclick="navigate('modules')">Svi moduli</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="container">
        <div class="reveal" style="text-align:center">
          <div class="section-label" style="justify-content:center">Zašto ovaj kurs</div>
          <h2 class="section-title" style="max-width:600px;margin:0 auto 16px">Dizajniran za sve,<br>ne samo za tehničare.</h2>
        </div>
        <div class="features-grid">
          ${[
            ['🎓','Bez predznanja','Za učenike, nastavnike, roditelje i profesionalce. Nema kodiranja ni matematike.',0],
            ['⚡','Odmah primenjivo','Praktični zadaci i AI alati koje možeš koristiti već danas u poslu i učenju.',0.1],
            ['🏆','Sertifikat + ECTS','Digitalni sertifikat sa 2 ECTS boda i 100€ popust za ITS ili ITHS.',0.2],
            ['📱','Uvek dostupno','Radi na svim uređajima. Učiš kada i koliko ti odgovara, bez roka.',0.1],
            ['🆓','Potpuno besplatno','Bez skrivenih troškova. Registruj se i počni odmah.',0.2],
            ['🤖','Aktuelni sadržaj','ChatGPT, neuronske mreže, etika AI – sve što se dešava danas.',0.3],
          ].map(([icon,title,desc,delay]) => `
            <div class="feature-card reveal" style="--delay:${delay}s">
              <div class="feature-icon">${icon}</div>
              <div class="feature-title">${title}</div>
              <div class="feature-desc">${desc}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="why-section">
      <div class="why-bg"></div>
      <div class="why-bg-grad"></div>
      <div class="container">
        <div class="why-grid">
          <div class="why-text reveal-left">
            <div class="section-label">Zašto sada</div>
            <h2 class="section-title">AI menja svet<br>koji živiš.</h2>
            <p class="section-sub">Oni koji razumeju AI imaće prednost u obrazovanju, poslu i životu. Ovaj kurs ti daje taj temelj – besplatno.</p>
            <div class="why-points">
              <div class="why-point"><div class="wp-icon">📘</div><div class="wp-text"><strong>Uvod kroz 7 modula</strong>Od osnovnih pojmova do svakodnevne primene</div></div>
              <div class="why-point"><div class="wp-icon">🛠️</div><div class="wp-text"><strong>Praktičan odmah</strong>Zadaci i alati koje koristiš već sutra</div></div>
              <div class="why-point"><div class="wp-icon">🎯</div><div class="wp-text"><strong>Tvoj tempo</strong>Učiš kad ti odgovara, bez roka ili pritiska</div></div>
              <div class="why-point"><div class="wp-icon">🎓</div><div class="wp-text"><strong>Sertifikat + ECTS</strong>2 boda i 100€ popust za ITS/ITHS</div></div>
            </div>
            <div style="margin-top:36px">
              <button class="btn btn-red btn-lg" onclick="navigate('register')">Registruj se besplatno</button>
            </div>
          </div>
          <div class="why-img-col reveal-right">
            <div class="why-img-wrap">
              <img src="/img/learning-img.png" alt="Učenje AI">
            </div>
            <div class="why-img-badge">
              <div class="wib-val">100%</div>
              <div class="wib-label">Besplatno</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cert-section">
      <div class="cert-img-bg"></div>
      <div class="container">
        <div class="cert-inner">
          <div class="cert-left reveal-left">
            <div class="section-label">Po završetku kursa</div>
            <h2 class="section-title">Digitalni sertifikat<br>+ 2 ECTS boda</h2>
            <p class="section-sub">Personalizovani digitalni sertifikat koji možeš podeliti na LinkedIn-u ili priložiti uz CV. Sertifikat nosi 2 ECTS boda i 100€ popust za ITS ili ITHS.</p>
            <div class="cb-badges">
              <div class="cb-badge">2 ECTS boda</div>
              <div class="cb-badge">100€ popust</div>
              <div class="cb-badge">LinkedIn ready</div>
            </div>
          </div>
          <div class="reveal-right">
            <div class="cert-mockup">
              <div class="cm-logo">${logoSVG(24)}</div>
              <div class="cm-label">Sertifikat o završetku</div>
              <div class="cm-title">AI Starter Pack</div>
              <div class="cm-sub">Dodeljuje se</div>
              <div class="cm-name">Tvoje Ime</div>
              <div class="cm-footer"><span>2 ECTS</span><span>·</span><span>ITS · ITHS · AI Srbije</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="partners-section">
      <div class="container">
        <div class="reveal" style="text-align:center">
          <div class="section-label" style="justify-content:center">Realizatori kursa</div>
          <h2 class="section-title">Ko stoji iza AI Starter Packa?</h2>
        </div>
        <div class="partners-row">
          <div class="partner-card reveal" style="--delay:0s">
            <div class="pc-logo">ITS</div>
            <div class="pc-name">Visoka škola strukovnih studija za informacione tehnologije</div>
            <div class="pc-url">www.its.edu.rs</div>
            <div class="pc-desc">Savremena visokoobrazovna ustanova, lider u IT obrazovanju u Srbiji.</div>
          </div>
          <div class="partner-card reveal" style="--delay:0.1s">
            <div class="pc-logo">ITHS</div>
            <div class="pc-name">Srednja škola za informacione tehnologije</div>
            <div class="pc-url">www.iths.edu.rs</div>
            <div class="pc-desc">Jedna od najmodernijih IT škola u Srbiji – softverski inženjering, sajber bezbednost.</div>
          </div>
          <div class="partner-card reveal" style="--delay:0.2s">
            <div class="pc-logo">AI</div>
            <div class="pc-name">Savez za veštačku inteligenciju Srbije</div>
            <div class="pc-url">ai.org.rs</div>
            <div class="pc-desc">Nacionalna platforma koja promoviše etički i odgovoran razvoj AI u Srbiji.</div>
          </div>
        </div>
      </div>
    </section>

    <section class="slogan-section">
      <div class="slogan-bg"></div>
      <div class="slogan-glow"></div>
      <div class="container">
        <div class="slogan-inner reveal-scale">
          <div class="slogan-quote">"Oni koji znaju AI biće <em>šefovi</em><br>onima koji ne znaju."</div>
          <p class="slogan-sub">Upoznaj moć veštačke inteligencije i pozicioniraj se za budućnost.<br>Potpuno besplatno, za svakoga.</p>
          <button class="btn btn-red btn-lg" onclick="navigate('register')" style="font-size:16px;padding:16px 40px">Registruj se odmah →</button>
        </div>
      </div>
    </section>

  </div>`;

  // Animate hero background
  setTimeout(() => {
    const bg = document.getElementById('hero-bg');
    if (bg) bg.classList.add('loaded');
  }, 100);

  // Animate counters
  setTimeout(() => {
    document.querySelectorAll('[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      let current = 0;
      const timer = setInterval(() => {
        current += Math.ceil(target / 20);
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current;
      }, 40);
    });
  }, 600);

  // Nav scroll effect
  const handleScroll = () => {
    document.querySelector('nav')?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
}
function renderAbout(app) {
  app.innerHTML = `
  <div class="page">
    <section class="page-hero page-hero-img" style="background-image:url('/img/about-img.png')">
      <div class="page-hero-overlay"></div>
      <div class="container" style="position:relative;z-index:2">
        <div class="section-label" style="color:rgba(255,255,255,.7)">O kursu</div>
        <h1 class="page-h1" style="color:#fff">AI Starter Pack</h1>
        <p class="page-sub" style="color:rgba(255,255,255,.75)">Veštačka inteligencija više nije daleka budućnost – ona je tu, u tvom telefonu, pretraživaču, aplikacijama i poslu. Kurs je osmišljen da ti pomogne da razumeš kako AI funkcioniše – bez potrebe za prethodnim znanjem iz programiranja ili matematike.</p>
      </div>
    </section>

    <section class="about-grid-sec">
      <div class="container">
        <div class="ag-grid">
          <div class="ag-card reveal">
            <div class="ag-icon">🎯</div>
            <h3>Cilj kursa</h3>
            <p>Steći osnovno razumevanje veštačke inteligencije, praktične veštine korišćenja popularnih AI alata i kritički pogled na etiku, odgovornost i budućnost AI-ja.</p>
          </div>
          <div class="ag-card reveal">
            <div class="ag-icon">📚</div>
            <h3>Šta ćeš naučiti</h3>
            <ul>
              <li>Osnove AI i mašinskog učenja</li>
              <li>Kako AI donosi odluke i rešava probleme</li>
              <li>Šta su neuronske mreže i kako rade</li>
              <li>Kako da koristiš AI u učenju i poslu</li>
              <li>Kako da koristiš AI odgovorno i bezbedno</li>
              <li>Izazovi i budući uticaji AI na društvo</li>
            </ul>
          </div>
          <div class="ag-card reveal">
            <div class="ag-icon">👩‍💻</div>
            <h3>Kako funkcioniše</h3>
            <ul>
              <li>Online, samostalno, kad god želiš</li>
              <li>Pristup s telefona, tableta ili računara</li>
              <li>Nema ograničenog trajanja</li>
              <li>Lekcije, praktični zadaci i kvizovi</li>
              <li>Završni test: min. 40% za sertifikat</li>
              <li>Potpuno besplatan za sve</li>
            </ul>
          </div>
          <div class="ag-card reveal">
            <div class="ag-icon">🧑‍🏫</div>
            <h3>Za koga je kurs</h3>
            <ul>
              <li>Učenici i studenti</li>
              <li>Nastavnici i profesori</li>
              <li>Roditelji</li>
              <li>Zaposleni i nezaposleni</li>
              <li>Radoznali pojedinci koji žele da razumeju svet koji se menja</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-section">
      <div class="container">
        <div class="mission-inner reveal">
          <div class="section-label">Naša misija</div>
          <h2 class="section-title">Zašto ovo radimo?</h2>
          <p class="mission-text">Zato što verujemo da znanje ne treba da ima barijere. Veštačka inteligencija već sada oblikuje svet u kojem živimo: kako učimo, kako radimo, kako komuniciramo, kako se lečimo, pa čak i kako stvaramo umetnost. Ali mnogi još uvek ne znaju šta je AI, kako funkcioniše i kako se koristi – odgovorno i pametno.</p>
          <div class="mission-points">
            <div class="mp-item">Da objasnimo veštačku inteligenciju jednostavno i svima razumljivo</div>
            <div class="mp-item">Da pomognemo ljudima da sebe osnaže znanjem i ostanu relevantni u svetu koji se menja</div>
            <div class="mp-item">Da inspirišemo mlade da istražuju, nastavnike da integrišu AI u nastavu, a sve nas da razmišljamo kritički</div>
          </div>
          <p class="mission-footer">Potrebna je samo radoznalost i želja da učiš. Mi brinemo da sve ostalo bude jasno, zanimljivo i besplatno.</p>
          <button class="btn btn-red btn-lg" onclick="navigate('register')">Prijavi se danas</button>
        </div>
      </div>
    </section>

    <section class="partners-section reveal">
      <div class="container">
        <div class="section-label">Realizatori</div>
        <h2 class="section-title">Ko stoji iza kursa?</h2>
        <div class="partners-row">
          <div class="partner-card">
            <div class="pc-logo">ITS</div>
            <div class="pc-name">Visoka škola strukovnih studija za informacione tehnologije</div>
            <div class="pc-url">www.its.edu.rs</div>
            <div class="pc-desc">Savremena visokoobrazovna ustanova koja se više od jedne decenije pozicionira kao lider u obrazovanju stručnjaka iz oblasti IT. Akreditovana od strane Nacionalnog akreditacionog tela.</div>
          </div>
          <div class="partner-card">
            <div class="pc-logo">ITHS</div>
            <div class="pc-name">Srednja škola za informacione tehnologije</div>
            <div class="pc-url">www.iths.edu.rs</div>
            <div class="pc-desc">Jedna od najmodernijih IT škola u Srbiji. Smerovi: softverski inženjering, multimedija i dizajn, sajber bezbednost, administracija mreža.</div>
          </div>
          <div class="partner-card">
            <div class="pc-logo">AI</div>
            <div class="pc-name">Savez za veštačku inteligenciju Srbije</div>
            <div class="pc-url">ai.org.rs</div>
            <div class="pc-desc">Nacionalna platforma koja ocuplja aktere iz akademske zajednice, IT sektora i privrede u cilju promocije etičkog razvoja AI u Srbiji.</div>
          </div>
        </div>
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
    let statusLabel = 'Nije početo';
    if (isCompleted) statusLabel = '✓ Završeno';
    else if (done > 0) statusLabel = done + '/' + total + ' lekcija';

    return `
    <div class="mod-card${isCompleted ? ' completed' : ''}" onclick="openModuleModal(${m.id})">
      <div class="mod-top">
        <div class="mod-num">${m.id.toString().padStart(2,'0')}</div>
        <div class="mod-status">${statusLabel}</div>
      </div>
      <div class="mod-emoji">${m.emoji}</div>
      <div class="mod-title">${m.title}</div>
      <div class="mod-desc">${m.desc.substring(0,90)}…</div>
      <div class="mod-progress"><div class="mod-progress-bar" style="width:${pct}%"></div></div>
      <button class="mod-btn">${isCompleted ? 'Ponovi modul' : done > 0 ? 'Nastavi →' : 'Saznaj više →'}</button>
    </div>`;
  }).join('');

  app.innerHTML = `
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Kurs</div>
        <h1 class="page-h1">7 modula, 21 lekcija,<br>sve što treba da znaš o AI.</h1>
        <p class="page-sub">Kroz zanimljive primere, praktične vežbe i realne AI alate, učićeš sve što ti je potrebno da budeš na TI sa veštačkom inteligencijom.</p>
        ${user && userProgress ? `<div class="progress-overview">Završeni moduli: <strong>${userProgress.completedModules}/${userProgress.totalModules}</strong>${userProgress.certificateEarned ? ' &nbsp;·&nbsp; <span style="color:#16a34a">🎓 Sertifikat dostupan!</span>' : ''}</div>` : ''}
      </div>
    </section>
    <div class="container">
      <div class="modules-grid">${cards}</div>
    </div>
    <div class="div-h"></div>
  </div>`;
}

function openModuleModal(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  const mp = getModuleProgress(moduleId);
  const user = API.getUser();
  const lessonsHtml = m.lessons.map((l, i) => {
    const done = mp.lessons[l.id]?.completed;
    return `
    <div class="lesson-row${done ? ' done' : ''}" onclick="closeModal();navigate('lesson',{moduleId:${moduleId},lessonId:${l.id}})">
      <div class="lr-num">${done ? '✓' : 'L' + (i+1)}</div>
      <div>
        <div class="lr-title">${l.title}</div>
        <div class="lr-status">${done ? 'Završeno' : 'Nije početo'}</div>
      </div>
    </div>`;
  }).join('');

  const allLessonsDone = m.lessons.every(l => mp.lessons[l.id]?.completed);
  const actionBtns = user ? `
    <button class="btn btn-outline btn-wide" style="margin-top:12px" onclick="closeModal();navigate('lesson',{moduleId:${moduleId},lessonId:1})">${mp.lessons[1]?.completed ? 'Nastavi lekcije' : 'Počni modul'}</button>
    ${allLessonsDone ? `<button class="btn btn-red btn-wide" style="margin-top:10px" onclick="closeModal();navigate('quiz',{moduleId:${moduleId}})">${mp.quizPassed ? '🔄 Ponovi kviz' : '📝 Uradi kviz'}</button>` : `<div style="margin-top:12px;font-size:13px;color:var(--text4);text-align:center">Završi sve lekcije da otključaš kviz.</div>`}
  ` : `<button class="btn btn-red btn-wide" style="margin-top:16px" onclick="closeModal();navigate('register')">Registruj se da počneš</button>`;

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
      <div class="modal-lessons"><h4>Lekcije</h4>${lessonsHtml}</div>
      ${m.lessons[0]?.task ? `<div class="modal-task"><div class="modal-task-label">✅ Zadatak</div><p>${m.lessons[0].task}</p></div>` : ''}
      ${actionBtns}
    </div>`);
}

// ============================================================
// LESSON VIEWER
// ============================================================
async function renderLesson(app, { moduleId, lessonId }) {
  const m = MODULES.find(x => x.id === moduleId);
  const lesson = m.lessons.find(l => l.id === lessonId);
  const user = API.getUser();
  if (user) { API.completeLesson(moduleId, lessonId).then(() => loadProgress()).catch(() => {}); }

  const dotsHtml = m.lessons.map(l => {
    const isDone = l.id < lessonId;
    const isActive = l.id === lessonId;
    return `<div class="l-dot${isDone ? ' done' : isActive ? ' active' : ''}" onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${l.id}})" title="Lekcija ${l.id}"></div>`;
  }).join('');

  const sectionsHtml = lesson.sections.map(s => `
    <div class="lesson-section">
      <h4>${s.heading}</h4>
      ${s.content.split('\n').map(line => {
        if (line.startsWith('•')) return `<p style="padding-left:18px;position:relative"><span style="position:absolute;left:0;color:var(--red);font-weight:700">›</span> ${line.substring(1).trim()}</p>`;
        if (line.trim() === '') return '';
        return `<p>${line}</p>`;
      }).join('')}
    </div>`).join('');

  const termsHtml = lesson.keyTerms ? `
    <div class="lesson-section"><h4>Ključni pojmovi</h4>
      <div class="key-term">${lesson.keyTerms.map(kt => `<div class="kt-item"><div class="kt-term">${kt.term}</div><div class="kt-def">${kt.def}</div></div>`).join('')}</div>
    </div>` : '';

  const taskHtml = lesson.task ? `<div class="task-box"><div class="task-label">✅ Mini zadatak</div><p>${lesson.task}</p></div>` : '';
  const prevLesson = m.lessons.find(l => l.id === lessonId - 1);
  const nextLesson = m.lessons.find(l => l.id === lessonId + 1);

  app.innerHTML = `
  <div class="page lesson-page">
    <div class="lesson-header">
      <div class="lesson-header-left">
        <div class="back-link" onclick="navigate('modules')">← ${m.emoji} Modul ${m.id.toString().padStart(2,'0')}</div>
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
      <div class="lesson-nav">
        ${prevLesson ? `<button class="btn btn-outline" onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${prevLesson.id}})">← Prethodna</button>` : `<button class="btn btn-outline" onclick="navigate('modules')">← Svi moduli</button>`}
        <span style="font-size:13px;color:var(--text4)">${lessonId} / ${m.lessons.length}</span>
        ${nextLesson ? `<button class="btn btn-red" onclick="navigate('lesson',{moduleId:${moduleId},lessonId:${nextLesson.id}})">Sledeća →</button>` : user ? `<button class="btn btn-red" onclick="navigate('quiz',{moduleId:${moduleId}})">📝 Idi na kviz →</button>` : `<button class="btn btn-red" onclick="navigate('modules')">Svi moduli →</button>`}
      </div>
    </div>
  </div>`;
}

// ============================================================
// QUIZ
// ============================================================
const QUIZ_QUESTIONS = {
  1:[
    {q:'Koja od sledećih tehnologija koristi veštačku inteligenciju?',opts:['Digitalni sat','Kalkulator','Prepoznavanje glasa u telefonu','Rerna sa tajmerom'],correct:2,exp:'Prepoznavanje glasa koristi AI da razume ljudski govor – to je tipičan primer AI sistema.'},
    {q:'Šta je osnovna karakteristika veštačke inteligencije?',opts:['Može da koristi bateriju duže','Može da obavlja zadatke koji zahtevaju ljudsku inteligenciju','Ima metalno telo i pištolj','Radi samo kad ima internet'],correct:1,exp:'AI se koristi za obavljanje zadataka koje bi inače zahtevale ljudsku sposobnost razumevanja i odlučivanja.'},
    {q:'Kako se zove skup uputstava koje AI koristi da reši problem?',opts:['Generator','Algoritam','Automat','Motor'],correct:1,exp:'Algoritam je niz precizno definisanih koraka koje mašina koristi za rešavanje problema.'},
    {q:'Koji od primera je uska (slaba) veštačka inteligencija?',opts:['Robot koji razume sve oblasti','AI koji predlaže pesmu na Spotify-u','Ljubimac robot koji sanja','Šrafciger sa senzorom'],correct:1,exp:'Uska AI je specijalizovana za jedan zadatak. Preporuka pesama je klasičan primer uske AI.'},
    {q:'Šta AI koristi da nauči da prepoznaje obrasce?',opts:['Emocije','Podatke i primere','Magnete','Kompas'],correct:1,exp:'AI sistem uči iz velikog broja primera (podataka), ne iz emocija ili fizičkih alata.'},
  ],
  2:[
    {q:'Kako AI vidi "problem" koji treba da reši?',opts:['Kao emociju','Kao slučajan niz podataka','Kao niz stanja, pravila i ciljeva','Kao listu reči'],correct:2,exp:'Za AI, svaki problem je formalizovan kao početno stanje, ciljno stanje, dozvoljene akcije i pravila.'},
    {q:'Koja je uloga algoritma pretrage?',opts:['Da unapred zna rešenje','Da pretvori problem u sliku','Da pretraži puteve od početka do cilja','Da pošalje podatke'],correct:2,exp:'Algoritam pretrage omogućava AI da istraži sve potencijalne pravce i pronađe optimalan put.'},
    {q:'Zašto AI koristi funkciju cilja?',opts:['Da izrazi mišljenje','Nasumični odgovori','Poredi korisnike','Zna kada je problem rešen'],correct:3,exp:'Funkcija cilja pomaže AI da prepozna kada je dostigla željeni ishod.'},
    {q:'Koji primer prikazuje AI optimizaciju?',opts:['Prepoznaje lice','Bira najkraći put za dostavu','Prevodi tekst','Sortira slike'],correct:1,exp:'Optimizacija znači tražiti "najboljе" rešenje, poput najkraćeg puta.'},
    {q:'Kako AI zna koje akcije su dozvoljene?',opts:['Emocije','Unapred definisana pravila','Svesno rasuđivanje','Pogađanje'],correct:1,exp:'AI koristi eksplicitno zadate uslove i pravila okruženja.'},
  ],
  3:[
    {q:'Tačna tvrdnja o AI, ML i dubokom učenju?',opts:['AI je podskup ML','ML je deo AI, a DL je deo ML','Potpuno nepovezani','DL i ML su isto'],correct:1,exp:'AI je najširi pojam, ML je metoda unutar AI, a DL je posebna vrsta ML zasnovana na neuronskim mrežama.'},
    {q:'Koji primer prikazuje AI bez ML?',opts:['Šahovski program po unapred zadatim pravilima','Email filter koji uči','TikTok algoritam','Prevodilac sa podacima'],correct:0,exp:'Ako program ne uči iz primera već sledi unapred zadate instrukcije, to je AI bez mašinskog učenja.'},
    {q:'Koji scenario koristi mašinsko učenje?',opts:['Kalkulator','YouTube preporuke','Semafor na 60s','Štampač'],correct:1,exp:'YouTube koristi podatke o ponašanju korisnika za preporuke – klasičan ML.'},
    {q:'Zašto DL nosi naziv "duboko"?',opts:['Puno memorije','Za dubinske analize','Ima više slojeva u neuronskoj mreži','Zahteva dubinsko znanje'],correct:2,exp:'Naziv dolazi od višeslojnih neuronskih mreža koje obrađuju podatke na rastućim nivoima apstrakcije.'},
    {q:'Koji zadatak koristi duboko učenje?',opts:['Sabiranje','Pretraga reči','Sortiranje','Prepoznavanje lica'],correct:3,exp:'Prepoznavanje lica zahteva analizu kompleksnih vizuelnih obrazaca – to je domen DL.'},
  ],
  4:[
    {q:'Šta je neuronska mreža?',opts:['Mreža interneta','Softverski model inspirisan radom mozga','Skup pravila za igrice','Program za tekst'],correct:1,exp:'Neuronska mreža imitira strukturu i funkcionisanje neurona u ljudskom mozgu.'},
    {q:'Šta je "duboko" u dubokom učenju?',opts:['Duboka memorija','Višeslojne neuronske mreže','Složeni algoritmi','Duboki podaci'],correct:1,exp:'Naziv dolazi od više slojeva neurona koji uče sve složenije karakteristike.'},
    {q:'Koja tehnika uči iz grešaka?',opts:['Feedforward','Backpropagation','Klasifikacija','Klasterizacija'],correct:1,exp:'Backpropagation koriguje težine mreže na osnovu napravljenih grešaka.'},
    {q:'Primena DL za slike?',opts:['Tekstualni editori','Face unlock i medicinska dijagnostika','Kalkulator','Tabele'],correct:1,exp:'Face unlock i medicinska dijagnostika koriste DL za analizu vizuelnih podataka.'},
    {q:'Zašto DL treba više resursa?',opts:['Stariji algoritmi','Više podataka i jači računari','Radi sporije','Zahteva internet'],correct:1,exp:'DL mreže zahtevaju ogromne količine podataka i snažne GPU za obuku.'},
  ],
  5:[
    {q:'AI alat za personalizovano učenje?',opts:['Microsoft Word','Duolingo i Khan Academy','Photoshop','YouTube'],correct:1,exp:'Duolingo i Khan Academy koriste AI da prilagode lekcije napretku korisnika.'},
    {q:'Kako AI pomaže u pisanju?',opts:['Potpuno zamenjuje čoveka','Predlaže ideje i koriguje gramatiku','Samo kopira','Ne može da pomogne'],correct:1,exp:'AI predlaže nastavke i koriguje greške, ali odluke ostaju tvoje.'},
    {q:'Ograničenje AI asistenta?',opts:['Previše pametan','Nema internet','Nema emocije ni lični kontekst','Samo engleski'],correct:2,exp:'AI ne razume tvoj lični kontekst – ti donosiš konačnu odluku.'},
    {q:'Razlika AI i običnog kalendara?',opts:['AI je skuplji','AI prilagođava planove u realnom vremenu','Obični je pametniji','AI samo za firme'],correct:1,exp:'AI razume promene i nudi rešenja kada se planovi poremete.'},
    {q:'Zašto AI ne zamenjuje tvoju odgovornost?',opts:['Ne zna da razmišlja','Alat je – ti odlučuješ, on pomaže','Nije efikasan','Samo za programere'],correct:1,exp:'AI olakšava donošenje odluka, ali ti si taj koji vodi.'},
  ],
  6:[
    {q:'Kako nastaje pristrasnost u AI?',opts:['Programiran da bude nepravedan','Favorizuje moćne','Uči iz pristrasnih istorijskih podataka','Preopterećenje sistema'],correct:2,exp:'AI ne razume pravednost – prenosi obrasce iz podataka koje dobija.'},
    {q:'Zašto je privatnost važna uz AI?',opts:['AI ne može bez podataka','Korisnici unose osetljive info koje se mogu koristiti','Dizajn softvera','Zakon ne dozvoljava'],correct:1,exp:'Lične informacije mogu biti pohranjene i analizirane bez znanja korisnika.'},
    {q:'Opasnost AI koji generiše slike/glas?',opts:['Usporava uređaje','Deepfake i lažni sadržaj','Koristi RAM','Ne razume nijanse'],correct:1,exp:'AI može biti zloupotrebljavan za lažno predstavljanje i manipulaciju.'},
    {q:'Ko snosi odgovornost kada AI pogreši?',opts:['Samo programer','Samo korisnik','Samo vlada','Programeri, kompanije i korisnici zajedno'],correct:3,exp:'Odgovornost u AI svetu je kolektivna – svi akteri je dele.'},
    {q:'Najtačnija tvrdnja o AI pristrasnosti?',opts:['AI je nepristrasan','AI može biti pristrasan jer uči iz ljudskih grešaka','AI zna šta je etički','Niko nije odgovoran'],correct:1,exp:'AI nema vrednosni sistem – uči iz podataka koje mu dajemo.'},
  ],
  7:[
    {q:'Najvažnije veštine uz AI?',opts:['Samo IT veštine','Kritičko mišljenje, kreativnost, komunikacija','Fizičke veštine','Strani jezici'],correct:1,exp:'Veštine koje AI teško imitira postaju najvrednije.'},
    {q:'Kako AI menja obrazovanje?',opts:['Ukida nastavnike','Personalizuje učenje i pomaže nastavnicima','Nema uticaja','Pogoršava nastavu'],correct:1,exp:'AI personalizuje učenje i pruža trenutnu povratnu informaciju.'},
    {q:'Šta je AGI?',opts:['Naziv za ChatGPT','AI koji rešava bilo koji intelektualni zadatak kao čovek','Robot sa mišićima','Baza podataka'],correct:1,exp:'AGI bi bio AI sposoban za bilo koji intelektualni zadatak – za razliku od danas uske AI.'},
    {q:'Zašto je važna regulacija AI?',opts:['Da uspori razvoj','Da obezbedi sigurnost i spreči zloupotrebe','Da zaštiti patente','Da poveća cenu'],correct:1,exp:'Bez regulacije AI može biti zloupotrebljavan na globalnom nivou.'},
    {q:'Najvažnija poruka kursa?',opts:['AI je opasan','AI uz znanje i odgovornost može osnažiti svakog čoveka','Samo stručnjaci koriste AI','AI zamenjuje sve ljude'],correct:1,exp:'AI Starter Pack postoji da pokaže da je AI dostupan svima – znanje i odgovornost čine razliku.'},
  ],
};

async function renderQuiz(app, { moduleId }) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }
  await loadProgress();
  const mp = getModuleProgress(moduleId);
  const allLessonsDone = MODULES.find(m => m.id === moduleId).lessons.every(l => mp.lessons[l.id]?.completed);
  if (!allLessonsDone) { showToast('Završi sve lekcije pre kviza.', 'error'); navigate('modules'); return; }
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
  const letters = ['A','B','C','D'];
  const dotsHtml = questions.map((_,i) => `<div class="qp-dot${answers[i] !== null ? ' answered' : ''}"></div>`).join('');
  const optsHtml = q.opts.map((opt, i) => {
    let cls = '';
    if (answered) { if (i === q.correct) cls = ' correct'; else if (i === answers[currentQ]) cls = ' wrong'; }
    else if (i === answers[currentQ]) cls = ' selected';
    return `<button class="option${cls}" ${answered ? 'disabled' : ''} onclick="selectAnswer(${i})"><span class="opt-letter">${letters[i]}</span> ${opt}</button>`;
  }).join('');
  const isLast = currentQ === questions.length - 1;
  const allAnswered = answers.every(a => a !== null);

  app.innerHTML = `
  <div class="page quiz-page">
    <div class="quiz-wrap">
      <div class="quiz-header">
        <div class="back-link" style="cursor:pointer;color:var(--red);font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin-bottom:12px" onclick="navigate('modules')">← ${m.emoji} Modul ${moduleId.toString().padStart(2,'0')}</div>
        <h2>Provjeri znanje</h2>
        <p>Pitanje ${currentQ + 1} od ${questions.length} · Potrebno 40% za prolaz</p>
      </div>
      <div class="quiz-progress">${dotsHtml}</div>
      <div class="question-card">
        <div class="question-num">Pitanje ${currentQ + 1}</div>
        <div class="question-text">${q.q}</div>
        <div class="options">${optsHtml}</div>
        <div class="explanation${answered ? ' show' : ''}">📌 ${q.exp}</div>
      </div>
      <div class="quiz-actions">
        ${currentQ > 0 ? `<button class="btn btn-outline" onclick="quizPrev()">← Prethodno</button>` : `<button class="btn btn-outline" onclick="navigate('modules')">← Odustani</button>`}
        <div style="display:flex;gap:10px">
          ${!isLast && answered ? `<button class="btn btn-red" onclick="quizNext()">Sledeće →</button>` : ''}
          ${isLast && allAnswered ? `<button class="btn btn-red" onclick="submitQuiz()">📊 Rezultati</button>` : ''}
        </div>
      </div>
    </div>
  </div>`;
}

function selectAnswer(i) { if (quizState.answers[quizState.currentQ] !== null) return; quizState.answers[quizState.currentQ] = i; renderQuizQuestion(document.getElementById('app')); }
function quizNext() { if (quizState.currentQ < quizState.questions.length - 1) { quizState.currentQ++; renderQuizQuestion(document.getElementById('app')); } }
function quizPrev() { if (quizState.currentQ > 0) { quizState.currentQ--; renderQuizQuestion(document.getElementById('app')); } }
async function submitQuiz() {
  const { moduleId, answers } = quizState;
  try {
    const payload = answers.map((a, i) => ({ questionId: i, answer: a }));
    const result = await API.submitQuiz(moduleId, payload);
    await loadProgress();
    navigate('quiz-results', { moduleId, result });
  } catch (e) { showToast(e.message, 'error'); }
}

function renderQuizResults(app, { moduleId, result }) {
  const m = MODULES.find(x => x.id === moduleId);
  const pct = Math.round(result.score * 100);
  const detailsHtml = result.results.map((r, i) => {
    const q = QUIZ_QUESTIONS[moduleId][i];
    const letters = ['A','B','C','D'];
    return `<div style="padding:16px 0;border-bottom:1px solid var(--border)">
      <div style="font-size:14px;font-weight:600;margin-bottom:8px;color:var(--text)">${i+1}. ${q.q}</div>
      <div style="font-size:13px;margin-bottom:4px;color:${r.correct ? '#16a34a' : 'var(--red)'}">${r.correct ? '✓' : '✗'} Tvoj odgovor: ${letters[r.userAnswer]} – ${q.opts[r.userAnswer]}</div>
      ${!r.correct ? `<div style="font-size:13px;color:#16a34a">✓ Tačan: ${letters[r.correctAnswer]} – ${q.opts[r.correctAnswer]}</div>` : ''}
      <div style="font-size:12px;color:var(--text4);margin-top:6px;padding:8px 12px;background:var(--bg2);border-radius:8px">${r.explanation}</div>
    </div>`;
  }).join('');

  app.innerHTML = `
  <div class="page">
    <div class="results-wrap">
      <div class="results-icon">${result.passed ? '🎉' : '📚'}</div>
      <div class="results-score ${result.passed ? 'pass' : 'fail'}">${pct}%</div>
      <div class="results-label">${result.correct} od ${result.total} tačnih odgovora</div>
      <div class="results-msg">
        ${result.passed ? `<strong style="color:#16a34a">Čestitamo! Prošli ste kviz za Modul ${moduleId}.</strong><br>Možeš nastaviti na sledeći modul.` : `<strong style="color:var(--red)">Nisi prošao/la ovaj put.</strong><br>Potrebno je min. 40% tačnih. Ponovi lekcije i pokušaj ponovo.`}
      </div>
      <div class="results-btns">
        ${result.passed && moduleId < 7 ? `<button class="btn btn-red" onclick="navigate('lesson',{moduleId:${moduleId+1},lessonId:1})">Sledeći modul →</button>` : ''}
        ${result.passed && moduleId === 7 ? `<button class="btn btn-green" onclick="navigate('certificate')">🎓 Preuzmi sertifikat</button>` : ''}
        <button class="btn btn-outline" onclick="navigate('quiz',{moduleId:${moduleId}})">🔄 Ponovi kviz</button>
        <button class="btn btn-surface" onclick="navigate('modules')">Svi moduli</button>
      </div>
      <div style="margin-top:40px;text-align:left">
        <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text4);margin-bottom:16px">Pregled odgovora</div>
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
  let doneLessons = 0, quizzesPassed = 0;
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
    } else { nextAction = `navigate('quiz',{moduleId:${m.id}})`; nextLabel = '📝 Uradi kviz'; }

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
      <div class="container">
        <div class="dash-greeting">Zdravo, <span>${user.firstName}</span>! 👋</div>
        <div class="dash-meta">Nastavi tamo gde si stao/la · AI Starter Pack</div>
        ${p.certificateEarned ? `<div style="margin-top:16px;padding:14px 20px;background:rgba(22,163,74,.07);border:1px solid rgba(22,163,74,.25);border-radius:10px;display:inline-block"><span style="color:#16a34a;font-weight:700">🎓 Čestitamo! Kurs je završen.</span><button class="btn btn-green btn-sm" style="margin-left:16px" onclick="navigate('certificate')">Preuzmi sertifikat</button></div>` : ''}
      </div>
    </div>
    <div class="dash-stats">
      <div class="stat-card"><div class="stat-val">${overallPct}%</div><div class="stat-label">Kurs završen</div></div>
      <div class="stat-card"><div class="stat-val">${doneLessons}</div><div class="stat-label">Lekcija završeno</div></div>
      <div class="stat-card"><div class="stat-val">${quizzesPassed}</div><div class="stat-label">Kvizova položeno</div></div>
      <div class="stat-card"><div class="stat-val">${p.completedModules}/7</div><div class="stat-label">Modula završeno</div></div>
    </div>
    <div class="dash-modules">
      <div class="container">
        <div class="section-label">Moduli</div>
        <h2 class="section-title" style="font-size:clamp(22px,3vw,32px);margin-bottom:24px">Tvoj napredak</h2>
        <div class="dash-mod-grid">${modCards}</div>
      </div>
    </div>
  </div>`;
}

// ============================================================
// CERTIFICATE
// ============================================================
async function renderCertificate(app) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }
  app.innerHTML = `<div class="page"><div style="text-align:center;padding:80px;color:var(--text4)">Učitavanje...</div></div>`;
  let certData;
  try { certData = await API.getCertificate(); }
  catch (e) {
    app.innerHTML = `<div class="page"><div style="max-width:600px;margin:80px auto;text-align:center;padding:0 32px">
      <div style="font-size:48px;margin-bottom:20px">🔒</div>
      <h2 style="font-size:28px;font-weight:800;letter-spacing:-.03em;margin-bottom:12px;color:var(--text)">Sertifikat nije dostupan</h2>
      <p style="color:var(--text3);margin-bottom:8px">Potrebno je završiti sve module i položiti sve kvizove (min. 40%).</p>
      <p style="color:var(--text4);font-size:13px;margin-bottom:32px">${e.message}</p>
      <button class="btn btn-red" onclick="navigate('dashboard')">Nastavi kurs</button>
    </div></div>`;
    return;
  }
  const date = new Date(certData.completedAt).toLocaleDateString('sr-RS', { day:'numeric', month:'long', year:'numeric' });
  app.innerHTML = `
  <div class="page cert-page">
    <div class="section-label" style="justify-content:center;margin-bottom:12px">Sertifikat</div>
    <h2 class="section-title" style="text-align:center;margin-bottom:40px">Tvoj AI Starter Pack sertifikat</h2>
    <div class="cert-preview" id="cert-preview">
      <div class="cert-inner">
        <div class="cert-logo-wrap">${logoSVG(28)}</div>
        <div class="cert-word">Sertifikat o završetku</div>
        <div class="cert-title-big">AI Starter Pack</div>
        <div class="cert-to">Dodeljuje se</div>
        <div class="cert-name">${certData.firstName} ${certData.lastName}</div>
        <div class="cert-body">za uspešno završen kurs <strong>AI Starter Pack</strong> – besplatni online kurs o veštačkoj inteligenciji kroz 7 modula.</div>
        <div class="cert-badges-wrap">
          <div class="cert-badge-big"><span>${certData.ects}</span> ECTS Boda</div>
          <div class="cert-badge-big"><span>${certData.discount}€</span> Popust ITS/ITHS</div>
        </div>
        <div class="cert-date">${date}</div>
        <div class="cert-partners">
          <div><div class="cert-partner-name">ITS</div><div style="font-size:9px;color:var(--text4)">www.its.edu.rs</div></div>
          <div style="text-align:center"><div style="font-size:24px">🤖</div><div class="cert-partner-name" style="font-size:9px">AI Savez Srbije</div></div>
          <div style="text-align:right"><div class="cert-partner-name">ITHS</div><div style="font-size:9px;color:var(--text4)">www.iths.edu.rs</div></div>
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
    ['Da li je kurs stvarno besplatan?','Da! Kurs je potpuno besplatan za sve korisnike. Dovoljno je da se registruješ i možeš odmah da počneš sa učenjem.'],
    ['Da li moram da znam programiranje?','Ne. Kurs je osmišljen za sve – bez obzira na prethodno znanje. Nema kodiranja, samo jednostavna i jasna objašnjenja.'],
    ['Koliko vremena mi je potrebno?','Kurs ima 7 modula sa po 3 lekcije. Svaki modul traje oko 1–1.5 sat, ali tempo određuješ ti – učiš kad hoćeš.'],
    ['Da li mogu da učim preko telefona?','Naravno! Kurs je dostupan na svim uređajima – telefonu, tabletu ili računaru. Potrebna je internet veza.'],
    ['Kako se dobija sertifikat?','Za sertifikat trebaš završiti sve lekcije u svih 7 modula i položiti svaki kviz sa min. 40% tačnih odgovora. Sertifikat nosi 2 ECTS boda i 100€ popust za ITS/ITHS.'],
    ['Šta ako ne položim kviz?','Nema problema! Možeš ponovo proći lekcije i pokušati kviz koliko god puta želiš. Nema vremenskog ograničenja.'],
    ['Da li mogu da se vratim na prethodne lekcije?','Apsolutno. Imaš stalni pristup svim lekcijama i možeš ih ponovo čitati kad god poželiš.'],
    ['Može li se kurs koristiti u školama?','Da! Idealan je za kolektivno učenje u školama i firmama. Kontaktiraj nas na upis@its.edu.rs za implementaciju.'],
    ['Da li je kurs dostupan van Srbije?','Da, svi koji govore srpski mogu pristupiti kursu bez obzira na lokaciju.'],
    ['Imam još pitanja – kome da se obratim?','Piši nam na upis@its.edu.rs ili pozovi +381 (0)11/40-11-216. Viber/WhatsApp: +381 (0)65/20-15-880. Lokacija: Savski nasip 7, Novi Beograd.'],
  ];
  app.innerHTML = `
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <div class="section-label">Pitanja i odgovori</div>
        <h1 class="page-h1">Sve što te zanima<br>pre nego što kreneš.</h1>
      </div>
    </section>
    <div class="container">
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
    </div>
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
    <div class="auth-bg"></div>
    <div class="auth-wrap">
      <div class="auth-tabs">
        <button class="auth-tab active" onclick="navigate('login')">Prijava</button>
        <button class="auth-tab" onclick="navigate('register')">Registracija</button>
      </div>
      <div class="auth-box">
        <h2>Prijava</h2>
        <div class="f-error" id="login-err"></div>
        <div class="f-group"><label class="f-label">Email adresa</label><input type="email" class="f-input" id="l-email" placeholder="tvoj@email.com"></div>
        <div class="f-group"><label class="f-label">Lozinka</label><input type="password" class="f-input" id="l-pass" placeholder="••••••••" onkeydown="if(event.key==='Enter')doLogin()"></div>
        <button class="f-submit" onclick="doLogin()">Prijavi se</button>
        <div class="f-alt" style="margin-top:10px;color:var(--text4)">Zaboravio/la lozinku? <a href="#">Resetuj ovde</a></div>
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
  try { await API.login(email, pass); updateNav(); showToast('Dobrodošao/la! 👋', 'success'); navigate('dashboard'); }
  catch (e) { showErr(err, e.message); }
}

function renderRegister(app) {
  const years = [];
  for (let y = 2010; y >= 1940; y--) years.push(`<option value="${y}"${y===2000?' selected':''}>${y}</option>`);
  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-bg"></div>
    <div class="auth-wrap">
      <div class="auth-tabs">
        <button class="auth-tab" onclick="navigate('login')">Prijava</button>
        <button class="auth-tab active" onclick="navigate('register')">Registracija</button>
      </div>
      <div class="auth-box">
        <h2>Registracija</h2>
        <div class="f-error" id="reg-err"></div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Ime</label><input type="text" class="f-input" id="r-first" placeholder="Ime"></div>
          <div class="f-group"><label class="f-label">Prezime</label><input type="text" class="f-input" id="r-last" placeholder="Prezime"></div>
        </div>
        <div class="f-group"><label class="f-label">Email adresa</label><input type="email" class="f-input" id="r-email" placeholder="tvoj@email.com"></div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Lozinka</label><input type="password" class="f-input" id="r-pass" placeholder="min. 6 karaktera"></div>
          <div class="f-group"><label class="f-label">Potvrdi lozinku</label><input type="password" class="f-input" id="r-pass2" placeholder="••••••••"></div>
        </div>
        <div class="f-row">
          <div class="f-group"><label class="f-label">Godina rođenja</label><select class="f-input f-select" id="r-year">${years.join('')}</select></div>
          <div class="f-group"><label class="f-label">Poštanski broj</label><input type="text" class="f-input" id="r-postal" placeholder="11000"></div>
        </div>
        <div class="checks">
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c1"> <span class="f-check-label">Pristajem da se podaci o napretku koriste u statističke svrhe (anonimno).</span></label>
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c2"> <span class="f-check-label">Želim da primam informacije o novim kursevima. (opciono)</span></label>
          <label class="f-check-row"><input type="checkbox" class="f-check" id="r-c3"> <span class="f-check-label">Prihvatam <a href="#">Politiku privatnosti</a> i <a href="#">Uslove korišćenja</a>. <strong>(obavezno)</strong></span></label>
        </div>
        <button class="f-submit" onclick="doRegister()">Registruj se besplatno</button>
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
  try { await API.register({ firstName, lastName, email, password, birthYear, postalCode }); updateNav(); showToast('Dobrodošao/la! Nalog je kreiran. 🎉', 'success'); navigate('dashboard'); }
  catch (e) { showErr(err, e.message); }
}

function showErr(el, msg) {
  if (!el) return; el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

// Print CSS
const printStyle = document.createElement('style');
printStyle.textContent = `@media print { nav,.float-cta,.cert-actions,.modal-overlay{display:none!important} body{background:white!important;color:black!important} .cert-preview{box-shadow:none!important} }`;
document.head.appendChild(printStyle);

// INIT
updateNav();
navigate('home');
