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
  else if (page === 'privacy') renderPrivacy(app);
  else if (page === 'terms') renderTerms(app);
  else if (page === 'login') renderLogin(app);
  else if (page === 'profile') renderProfile(app);
  else if (page === 'forgot-password') renderForgotPassword(app);
  else if (page === 'verify') renderVerifyEmail(app, params);
  else if (page === 'contact') renderContact(app);
  else if (page === 'reset-password') renderResetPassword(app, params);
  else if (page === 'register') renderRegister(app);
  else render404(app);

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

    <section class="home-contact-section reveal">
      <div class="container">
        <div class="home-contact-grid">
          <div class="home-contact-left">
            <div class="section-label">Kontakt</div>
            <h2 class="section-title">Imate pitanje?<br>Pišite nam.</h2>
            <p class="section-sub">Imate pitanje o kursu, sertifikatu ili implementaciji u školi? Tu smo!</p>
            <div class="home-contact-info">
              <div class="hci-item"><span>✉️</span><a href="mailto:upis@its.edu.rs">upis@its.edu.rs</a></div>
              <div class="hci-item"><span>📞</span><a href="tel:+381114011216">+381 (0)11/40-11-216</a></div>
              <div class="hci-item"><span>📱</span><a href="tel:+381652015880">Viber/WhatsApp: +381 (0)65/20-15-880</a></div>
              <div class="hci-item"><span>📍</span><span>Savski nasip 7, Novi Beograd</span></div>
            </div>
          </div>
          <div class="home-contact-right">
            <div class="f-error" id="hc-err"></div>
            <div class="hc-success" id="hc-ok"></div>
            <div class="f-row">
              <div class="f-group"><label class="f-label">Ime i prezime</label><input type="text" class="f-input" id="hc-name" placeholder="Vaše ime"></div>
              <div class="f-group"><label class="f-label">Email adresa</label><input type="email" class="f-input" id="hc-email" placeholder="vas@email.com"></div>
            </div>
            <div class="f-group"><label class="f-label">Tema</label>
              <select class="f-input" id="hc-topic">
                <option value="">Izaberite temu...</option>
                <option>Pitanje o kursu</option>
                <option>Tehnički problem</option>
                <option>Implementacija u školi/firmi</option>
                <option>Partnerstvo</option>
                <option>Ostalo</option>
              </select>
            </div>
            <div class="f-group"><label class="f-label">Poruka</label><textarea class="f-input" id="hc-message" rows="4" placeholder="Vaša poruka..." style="resize:vertical"></textarea></div>
            <button class="btn btn-red btn-wide" style="padding:14px" onclick="sendHomeContact()">Pošalji poruku →</button>
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
    <section class="about-hero-section">
      <div class="about-hero-bg"></div>
      <div class="about-hero-overlay"></div>
      <div class="about-hero-content">
        <div class="container">
          <div class="section-label" style="color:rgba(255,100,100,.8)">O kursu</div>
          <h1 class="page-h1" style="color:#fff;max-width:700px">AI Starter Pack –<br>znanje bez barijera.</h1>
          <p class="page-sub" style="color:rgba(255,255,255,.6);max-width:600px">Veštačka inteligencija više nije daleka budućnost. Kurs je osmišljen da ti pomogne da razumeš kako AI funkcioniše – bez programiranja, bez matematike, bez predznanja.</p>
          <div style="display:flex;gap:14px;margin-top:32px;flex-wrap:wrap">
            <button class="btn btn-red btn-lg" onclick="navigate('register')">Počni besplatno →</button>
            <button class="btn btn-ghost btn-lg" onclick="navigate('modules')">Pogledaj module</button>
          </div>
        </div>
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

  const moduleData = [
    { emoji:'🟣', color:'#8b5cf6', light:'rgba(139,92,246,.08)', topics:['Osnove AI','Mašinsko učenje','Uska vs opšta AI','Svakodnevni primeri'] },
    { emoji:'🔵', color:'#3b82f6', light:'rgba(59,130,246,.08)', topics:['Algoritmi pretrage','Logika odlučivanja','Igre i simulacije','Optimizacija'] },
    { emoji:'🟢', color:'#22c55e', light:'rgba(34,197,94,.08)', topics:['Nadgledano učenje','Klasifikacija','Regresija','Predikcija'] },
    { emoji:'🔴', color:'#ef4444', light:'rgba(239,68,68,.08)', topics:['Neuronske mreže','Backpropagation','CNN','Transformeri'] },
    { emoji:'🧩', color:'#f59e0b', light:'rgba(245,158,11,.08)', topics:['AI za produktivnost','ChatGPT alati','Organizacija','Pisanje i analize'] },
    { emoji:'⚖️', color:'#6366f1', light:'rgba(99,102,241,.08)', topics:['Etika AI','Privatnost','Deepfake','Odgovornost'] },
    { emoji:'🌐', color:'#14b8a6', light:'rgba(20,184,166,.08)', topics:['Tržište rada','Obrazovanje','Geopolitika','AI 2030'] },
  ];

  const cards = MODULES.map((m, idx) => {
    const mp = getModuleProgress(m.id);
    const done = lessonsDone(m.id);
    const total = m.lessons.length;
    const pct = Math.round((done / total) * 100);
    const isCompleted = mp.completed;
    const md = moduleData[idx];
    let statusLabel = 'Nije početo';
    if (isCompleted) statusLabel = '✓ Završeno';
    else if (done > 0) statusLabel = done + '/' + total + ' lekcija';

    return `
    <div class="mod-card-premium${isCompleted ? ' completed' : ''}" onclick="openModuleModal(${m.id})" style="--mod-color:${md.color};--mod-light:${md.light};animation-delay:${idx * 0.06}s">
      <div class="mcp-header">
        <div class="mcp-num">0${m.id}</div>
        <div class="mcp-status${isCompleted ? ' done' : done > 0 ? ' progress' : ''}">${statusLabel}</div>
      </div>
      <div class="mcp-emoji">${md.emoji}</div>
      <div class="mcp-title">${m.title}</div>
      <div class="mcp-topics">
        ${md.topics.map(t => `<span class="mcp-topic">${t}</span>`).join('')}
      </div>
      <div class="mcp-progress-wrap">
        <div class="mcp-progress-track"><div class="mcp-progress-fill" style="width:${pct}%"></div></div>
        <span class="mcp-pct">${pct}%</span>
      </div>
      <div class="mcp-footer">
        <span class="mcp-lessons">${total} lekcije · 1 kviz</span>
        <span class="mcp-cta">${isCompleted ? 'Ponovi →' : done > 0 ? 'Nastavi →' : 'Počni →'}</span>
      </div>
    </div>`;
  }).join('');

  const heroImg = `
    <div class="modules-page-hero-img">
      <img src="/img/modules-img.png" alt="AI moduli">
      <div class="mph-overlay"></div>
    </div>`;

  app.innerHTML = `
  <div class="page">
    <section class="modules-page-hero">
      ${heroImg}
      <div class="mph-content">
        <div class="container">
          <div class="section-label" style="color:rgba(255,100,100,.8)">Kurs</div>
          <h1 class="page-h1" style="color:#fff">7 modula.<br>21 lekcija.<br>Sve o AI.</h1>
          <p class="page-sub" style="color:rgba(255,255,255,.6)">Učiš kroz praktične primere, realne AI alate i kratke kvizove koji proveravaju znanje.</p>
          ${user && userProgress ? `
          <div class="mph-progress-bar-wrap">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:13px;color:rgba(255,255,255,.5);font-weight:600">UKUPNI NAPREDAK</span>
              <span style="font-size:13px;color:#fff;font-weight:700">${userProgress.completedModules}/7 modula</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${Math.round(userProgress.completedModules/7*100)}%;background:linear-gradient(90deg,var(--red),#ff6b6b);border-radius:3px;transition:width 1s ease"></div>
            </div>
            ${userProgress.certificateEarned ? `<div style="margin-top:16px"><button class="btn btn-green" onclick="navigate('certificate')">🎓 Preuzmi sertifikat</button></div>` : ''}
          </div>` : `
          <div style="margin-top:32px;display:flex;gap:12px;flex-wrap:wrap">
            <button class="btn btn-red btn-lg" onclick="navigate('register')">Počni besplatno →</button>
            <button class="btn btn-ghost btn-lg" onclick="navigate('about')">O kursu</button>
          </div>`}
        </div>
      </div>
    </section>

    <section style="padding:80px 0 120px;background:var(--bg2)">
      <div class="container">
        <div class="modules-premium-grid">
          ${cards}
        </div>
      </div>
    </section>

    <section style="padding:80px 0;background:#fff;border-top:1px solid var(--border)">
      <div class="container" style="text-align:center">
        <div class="section-label" style="justify-content:center">Spreman/na?</div>
        <h2 class="section-title" style="max-width:560px;margin:0 auto 16px">Počni kurs danas –<br>potpuno besplatno.</h2>
        <p style="font-size:17px;color:var(--text3);margin-bottom:36px">Nema roka, nema pritiska. Učiš sopstvenim tempom.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-red btn-lg" onclick="navigate('register')" style="font-size:16px;padding:16px 40px">Registruj se besplatno</button>
          <button class="btn btn-outline btn-lg" onclick="navigate('faq')">Imam pitanje →</button>
        </div>
      </div>
    </section>
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
    {q:'Koja od sledećih tehnologija koristi veštačku inteligenciju?',opts:['Digitalni sat','Kalkulator','Prepoznavanje glasa u telefonu','Rerna sa tajmerom'],correct:2,exp:'Prepoznavanje glasa koristi AI da razume ljudski govor, pretvara zvuk u tekst i reaguje na komande – to je tipičan primer AI sistema. Ostali uređaji samo izvršavaju zadate funkcije.'},
    {q:'Šta je osnovna karakteristika veštačke inteligencije?',opts:['Može da koristi bateriju duže od običnog telefona','Može da obavlja zadatke koji zahtevaju ljudsku inteligenciju','Ima metalno telo i pištolj','Radi samo kad ima internet'],correct:1,exp:'AI se koristi za obavljanje zadataka koje bi inače zahtevale ljudsku sposobnost razumevanja, odlučivanja i učenja.'},
    {q:'Kako se zove skup uputstava koje AI koristi da reši problem?',opts:['Generator','Algoritam','Automat','Motor'],correct:1,exp:'Algoritam je niz precizno definisanih koraka koje mašina koristi za rešavanje problema – osnovna jedinica mišljenja u AI sistemima.'},
    {q:'Koji od sledećih primera je uska (slaba) veštačka inteligencija?',opts:['Robot koji razume sve oblasti života','AI koji predlaže sledeću pesmu na Spotify-u','Ljubimac robot koji sanja','Šrafciger sa senzorom'],correct:1,exp:'Uska AI je specijalizovana za jedan zadatak – poput preporuke pesama. Ne razume kontekst, ne razmišlja globalno.'},
    {q:'Šta AI koristi da nauči kako da prepoznaje obrasce i donosi odluke?',opts:['Emocije','Podatke i primere','Magnete','Kompas'],correct:1,exp:'AI sistem uči iz velikog broja primera (podataka). Nema emocije, ne koristi fizičke alate – koristi podatke za donošenje zaključaka.'},
  ],
  2:[
    {q:'Kako AI vidi "problem" koji treba da reši?',opts:['Kao emociju koju treba prepoznati','Kao slučajan niz podataka','Kao niz stanja, pravila i ciljeva','Kao listu reči koju treba prevesti'],correct:2,exp:'Za AI, svaki problem je formalizovan kao početno stanje, ciljno stanje, dozvoljene akcije i pravila – sve to zajedno čini prostor za rešavanje.'},
    {q:'Koja je uloga algoritma pretrage u rešavanju problema?',opts:['Da unapred zna tačno rešenje','Da pretvori problem u sliku','Da pretraži moguće puteve od početka do cilja','Da pošalje podatke korisniku'],correct:2,exp:'Algoritam pretrage omogućava AI sistemu da istraži sve potencijalne pravce i pronađe optimalan put do rešenja problema.'},
    {q:'Zašto AI koristi funkciju cilja?',opts:['Da izrazi svoje mišljenje','Da generiše nasumične odgovore','Da uporedi korisnike među sobom','Da zna kada je problem uspešno rešen'],correct:3,exp:'Funkcija cilja pomaže AI da prepozna trenutak kada je dostigla očekivani ishod – odnosno, da zna da je rešenje postignuto.'},
    {q:'Koji od sledećih primera prikazuje AI koja rešava problem optimizacije?',opts:['AI koja prepoznaje lice na slici','AI koja bira najkraći put za dostavu','AI koja prevodi tekst reč po reč','AI koja sortira slike po veličini'],correct:1,exp:'Optimizacija podrazumeva da AI ne traži samo bilo koje rešenje, već ono koje zadovoljava kriterijum najboljeg – u ovom slučaju, najkraći put.'},
    {q:'Kako AI zna koje akcije su dozvoljene prilikom rešavanja problema?',opts:['Na osnovu ljudskih emocija','Na osnovu unapred definisanih pravila','Kroz svesno rasuđivanje','Pogađanjem'],correct:1,exp:'AI sistem koristi eksplicitno zadate uslove i pravila okruženja da bi znao koje poteze može ili ne može da izvrši.'},
  ],
  3:[
    {q:'Šta je karakteristično za nadgledano učenje?',opts:['AI analizira podatke bez ikakvih oznaka','AI uči na osnovu podataka koji imaju poznate odgovore','AI uči gledajući video snimke','AI koristi logiku umesto primera'],correct:1,exp:'U nadgledanom učenju, svaki primer u obuci sadrži i ulazne podatke i očekivani izlaz, što omogućava AI da nauči pravilnu vezu između njih.'},
    {q:'Kada se koristi nenadgledano učenje?',opts:['Kada AI mora da odgovori na pitanja korisnika','Kada AI nema obeležene podatke, već sam traži obrasce','Kada je dostupno malo podataka','Kada se AI koristi za prepoznavanje lica'],correct:1,exp:'Nenadgledano učenje se koristi kada nemamo označene podatke. AI pokušava da samostalno otkrije grupe, sličnosti i obrasce u informacijama koje dobija.'},
    {q:'Koji od sledećih zadataka najverovatnije koristi nadgledano učenje?',opts:['Grupisanje korisnika po navikama','Prepoznavanje da li je mejl spam ili nije','Pronalazak neobičnih transakcija bez konteksta','Organizacija fajlova po boji'],correct:1,exp:'Za zadatak klasifikacije kao što je prepoznavanje spama, AI mora da uči iz primera gde je svaki mejl unapred označen kao spam ili nije spam.'},
    {q:'U nenadgledanom učenju, AI:',opts:['Traži pomoć od korisnika za svaku odluku','Donosi nasumične zaključke','Samostalno otkriva šablone i grupiše podatke','Koristi pravila programera da klasifikuje sve podatke'],correct:2,exp:'U nenadgledanom učenju, AI analizira podatke koji nisu prethodno klasifikovani i pokušava da pronađe unutrašnje strukture, sličnosti i klastere.'},
    {q:'Koja je osnovna razlika između nadgledanog i nenadgledanog učenja?',opts:['U vrsti algoritma','U tome da li su podaci unapred obeleženi','U jeziku programiranja','U tome da li se koristi u mobilnim aplikacijama'],correct:1,exp:'Nadgledano učenje koristi podatke sa jasno definisanim ishodima, dok nenadgledano učenje koristi sirove podatke bez prethodnih oznaka.'},
  ],
  4:[
    {q:'Zašto se neuronska mreža tako zove?',opts:['Zato što koristi električne impulse','Zato što je inspirisana načinom rada ljudskog mozga','Zato što se povezuje sa internetom','Zato što je sastavljena od kablova'],correct:1,exp:'Neuronska mreža je dobila ime jer njena struktura i način funkcionisanja podsećaju na neuronske veze u mozgu – iako nije biološka, već matematička.'},
    {q:'Šta opisuje proces feedforward u neuronskoj mreži?',opts:['Ažuriranje grešaka iz izlaza','Prolazak informacije od ulaza do izlaza','Prekid rada mreže','Nasumično generisanje rezultata'],correct:1,exp:'Feedforward je smer u kojem podaci teku kroz mrežu: od ulaznog sloja, kroz skrivene slojeve, do izlaza. Tu mreža daje prvu pretpostavku.'},
    {q:'Koja je uloga backpropagation procesa?',opts:['Dodavanje novih neurona u mrežu','Korekcija težina na osnovu greške','Generisanje izlazne vrednosti','Nasumično menjanje podataka'],correct:1,exp:'Backpropagation je proces kojim se greška šalje unazad kroz mrežu i koristi za podešavanje težina veza – da bi mreža sledeći put bila preciznija.'},
    {q:'Koji tip neuronske mreže se najčešće koristi za prepoznavanje slika?',opts:['Sekvencijalna mreža','Konvolutivna neuronska mreža (CNN)','Logička mreža','Generativna mreža za tekst'],correct:1,exp:'Konvolutivne neuronske mreže (CNN) su specijalno dizajnirane za rad sa slikama. One prepoznaju vizuelne obrasce, oblike, ivice i strukture u vizuelnim podacima.'},
    {q:'Šta neuronska mreža zna kada "prepozna" mačku na slici?',opts:['Zna šta je mačka i da pravi mjauk','Prepoznaje obrazac sličan onome što je ranije već videla','Zna ime vlasnika mačke','Pamti sve slike zauvek'],correct:1,exp:'AI ne zna značenje slike, ali prepoznaje vizuelne obrasce slične onima na kojima je trenirana – i na osnovu toga zaključuje šta je na slici.'},
  ],
  5:[
    {q:'Koja je glavna prednost korišćenja AI u učenju?',opts:['AI može da uči umesto tebe','AI uvek daje gotove odgovore za testove','AI ti pomaže da brže razumeš i organizuješ gradivo','AI automatski piše tvoje domaće zadatke'],correct:2,exp:'Cilj korišćenja AI u učenju nije prečica, već alat koji ti pomaže da efikasnije razumeš, vežbaš i sistematizuješ informacije.'},
    {q:'Šta možeš zatražiti od AI alata da ti pomogne da bolje razumeš neku lekciju?',opts:['Da ti je prevede na strani jezik','Da napiše šaljivu pesmu','Da ti objasni lekciju jednostavnim rečima ili kroz analogije','Da ti izračuna procenat tvoje inteligencije'],correct:2,exp:'AI alati poput ChatGPT mogu ti pomoći da neku kompleksnu ideju razumeš tako što će ti je objasniti jednostavno, kao da pričaš s mentorom.'},
    {q:'Koja je glavna uloga AI kao ličnog asistenta?',opts:['Da obavlja tvoje zadatke umesto tebe','Da ti pomogne da bolje razmišljaš, pišeš i donosiš odluke','Da odlučuje umesto tebe','Da zapamti tvoju lozinku i automatski šalje mejlove'],correct:1,exp:'AI ne preuzima odgovornost, već pomaže u organizaciji misli, strukturi zadataka i razumevanju složenih problema – uz tvoje vođstvo.'},
    {q:'Koja je razlika između običnog kalendara i AI asistenta?',opts:['Kalendari su pametniji','AI može da prilagođava planove u realnom vremenu i predlaže nove','Kalendari bolje pamte zadatke','AI se koristi samo za velike kompanije'],correct:1,exp:'AI ne samo da beleži – već razume promene, postavlja pitanja i nudi rešenja kada se planovi poremete. On reaguje, a ne samo prikazuje.'},
    {q:'Zašto AI ne bi trebalo da zameni tvoju odgovornost?',opts:['Jer ne zna da razmišlja kao ti','Jer je alat, ne tvoj menadžer – ti odlučuješ, on pomaže','Jer nije dovoljno efikasan','Jer radi samo ako si programer'],correct:1,exp:'AI je tu da ti olakša donošenje odluka, ne da ih donosi umesto tebe. On strukturira ono što ti već znaš – ali ti si i dalje onaj koji vodi.'},
  ],
  6:[
    {q:'Kako nastaje pristrasnost u veštačkoj inteligenciji?',opts:['AI je programiran da bude nepravedan','AI automatski favorizuje moćne korisnike','AI uči iz istorijskih podataka koji mogu sadržati nesvesne pristrasnosti','Pristrasnost je posledica preopterećenja sistema'],correct:2,exp:'AI ne razume pravednost. Ako su istorijski podaci pristrasni, AI će te obrasce samo preneti – ne zna da ih preispita.'},
    {q:'Zašto je privatnost važna prilikom korišćenja AI alata?',opts:['Jer AI ne može funkcionisati bez privatnih podataka','Jer korisnici često nesvesno unose osetljive informacije koje se mogu koristiti dalje','Jer se privatnost odnosi na dizajn softvera','Jer zakon ne dozvoljava postavljanje pitanja'],correct:1,exp:'Korisnici često otkrivaju lične informacije u interakciji sa AI. Te informacije mogu biti pohranjene, analizirane, pa čak i korišćene za obuku modela.'},
    {q:'Koja je potencijalna opasnost od AI alata koji generišu slike i glas?',opts:['Usporavaju uređaje','Mogu da se koriste za pravljenje lažnih sadržaja (deepfake) koji ugrožavaju reputaciju i sigurnost','Koriste više RAM memorije','Ne mogu da razumeju nijanse jezika'],correct:1,exp:'AI alati koji generišu slike ili glas mogu biti zloupotrebljeni za lažno predstavljanje i manipulaciju javnim mnjenjem.'},
    {q:'Zašto AI sistemi ne mogu sami snositi pravnu odgovornost?',opts:['Zato što su imuni na zakone','Zato što se sve greške automatski brišu','Zato što nisu pravna lica i nemaju svest ni nameru','Zato što rade bez interneta'],correct:2,exp:'Veštačka inteligencija nije osoba niti pravni subjekt – ne poseduje svest, nameru ili odgovornost. Zato je odgovornost za odluke uvek na ljudima.'},
    {q:'Koja od sledećih tvrdnji je najtačnija?',opts:['AI je nepristrasan jer ne misli kao čovek','AI može biti pristrasan jer uči iz podataka koji odražavaju ljudske greške i obrasce','AI uvek zna šta je etički ispravno','Ako AI odluči nešto pogrešno, niko ne može biti odgovoran'],correct:1,exp:'AI nema vrednosni sistem. On uči iz podataka koje mu dajemo. Ako su podaci pogrešni ili istorijski diskriminatorni – i njegovi zaključci mogu biti takvi.'},
  ],
  7:[
    {q:'Kako veštačka inteligencija najčešće menja radna mesta?',opts:['Tako što masovno otpušta ljude iz svih industrija','Tako što automatski zamenjuje sve ljudske radnike','Tako što preuzima rutinske zadatke unutar poslova, dok ljudi ostaju da rade složenije i kreativnije delove','Tako što traži više fizičkog rada'],correct:2,exp:'AI najčešće ne ukida ceo posao, već zamenjuje ponavljajuće, rutinske aktivnosti – ostavljajući ljudima prostor za zadatke koji traže razmišljanje, empatiju i kreativnost.'},
    {q:'Koja veština se smatra ključnom u svetu koji se brzo menja pod uticajem AI?',opts:['Igranje video igara','Pisanje rukom','Kritičko razmišljanje','Održavanje štampača'],correct:2,exp:'Kritičko razmišljanje je veština koja pomaže ljudima da preispituju informacije, razumeju kontekst i donose složene odluke – nešto što AI još uvek ne ume.'},
    {q:'Kako AI može doprineti obrazovanju?',opts:['Potpuno zamenjuje nastavnika u učionici','Prilagođava sadržaj svakom učeniku na osnovu njegovog tempa i stila učenja','Piše umesto učenika domaće zadatke','Briše sve prethodno naučeno'],correct:1,exp:'AI može biti snažan alat za personalizaciju nastave i podršku učenicima, ali nikada ne može zameniti pedagoga, empatiju i interakciju koju pruža živi učitelj.'},
    {q:'Šta je AGI (opšta veštačka inteligencija)?',opts:['Program za montažu video sadržaja','Specijalizovani chatbot','Sistem sposoban da obavlja bilo koji zadatak koji može i čovek','Automatska kamera sa senzorom'],correct:2,exp:'AGI je sledeći nivo AI razvoja – univerzalan i autonoman sistem koji može da uči i rešava različite zadatke bez prethodnog programiranja za svaki od njih.'},
    {q:'Koja bi bila najbezbednija strategija za razvoj AGI-ja?',opts:['Razvijati ga bez zaustavljanja','Zadržati ga samo u jednoj državi','Razvijati ga uz međunarodnu saradnju, nadzor i etička pravila','Dati punu kontrolu kompanijama'],correct:2,exp:'AGI menja svet – zato mora biti razvijan globalno, odgovorno i transparentno. Razvoj AGI-a mora biti globalno koordinisan, otvoren i odgovoran.'},
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
    const payload = answers;  // simple array of answer indices
    const result = await API.submitQuiz(moduleId, payload);
    await loadProgress();
    navigate('quiz-results', { moduleId, result });
  } catch (e) { showToast(e.message, 'error'); }
}

function renderQuizResults(app, { moduleId, result }) {
  const m = MODULES.find(x => x.id === moduleId);
  const pct = Math.round(result.score * 100);
  const detailsHtml = quizState.answers.map((userAnswerIdx, i) => {
    const q = QUIZ_QUESTIONS[moduleId][i];
    if (!q) return '';
    const letters = ['A','B','C','D'];
    const isCorrect = userAnswerIdx === q.correct;
    const userLetter = letters[userAnswerIdx] || '–';
    const userText = q.opts[userAnswerIdx] || '–';
    const correctLetter = letters[q.correct];
    const correctText = q.opts[q.correct];
    return `<div style="padding:16px 0;border-bottom:1px solid var(--border)">
      <div style="font-size:14px;font-weight:600;margin-bottom:8px;color:var(--text)">${i+1}. ${q.q}</div>
      <div style="font-size:13px;margin-bottom:4px;color:${isCorrect ? '#16a34a' : 'var(--red)'}">${isCorrect ? '✓' : '✗'} Tvoj odgovor: ${userLetter} – ${userText}</div>
      ${!isCorrect ? `<div style="font-size:13px;color:#16a34a">✓ Tačan: ${correctLetter} – ${correctText}</div>` : ''}
      <div style="font-size:12px;color:var(--text4);margin-top:6px;padding:8px 12px;background:var(--bg2);border-radius:8px">${q.exp}</div>
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
    { icon:'💰', q:'Da li je kurs stvarno besplatan?', a:'Da! Kurs je potpuno besplatan za sve korisnike. Dovoljno je da se registruješ i možeš odmah da počneš sa učenjem. Nema skrivenih troškova ni pretplata.' },
    { icon:'💻', q:'Da li moram da znam programiranje?', a:'Ne. Kurs je osmišljen za sve – bez obzira na prethodno znanje. Nema kodiranja, samo jednostavna i jasna objašnjenja koja razume svako.' },
    { icon:'⏳', q:'Koliko vremena mi je potrebno?', a:'Kurs ima 7 modula sa po 3 lekcije. Svaki modul traje oko 1–1.5 sat, ali tempo određuješ ti – učiš kad hoćeš i zaustaviš se kada hoćeš.' },
    { icon:'📱', q:'Da li mogu da učim preko telefona?', a:'Naravno! Kurs je dostupan na svim uređajima – telefonu, tabletu ili računaru. Dovoljno je da imaš internet vezu.' },
    { icon:'🎓', q:'Kako se dobija sertifikat?', a:'Za sertifikat trebaš završiti sve lekcije u svih 7 modula i položiti svaki kviz sa min. 40% tačnih odgovora. Sertifikat nosi 2 ECTS boda i 100€ popust za upis na ITS ili ITHS.' },
    { icon:'🔁', q:'Šta ako ne položim kviz?', a:'Nema problema! Možeš ponovo proći lekcije i pokušati kviz koliko god puta želiš. Nema vremenskog ograničenja ni kazne za ponovni pokušaj.' },
    { icon:'📚', q:'Da li mogu da se vratim na prethodne lekcije?', a:'Apsolutno. Imaš stalni pristup svim lekcijama i možeš ih ponovo čitati kad god poželiš.' },
    { icon:'🏫', q:'Može li se kurs koristiti u školama?', a:'Da! Idealan je za kolektivno učenje u školama i firmama. Kontaktiraj nas na upis@its.edu.rs za implementaciju.' },
    { icon:'🌍', q:'Da li je kurs dostupan van Srbije?', a:'Da, svi koji govore srpski mogu pristupiti kursu bez obzira gde se nalaze u svetu.' },
    { icon:'📧', q:'Imam još pitanja – kome da se obratim?', a:'Piši nam na upis@its.edu.rs ili pozovi +381 (0)11/40-11-216. Viber/WhatsApp: +381 (0)65/20-15-880. Lokacija: Savski nasip 7, Novi Beograd.' },
  ];

  const categories = [
    { label: 'Opšte', icon: '📋', items: [0,1,2,3] },
    { label: 'Sertifikat', icon: '🎓', items: [4,5,6] },
    { label: 'Dostupnost', icon: '🌐', items: [7,8,9] },
  ];

  app.innerHTML = `
  <div class="page">
    <section class="faq-hero">
      <div class="faq-hero-bg"></div>
      <div class="faq-hero-overlay"></div>
      <div class="container faq-hero-content">
        <div class="section-label" style="color:rgba(255,100,100,.8)">Pitanja i odgovori</div>
        <h1 class="page-h1" style="color:#fff">Sve što te zanima<br>pre nego što kreneš.</h1>
        <p class="page-sub" style="color:rgba(255,255,255,.55)">Najčešća pitanja o kursu, sertifikatu i pristupu.</p>
        <div class="faq-search-wrap">
          <input type="text" class="faq-search" placeholder="Pretraži pitanja..." oninput="filterFaq(this.value)" id="faq-search">
          <span class="faq-search-icon">🔍</span>
        </div>
      </div>
    </section>

    <section style="padding:80px 0 40px">
      <div class="container">
        <div class="faq-cats">
          ${categories.map((c,i) => `
            <button class="faq-cat${i===0?' active':''}" onclick="filterFaqCat(this,${JSON.stringify(c.items)})">${c.icon} ${c.label}</button>
          `).join('')}
          <button class="faq-cat" onclick="filterFaqCat(this,'all')">📋 Sva pitanja</button>
        </div>
      </div>
    </section>

    <section style="padding:0 0 80px">
      <div class="container">
        <div class="faq-grid" id="faq-grid">
          ${faqs.map(({icon,q,a}, i) => `
            <div class="faq-card reveal" data-index="${i}" style="--delay:${(i%3)*0.07}s">
              <div class="faq-card-icon">${icon}</div>
              <div class="faq-card-body">
                <div class="faq-card-q">${q}</div>
                <div class="faq-card-a">${a}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <section class="faq-cta-section">
      <div class="faq-cta-bg"></div>
      <div class="container faq-cta-inner reveal-scale">
        <div style="font-size:48px;margin-bottom:20px">💬</div>
        <h2 class="section-title" style="color:#fff;max-width:500px;margin:0 auto 16px">Nisi našao/la odgovor?</h2>
        <p style="font-size:17px;color:rgba(255,255,255,.55);margin-bottom:36px;max-width:400px;margin:0 auto 36px">Naš tim je tu za tebe. Piši nam i odgovorićemo brzo.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          <a href="mailto:upis@its.edu.rs" class="btn btn-red btn-lg">✉️ Piši nam</a>
          <button class="btn btn-ghost btn-lg" onclick="navigate('register')">Počni kurs →</button>
        </div>
        <div style="margin-top:28px;font-size:14px;color:rgba(255,255,255,.35);display:flex;gap:24px;justify-content:center;flex-wrap:wrap">
          <span>📞 +381 11 40-11-216</span>
          <span>📱 +381 65 20-15-880</span>
          <span>📍 Savski nasip 7, Novi Beograd</span>
        </div>
      </div>
    </section>
  </div>`;
}

function filterFaq(q) {
  document.querySelectorAll('.faq-card').forEach(card => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(q.toLowerCase()) ? '' : 'none';
  });
}

function filterFaqCat(btn, items) {
  document.querySelectorAll('.faq-cat').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.faq-card').forEach(card => {
    if (items === 'all') { card.style.display = ''; return; }
    card.style.display = items.includes(parseInt(card.dataset.index)) ? '' : 'none';
  });
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
    <div class="auth-split-left">
      <div class="auth-left-content">
        <div class="auth-left-logo">${logoSVG(32)}</div>
        <h2 class="auth-left-title">Dobrodošao/la<br>nazad! 👋</h2>
        <p class="auth-left-sub">Nastavi tamo gde si stao/la. Tvoj napredak te čeka.</p>
        <div class="auth-left-stats">
          <div class="als-item"><div class="als-val">7</div><div class="als-label">Modula</div></div>
          <div class="als-item"><div class="als-val">21</div><div class="als-label">Lekcija</div></div>
          <div class="als-item"><div class="als-val">100%</div><div class="als-label">Besplatno</div></div>
        </div>
        <div class="auth-left-img">
          <img src="/img/hero-bg.png" alt="AI">
        </div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-wrap">
        <div class="auth-form-header">
          <h2 class="auth-form-title">Prijava</h2>
          <p class="auth-form-sub">Nemaš nalog? <a onclick="navigate('register')">Registruj se besplatno →</a></p>
        </div>
        <div class="f-error" id="login-err"></div>
        <div class="auth-field-group">
          <label class="auth-label">Email adresa</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">✉️</span>
            <input type="email" class="auth-input" id="l-email" placeholder="tvoj@email.com" autocomplete="email">
          </div>
        </div>
        <div class="auth-field-group">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <label class="auth-label">Lozinka</label>
            <a href="#" style="font-size:12px;color:var(--red);font-weight:600;text-decoration:none">Zaboravio/la?</a>
          </div>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">🔒</span>
            <input type="password" class="auth-input" id="l-pass" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key==='Enter')doLogin()">
          </div>
        </div>
        <button class="auth-submit" onclick="doLogin()">
          <span>Prijavi se</span>
          <span class="auth-submit-arrow">→</span>
        </button>
        <div class="auth-divider"><span>ili</span></div>
        <button class="auth-alt-btn" onclick="navigate('register')">
          Još nemaš nalog? <strong>Registruj se besplatno</strong>
        </button>
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
    <div class="auth-split-left">
      <div class="auth-left-content">
        <div class="auth-left-logo">${logoSVG(32)}</div>
        <h2 class="auth-left-title">Počni svoju<br>AI avanturu! 🚀</h2>
        <p class="auth-left-sub">Pridruži se hiljadama koji uče veštačku inteligenciju. Besplatno, bez roka, bez pritiska.</p>
        <div class="auth-perks">
          <div class="auth-perk"><span class="ap-icon">🎓</span><span>Digitalni sertifikat po završetku</span></div>
          <div class="auth-perk"><span class="ap-icon">⚡</span><span>Odmah pristupi svim modulima</span></div>
          <div class="auth-perk"><span class="ap-icon">🏆</span><span>2 ECTS boda + 100€ popust</span></div>
          <div class="auth-perk"><span class="ap-icon">🆓</span><span>Potpuno besplatno zauvek</span></div>
        </div>
        <div class="auth-left-img">
          <img src="/img/modules-img.png" alt="AI moduli">
        </div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-wrap">
        <div class="auth-form-header">
          <h2 class="auth-form-title">Kreiraj nalog</h2>
          <p class="auth-form-sub">Već imaš nalog? <a onclick="navigate('login')">Prijavi se →</a></p>
        </div>
        <div class="f-error" id="reg-err"></div>
        <div class="auth-fields-grid">
          <div class="auth-field-group">
            <label class="auth-label">Ime</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">👤</span>
              <input type="text" class="auth-input" id="r-first" placeholder="Ime" autocomplete="given-name">
            </div>
          </div>
          <div class="auth-field-group">
            <label class="auth-label">Prezime</label>
            <div class="auth-input-wrap">
              <input type="text" class="auth-input" id="r-last" placeholder="Prezime" autocomplete="family-name" style="padding-left:16px">
            </div>
          </div>
        </div>
        <div class="auth-field-group">
          <label class="auth-label">Email adresa</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">✉️</span>
            <input type="email" class="auth-input" id="r-email" placeholder="tvoj@email.com" autocomplete="email">
          </div>
        </div>
        <div class="auth-fields-grid">
          <div class="auth-field-group">
            <label class="auth-label">Lozinka</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">🔒</span>
              <input type="password" class="auth-input" id="r-pass" placeholder="min. 6 karaktera">
            </div>
          </div>
          <div class="auth-field-group">
            <label class="auth-label">Potvrdi lozinku</label>
            <div class="auth-input-wrap">
              <input type="password" class="auth-input" id="r-pass2" placeholder="••••••••" style="padding-left:16px">
            </div>
          </div>
        </div>
        <div class="auth-fields-grid">
          <div class="auth-field-group">
            <label class="auth-label">Godina rođenja</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">📅</span>
              <select class="auth-input auth-select" id="r-year">${years.join('')}</select>
            </div>
          </div>
          <div class="auth-field-group">
            <label class="auth-label">Poštanski broj</label>
            <div class="auth-input-wrap">
              <span class="auth-input-icon">📍</span>
              <input type="text" class="auth-input" id="r-postal" placeholder="11000">
            </div>
          </div>
        </div>
        <div class="auth-checks">
          <label class="auth-check-row"><input type="checkbox" class="auth-check" id="r-c1"><span>Pristajem na anonimnu statističku upotrebu podataka o napretku.</span></label>
          <label class="auth-check-row"><input type="checkbox" class="auth-check" id="r-c2"><span>Želim da primam informacije o novim kursevima. (opciono)</span></label>
          <label class="auth-check-row"><input type="checkbox" class="auth-check" id="r-c3"><span>Prihvatam <a href="#">Politiku privatnosti</a> i <a href="#">Uslove korišćenja</a>. <strong>(obavezno)</strong></span></label>
        </div>
        <button class="auth-submit" onclick="doRegister()">
          <span>Registruj se besplatno</span>
          <span class="auth-submit-arrow">→</span>
        </button>
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
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password, birthYear, postalCode })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    navigate('verify', { email });
  }
  catch (e) { showErr(err, e.message); }
}

function showErr(el, msg) {
  if (!el) return; el.textContent = msg; el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 5000);
}

// ============================================================
// PROFILE PAGE
// ============================================================
async function renderProfile(app) {
  const user = API.getUser();
  if (!user) { navigate('login'); return; }
  await loadProgress();
  const p = userProgress || { completedModules: 0, totalModules: 7, certificateEarned: false };
  let doneLessons = 0;
  if (userProgress) Object.values(userProgress.moduleProgress).forEach(mp => {
    doneLessons += Object.values(mp.lessons).filter(l => l.completed).length;
  });

  app.innerHTML = `
  <div class="page">
    <section class="profile-hero">
      <div class="container">
        <div class="profile-header">
          <div class="profile-avatar">${user.firstName[0]}${user.lastName[0]}</div>
          <div class="profile-info">
            <h1 class="profile-name">${user.firstName} ${user.lastName}</h1>
            <p class="profile-email">${user.email}</p>
            <div class="profile-badges">
              <span class="profile-badge">${p.completedModules}/7 modula</span>
              <span class="profile-badge">${doneLessons} lekcija</span>
              ${p.certificateEarned ? '<span class="profile-badge profile-badge-green">🎓 Sertifikat</span>' : ''}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section style="padding:64px 0 100px">
      <div class="container">
        <div class="profile-grid">

          <!-- Edit Profile -->
          <div class="profile-card">
            <div class="profile-card-title">✏️ Izmena profila</div>
            <div class="f-error" id="profile-err"></div>
            <div class="f-success" id="profile-ok"></div>
            <div class="f-group">
              <label class="f-label">Ime</label>
              <input type="text" class="f-input" id="p-first" value="${user.firstName}">
            </div>
            <div class="f-group">
              <label class="f-label">Prezime</label>
              <input type="text" class="f-input" id="p-last" value="${user.lastName}">
            </div>
            <div class="f-group">
              <label class="f-label">Email (ne može se menjati)</label>
              <input type="email" class="f-input" value="${user.email}" disabled style="opacity:.5;cursor:not-allowed">
            </div>
            <button class="btn btn-red btn-wide" onclick="saveProfile()">Sačuvaj izmene</button>
          </div>

          <!-- Change Password -->
          <div class="profile-card">
            <div class="profile-card-title">🔒 Promena lozinke</div>
            <div class="f-error" id="pass-err"></div>
            <div class="f-success" id="pass-ok"></div>
            <div class="f-group">
              <label class="f-label">Trenutna lozinka</label>
              <input type="password" class="f-input" id="p-current" placeholder="••••••••">
            </div>
            <div class="f-group">
              <label class="f-label">Nova lozinka</label>
              <input type="password" class="f-input" id="p-new" placeholder="min. 6 karaktera">
            </div>
            <div class="f-group">
              <label class="f-label">Potvrdi novu lozinku</label>
              <input type="password" class="f-input" id="p-new2" placeholder="••••••••">
            </div>
            <button class="btn btn-outline btn-wide" onclick="changePassword()">Promeni lozinku</button>
          </div>

          <!-- Progress Overview -->
          <div class="profile-card profile-card-wide">
            <div class="profile-card-title">📊 Moj napredak</div>
            <div class="profile-progress-grid">
              ${Array.from({length:7},(_,i)=>{
                const mp = userProgress?.moduleProgress?.[i+1] || {};
                const done = Object.values(mp.lessons||{}).filter(l=>l.completed).length;
                const pct = Math.round(done/3*100);
                return `<div class="pp-item">
                  <div class="pp-top">
                    <span class="pp-num">Modul ${i+1}</span>
                    <span class="pp-status ${mp.completed?'done':done>0?'progress':''}">${mp.completed?'✓':done>0?done+'/3':'–'}</span>
                  </div>
                  <div class="pp-bar"><div class="pp-fill" style="width:${pct}%"></div></div>
                  <div class="pp-quiz">${mp.quizPassed?'Kviz ✓':mp.quizAttempts>0?'Kviz '+Math.round((mp.quizScore||0)*100)+'%':'Kviz čeka'}</div>
                </div>`;
              }).join('')}
            </div>
          </div>

          <!-- Danger Zone -->
          <div class="profile-card profile-card-danger">
            <div class="profile-card-title">⚠️ Opasna zona</div>
            <p style="font-size:14px;color:var(--text3);margin-bottom:20px;line-height:1.65">Brisanjem naloga trajno uklanjate sve podatke, napredak i sertifikate. Ova akcija je nepovratna.</p>
            <div class="f-error" id="del-err"></div>
            <div class="f-group">
              <label class="f-label">Unesite lozinku za potvrdu</label>
              <input type="password" class="f-input" id="p-del-pass" placeholder="Vaša lozinka">
            </div>
            <button class="btn btn-wide" style="background:var(--red);color:#fff" onclick="deleteAccount()">Obriši nalog zauvek</button>
          </div>

        </div>
      </div>
    </section>
  </div>`;
}

async function saveProfile() {
  const firstName = document.getElementById('p-first')?.value.trim();
  const lastName = document.getElementById('p-last')?.value.trim();
  const err = document.getElementById('profile-err');
  const ok = document.getElementById('profile-ok');
  if (!firstName || !lastName) { showErr(err, 'Ime i prezime su obavezni.'); return; }
  try {
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API.getToken() },
      body: JSON.stringify({ firstName, lastName })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    localStorage.setItem('user', JSON.stringify(data));
    ok.textContent = '✓ Profil uspešno ažuriran!';
    ok.style.display = 'block';
    updateNav();
    setTimeout(() => ok.style.display = 'none', 3000);
  } catch(e) { showErr(err, 'Greška na serveru.'); }
}

async function changePassword() {
  const current = document.getElementById('p-current')?.value;
  const newPass = document.getElementById('p-new')?.value;
  const newPass2 = document.getElementById('p-new2')?.value;
  const err = document.getElementById('pass-err');
  const ok = document.getElementById('pass-ok');
  if (!current || !newPass || !newPass2) { showErr(err, 'Sva polja su obavezna.'); return; }
  if (newPass !== newPass2) { showErr(err, 'Nove lozinke se ne podudaraju.'); return; }
  if (newPass.length < 6) { showErr(err, 'Lozinka mora imati najmanje 6 karaktera.'); return; }
  try {
    const res = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API.getToken() },
      body: JSON.stringify({ currentPassword: current, newPassword: newPass })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    ok.textContent = '✓ Lozinka uspešno promenjena!';
    ok.style.display = 'block';
    document.getElementById('p-current').value = '';
    document.getElementById('p-new').value = '';
    document.getElementById('p-new2').value = '';
    setTimeout(() => ok.style.display = 'none', 3000);
  } catch(e) { showErr(err, 'Greška na serveru.'); }
}

async function deleteAccount() {
  const pass = document.getElementById('p-del-pass')?.value;
  const err = document.getElementById('del-err');
  if (!pass) { showErr(err, 'Unesite lozinku.'); return; }
  if (!confirm('Da li ste sigurni? Ova akcija je NEPOVRATNA!')) return;
  try {
    const res = await fetch('/api/auth/account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + API.getToken() },
      body: JSON.stringify({ password: pass })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    API.logout();
    updateNav();
    showToast('Nalog je obrisan.', 'success');
    navigate('home');
  } catch(e) { showErr(err, 'Greška na serveru.'); }
}

// Print CSS
// Print CSS
const printStyle = document.createElement('style');
printStyle.textContent = `@media print { nav,.float-cta,.cert-actions,.modal-overlay{display:none!important} body{background:white!important;color:black!important} .cert-preview{box-shadow:none!important} }`;
document.head.appendChild(printStyle);


// ============================================================
// MOBILE MENU
// ============================================================
function toggleMobileMenu() {
  const menu = document.getElementById('nav-mobile-menu');
  const btn = document.getElementById('nav-hamburger');
  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const menu = document.getElementById('nav-mobile-menu');
  const btn = document.getElementById('nav-hamburger');
  menu.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
}

function showHamburger() {
  const hamburger = document.getElementById('nav-hamburger');
  if (hamburger) hamburger.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
}

window.addEventListener('resize', () => {
  showHamburger();
  if (window.innerWidth > 768) closeMobileMenu();
});


// ============================================================
// FOOTER
// ============================================================
function renderFooter() {
  const existing = document.getElementById('site-footer');
  if (existing) existing.remove();
  const isAuth = ['login','register'].includes(currentPage);
  if (isAuth) return;
  const footer = document.createElement('footer');
  footer.id = 'site-footer';
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer-top">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">${logoSVG(28)}</div>
            <p class="footer-tagline">Veštačka inteligencija,<br>objašnjena jednostavno.</p>
            <p class="footer-desc">Besplatan online kurs kroz 7 modula za sve koji žele da razumeju AI – bez predznanja.</p>
            <div class="footer-social">
              <a href="https://www.its.edu.rs" target="_blank" class="footer-social-link">ITS</a>
              <a href="https://www.iths.edu.rs" target="_blank" class="footer-social-link">ITHS</a>
              <a href="https://ai.org.rs" target="_blank" class="footer-social-link">AI Srbije</a>
            </div>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Kurs</div>
            <a onclick="navigate('modules')" class="footer-link">Svi moduli</a>
            <a onclick="navigate('about')" class="footer-link">O kursu</a>
            <a onclick="navigate('faq')" class="footer-link">FAQ</a>
            <a onclick="navigate('register')" class="footer-link">Registracija</a>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Nalog</div>
            <a onclick="navigate('login')" class="footer-link">Prijava</a>
            <a onclick="navigate('dashboard')" class="footer-link">Dashboard</a>
            <a onclick="navigate('certificate')" class="footer-link">Sertifikat</a>
          </div>
          <div class="footer-col">
            <div class="footer-col-title">Kontakt</div>
            <a href="mailto:upis@its.edu.rs" class="footer-link">upis@its.edu.rs</a>
            <a href="tel:+381114011216" class="footer-link">+381 11 40-11-216</a>
            <span class="footer-link" style="cursor:default">Savski nasip 7, Beograd</span>
            <a href="https://www.its.edu.rs" target="_blank" class="footer-link">www.its.edu.rs</a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-inner">
          <span>© ${new Date().getFullYear()} AI Starter Pack · ITS · ITHS · Savez za AI Srbije</span>
          <div class="footer-bottom-links">
            <a onclick="navigate('privacy')" class="footer-bottom-link">Politika privatnosti</a>
            <a onclick="navigate('terms')" class="footer-bottom-link">Uslovi korišćenja</a>
          </div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(footer);
}

// ============================================================
// 404 PAGE
// ============================================================
function render404(app) {
  app.innerHTML = `
  <div class="page">
    <section class="error-page">
      <div class="error-bg"></div>
      <div class="container error-content">
        <div class="error-code">404</div>
        <h1 class="error-title">Stranica nije pronađena</h1>
        <p class="error-sub">Ova stranica ne postoji ili je premeštena. Vrati se na početnu.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:36px">
          <button class="btn btn-red btn-lg" onclick="navigate('home')">← Početna</button>
          <button class="btn btn-outline btn-lg" onclick="navigate('modules')">Pogledaj module</button>
        </div>
      </div>
    </section>
  </div>`;
}

// ============================================================
// PRIVACY & TERMS
// ============================================================
function renderPrivacy(app) {
  app.innerHTML = `
  <div class="page">
    <section class="page-hero" style="padding:80px 0 60px;background:linear-gradient(180deg,#fff,var(--bg2));border-bottom:1px solid var(--border)">
      <div class="container">
        <div class="section-label">Pravni dokumenti</div>
        <h1 class="page-h1" style="font-size:clamp(32px,5vw,56px)">Politika privatnosti</h1>
        <p class="page-sub">Poslednje ažuriranje: ${new Date().toLocaleDateString('sr-RS')}</p>
      </div>
    </section>
    <div class="container">
      <div class="legal-doc">
        <h2>1. Koje podatke prikupljamo?</h2>
        <p>Prikupljamo sledeće podatke pri registraciji: ime, prezime, email adresu, godinu rođenja i poštanski broj. Takođe pratimo napredak u kursu (završene lekcije i kvizove).</p>
        <h2>2. Kako koristimo podatke?</h2>
        <p>Podatke koristimo isključivo za: pružanje usluge kursa, slanje relevantnih obaveštenja, izdavanje digitalnog sertifikata i statističku analizu (anonimno).</p>
        <h2>3. Čuvanje podataka</h2>
        <p>Podaci se čuvaju na sigurnim serverima (MongoDB Atlas, Frankfurt). Lozinke su enkriptovane bcrypt algoritmom i nikada se ne čuvaju u čistom tekstu.</p>
        <h2>4. Deljenje podataka</h2>
        <p>Ne prodajemo niti delimo vaše podatke sa trećim licima, osim u slučajevima predviđenim zakonom.</p>
        <h2>5. Vaša prava</h2>
        <p>Imate pravo na pristup, ispravku i brisanje vaših podataka. Zahteve šaljite na: <a href="mailto:upis@its.edu.rs">upis@its.edu.rs</a></p>
        <h2>6. Kontakt</h2>
        <p>Za sva pitanja o privatnosti: <strong>upis@its.edu.rs</strong> · Savski nasip 7, Novi Beograd</p>
      </div>
    </div>
    <div class="div-h"></div>
  </div>`;
}

function renderTerms(app) {
  app.innerHTML = `
  <div class="page">
    <section class="page-hero" style="padding:80px 0 60px;background:linear-gradient(180deg,#fff,var(--bg2));border-bottom:1px solid var(--border)">
      <div class="container">
        <div class="section-label">Pravni dokumenti</div>
        <h1 class="page-h1" style="font-size:clamp(32px,5vw,56px)">Uslovi korišćenja</h1>
        <p class="page-sub">Poslednje ažuriranje: ${new Date().toLocaleDateString('sr-RS')}</p>
      </div>
    </section>
    <div class="container">
      <div class="legal-doc">
        <h2>1. Prihvatanje uslova</h2>
        <p>Korišćenjem platforme AI Starter Pack prihvatate ove uslove korišćenja. Ukoliko se ne slažete, molimo vas da ne koristite platformu.</p>
        <h2>2. Usluga</h2>
        <p>AI Starter Pack je besplatna obrazovna platforma. Zadržavamo pravo izmene sadržaja kursa u cilju poboljšanja kvaliteta.</p>
        <h2>3. Nalog korisnika</h2>
        <p>Svaki korisnik može imati jedan nalog. Odgovorni ste za čuvanje pristupnih podataka. Zabranjeno je deljenje naloga.</p>
        <h2>4. Sertifikat</h2>
        <p>Digitalni sertifikat se izdaje po završetku svih 7 modula i postizanju min. 40% na svim kvizovima. Sertifikat je personalizovan i ne može se prenositi.</p>
        <h2>5. Intelektualna svojina</h2>
        <p>Sav sadržaj kursa (lekcije, kvizovi, materijali) je vlasništvo ITS-a i partnera. Zabranjeno je kopiranje i distribucija bez dozvole.</p>
        <h2>6. Ograničenje odgovornosti</h2>
        <p>Platforma se pruža "takva kakva je". Ne garantujemo neprekidnu dostupnost servisa.</p>
        <h2>7. Kontakt</h2>
        <p>Za pitanja: <strong>upis@its.edu.rs</strong> · +381 (0)11/40-11-216 · Savski nasip 7, Novi Beograd</p>
      </div>
    </div>
    <div class="div-h"></div>
  </div>`;
}


// ============================================================
// FORGOT / RESET PASSWORD
// ============================================================
function renderForgotPassword(app) {
  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-split-left">
      <div class="auth-left-content">
        <div class="auth-left-logo">${logoSVG(32)}</div>
        <h2 class="auth-left-title">Zaboravio/la<br>lozinku? 🔐</h2>
        <p class="auth-left-sub">Unesite email adresu i poslaćemo vam link za reset lozinke.</p>
        <div class="auth-left-img"><img src="/img/hero-bg.png" alt="AI"></div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-wrap">
        <div class="auth-form-header">
          <h2 class="auth-form-title">Reset lozinke</h2>
          <p class="auth-form-sub"><a onclick="navigate('login')">← Nazad na prijavu</a></p>
        </div>
        <div class="f-error" id="forgot-err"></div>
        <div class="f-success" id="forgot-ok" style="display:none;padding:16px;background:rgba(22,163,74,.06);border:1px solid rgba(22,163,74,.2);border-radius:10px;color:#16a34a;font-size:14px;margin-bottom:16px"></div>
        <div class="auth-field-group">
          <label class="auth-label">Email adresa</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">✉️</span>
            <input type="email" class="auth-input" id="forgot-email" placeholder="tvoj@email.com">
          </div>
        </div>
        <button class="auth-submit" onclick="doForgotPassword()">
          <span>Pošalji reset link</span>
          <span class="auth-submit-arrow">→</span>
        </button>
      </div>
    </div>
  </div>`;
}

async function doForgotPassword() {
  const email = document.getElementById('forgot-email')?.value.trim();
  const err = document.getElementById('forgot-err');
  const ok = document.getElementById('forgot-ok');
  if (!email) { showErr(err, 'Unesite email adresu.'); return; }
  try {
    await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    err.classList.remove('show');
    ok.textContent = '✓ Ako nalog postoji, poslaćemo ti email sa linkom za reset. Proveri inbox (i spam folder).';
    ok.style.display = 'block';
    document.getElementById('forgot-email').value = '';
  } catch(e) { showErr(err, 'Greška na serveru.'); }
}

function renderResetPassword(app, params = {}) {
  const token = params.token || new URLSearchParams(window.location.hash.split('?')[1] || '').get('token') || '';
  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-split-left">
      <div class="auth-left-content">
        <div class="auth-left-logo">${logoSVG(32)}</div>
        <h2 class="auth-left-title">Nova lozinka 🔑</h2>
        <p class="auth-left-sub">Unesite novu lozinku za vaš nalog.</p>
        <div class="auth-left-img"><img src="/img/hero-bg.png" alt="AI"></div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-wrap">
        <div class="auth-form-header">
          <h2 class="auth-form-title">Postavi novu lozinku</h2>
        </div>
        <div class="f-error" id="reset-err"></div>
        <div class="auth-field-group">
          <label class="auth-label">Nova lozinka</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">🔒</span>
            <input type="password" class="auth-input" id="reset-pass" placeholder="min. 6 karaktera">
          </div>
        </div>
        <div class="auth-field-group">
          <label class="auth-label">Potvrdi novu lozinku</label>
          <div class="auth-input-wrap">
            <span class="auth-input-icon">🔒</span>
            <input type="password" class="auth-input" id="reset-pass2" placeholder="••••••••">
          </div>
        </div>
        <button class="auth-submit" onclick="doResetPassword('${token}')">
          <span>Sačuvaj novu lozinku</span>
          <span class="auth-submit-arrow">→</span>
        </button>
      </div>
    </div>
  </div>`;
}

async function doResetPassword(token) {
  const pass = document.getElementById('reset-pass')?.value;
  const pass2 = document.getElementById('reset-pass2')?.value;
  const err = document.getElementById('reset-err');
  if (!pass || !pass2) { showErr(err, 'Unesite novu lozinku.'); return; }
  if (pass !== pass2) { showErr(err, 'Lozinke se ne podudaraju.'); return; }
  if (pass.length < 6) { showErr(err, 'Lozinka mora imati najmanje 6 karaktera.'); return; }
  try {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: pass })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    showToast('Lozinka uspešno promenjena! 🎉', 'success');
    navigate('login');
  } catch(e) { showErr(err, 'Greška na serveru.'); }
}


// ============================================================
// EMAIL VERIFICATION
// ============================================================
function renderVerifyEmail(app, params = {}) {
  const email = params.email || '';
  const token = params.token || new URLSearchParams(window.location.hash.split('?')[1] || '').get('token') || '';

  if (token) {
    // Auto-verify if token present
    app.innerHTML = `
    <div class="page auth-page">
      <div class="auth-split-left">
        <div class="auth-left-content">
          <div class="auth-left-logo">${logoSVG(32)}</div>
          <h2 class="auth-left-title">Verifikacija<br>emaila ✉️</h2>
          <div class="auth-left-img"><img src="/img/hero-bg.png" alt="AI"></div>
        </div>
      </div>
      <div class="auth-split-right">
        <div class="auth-form-wrap" style="text-align:center">
          <div style="font-size:64px;margin-bottom:20px" id="verify-icon">⏳</div>
          <h2 class="auth-form-title" id="verify-title">Verifikacija u toku...</h2>
          <p class="auth-form-sub" id="verify-sub">Molimo sačekaj.</p>
        </div>
      </div>
    </div>`;

    fetch('/api/auth/verify/' + token)
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          document.getElementById('verify-icon').textContent = '🎉';
          document.getElementById('verify-title').textContent = 'Email potvrđen!';
          document.getElementById('verify-sub').innerHTML = 'Nalog je aktiviran! Klikni <a onclick="navigate(\'login\')" style="color:var(--red);font-weight:700;cursor:pointer">ovde da se prijaviš →</a>';
        } else {
          document.getElementById('verify-icon').textContent = '❌';
          document.getElementById('verify-title').textContent = 'Greška';
          document.getElementById('verify-sub').textContent = data.error || 'Nevažeći link.';
        }
      })
      .catch(() => {
        document.getElementById('verify-icon').textContent = '❌';
        document.getElementById('verify-title').textContent = 'Greška na serveru';
      });
    return;
  }

  // Show "check email" message
  app.innerHTML = `
  <div class="page auth-page">
    <div class="auth-split-left">
      <div class="auth-left-content">
        <div class="auth-left-logo">${logoSVG(32)}</div>
        <h2 class="auth-left-title">Proveri<br>inbox! 📬</h2>
        <p class="auth-left-sub">Poslali smo ti email sa linkom za aktivaciju naloga.</p>
        <div class="auth-left-img"><img src="/img/hero-bg.png" alt="AI"></div>
      </div>
    </div>
    <div class="auth-split-right">
      <div class="auth-form-wrap" style="text-align:center">
        <div style="font-size:80px;margin-bottom:24px">📬</div>
        <h2 class="auth-form-title">Proveri email!</h2>
        <p style="font-size:16px;color:var(--text3);line-height:1.7;margin-bottom:8px">Poslali smo verifikacioni email na:</p>
        <p style="font-size:17px;font-weight:700;color:var(--red);margin-bottom:24px">${email}</p>
        <p style="font-size:14px;color:var(--text4);line-height:1.65;margin-bottom:32px">Klikni na link u emailu da aktiviraš nalog. Proveri i <strong>spam folder</strong> ako ne vidiš email.</p>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:20px;text-align:left;margin-bottom:24px">
          <div style="font-size:13px;font-weight:700;color:var(--text2);margin-bottom:12px">Šta sad?</div>
          <div style="font-size:13px;color:var(--text3);line-height:1.8">
            1. Otvori email od <strong>noreply@ai-starterpack.edu.rs</strong><br>
            2. Klikni na "Potvrdi email adresu"<br>
            3. Vrati se ovde i prijavi se
          </div>
        </div>
        <button class="auth-alt-btn" onclick="navigate('login')">← Nazad na prijavu</button>
      </div>
    </div>
  </div>`;
}


// ============================================================
// COOKIE CONSENT
// ============================================================
function initCookieConsent() {
  if (localStorage.getItem('cookieConsent')) return;
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <div class="cookie-inner">
      <div class="cookie-text">
        <span class="cookie-icon">🍪</span>
        <div>
          <strong>Koristimo kolačiće</strong>
          <p>Koristimo kolačiće za poboljšanje korisničkog iskustva i analitiku. Vaši podaci su zaštićeni u skladu sa <a onclick="navigate('privacy')" style="color:var(--red);cursor:pointer">Politikom privatnosti</a>.</p>
        </div>
      </div>
      <div class="cookie-actions">
        <button class="cookie-btn-decline" onclick="declineCookies()">Odbij neobavezne</button>
        <button class="cookie-btn-accept" onclick="acceptCookies()">Prihvati sve</button>
      </div>
    </div>`;
  document.body.appendChild(banner);
  setTimeout(() => banner.classList.add('show'), 500);
}

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'accepted');
  hideCookieBanner();
}

function declineCookies() {
  localStorage.setItem('cookieConsent', 'declined');
  hideCookieBanner();
}

function hideCookieBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) { banner.classList.remove('show'); setTimeout(() => banner.remove(), 400); }
}

// ============================================================
// CONTACT PAGE
// ============================================================
function renderContact(app) {
  app.innerHTML = `
  <div class="page">
    <section class="page-hero" style="background:linear-gradient(180deg,#fff,var(--bg2));border-bottom:1px solid var(--border);padding:80px 0 60px">
      <div class="container">
        <div class="section-label">Kontakt</div>
        <h1 class="page-h1">Pišite nam</h1>
        <p class="page-sub">Imate pitanje, sugestiju ili želite da implementirate kurs u svojoj školi? Tu smo!</p>
      </div>
    </section>

    <section style="padding:80px 0 120px">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-form-wrap">
            <div class="contact-form-title">Pošalji poruku</div>
            <div class="f-error" id="contact-err"></div>
            <div class="f-success" id="contact-ok" style="display:none;padding:16px;background:rgba(22,163,74,.06);border:1px solid rgba(22,163,74,.2);border-radius:10px;color:#16a34a;font-size:14px;margin-bottom:16px"></div>
            <div class="f-row">
              <div class="f-group"><label class="f-label">Ime</label><input type="text" class="f-input" id="c-name" placeholder="Vaše ime"></div>
              <div class="f-group"><label class="f-label">Email</label><input type="email" class="f-input" id="c-email" placeholder="vas@email.com"></div>
            </div>
            <div class="f-group"><label class="f-label">Tema</label>
              <select class="f-input" id="c-topic">
                <option value="">Izaberite temu...</option>
                <option value="Pitanje o kursu">Pitanje o kursu</option>
                <option value="Tehnički problem">Tehnički problem</option>
                <option value="Implementacija u školi/firmi">Implementacija u školi/firmi</option>
                <option value="Partnerstvo">Partnerstvo</option>
                <option value="Ostalo">Ostalo</option>
              </select>
            </div>
            <div class="f-group"><label class="f-label">Poruka</label><textarea class="f-input" id="c-message" rows="5" placeholder="Vaša poruka..." style="resize:vertical"></textarea></div>
            <button class="btn btn-red btn-wide" style="padding:14px" onclick="sendContact()">Pošalji poruku →</button>
          </div>

          <div class="contact-info">
            <div class="contact-info-title">Kontakt informacije</div>
            <div class="contact-info-items">
              <div class="ci-item">
                <div class="ci-icon">✉️</div>
                <div>
                  <div class="ci-label">Email</div>
                  <a href="mailto:upis@its.edu.rs" class="ci-value">upis@its.edu.rs</a>
                </div>
              </div>
              <div class="ci-item">
                <div class="ci-icon">📞</div>
                <div>
                  <div class="ci-label">Telefon</div>
                  <a href="tel:+381114011216" class="ci-value">+381 (0)11/40-11-216</a><br>
                  <a href="tel:+381114011217" class="ci-value">+381 (0)11/40-11-217</a>
                </div>
              </div>
              <div class="ci-item">
                <div class="ci-icon">📱</div>
                <div>
                  <div class="ci-label">Viber / WhatsApp</div>
                  <a href="tel:+381652015880" class="ci-value">+381 (0)65/20-15-880</a>
                </div>
              </div>
              <div class="ci-item">
                <div class="ci-icon">📍</div>
                <div>
                  <div class="ci-label">Adresa</div>
                  <span class="ci-value">Savski nasip 7<br>Novi Beograd</span>
                </div>
              </div>
              <div class="ci-item">
                <div class="ci-icon">🕐</div>
                <div>
                  <div class="ci-label">Radno vreme</div>
                  <span class="ci-value">Pon–Pet: 09:00–17:00</span>
                </div>
              </div>
            </div>

            <div class="contact-partners">
              <div class="ci-label" style="margin-bottom:14px">Realizatori kursa</div>
              <a href="https://www.its.edu.rs" target="_blank" class="contact-partner-link">🎓 www.its.edu.rs</a>
              <a href="https://www.iths.edu.rs" target="_blank" class="contact-partner-link">🏫 www.iths.edu.rs</a>
              <a href="https://ai.org.rs" target="_blank" class="contact-partner-link">🤖 ai.org.rs</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>`;
}

async function sendContact() {
  const name = document.getElementById('c-name')?.value.trim();
  const email = document.getElementById('c-email')?.value.trim();
  const topic = document.getElementById('c-topic')?.value;
  const message = document.getElementById('c-message')?.value.trim();
  const err = document.getElementById('contact-err');
  const ok = document.getElementById('contact-ok');
  if (!name || !email || !topic || !message) { showErr(err, 'Sva polja su obavezna.'); return; }
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, topic, message })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    err.classList.remove('show');
    ok.textContent = '✓ Poruka je poslata! Odgovorićemo vam u najkraćem roku.';
    ok.style.display = 'block';
    document.getElementById('c-name').value = '';
    document.getElementById('c-email').value = '';
    document.getElementById('c-topic').value = '';
    document.getElementById('c-message').value = '';
  } catch(e) { showErr(err, 'Greška na serveru. Pokušajte ponovo.'); }
}

async function sendHomeContact() {
  const name = document.getElementById('hc-name')?.value.trim();
  const email = document.getElementById('hc-email')?.value.trim();
  const topic = document.getElementById('hc-topic')?.value;
  const message = document.getElementById('hc-message')?.value.trim();
  const err = document.getElementById('hc-err');
  const ok = document.getElementById('hc-ok');
  if (!name || !email || !topic || !message) { showErr(err, 'Sva polja su obavezna.'); return; }
  try {
    const res = await fetch('/api/contact', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, topic, message })
    });
    const data = await res.json();
    if (!res.ok) { showErr(err, data.error); return; }
    err.classList.remove('show');
    ok.textContent = '✓ Poruka je poslata! Odgovorićemo vam uskoro.';
    ok.style.display = 'block';
    document.getElementById('hc-name').value = '';
    document.getElementById('hc-email').value = '';
    document.getElementById('hc-topic').value = '';
    document.getElementById('hc-message').value = '';
    setTimeout(() => ok.style.display = 'none', 5000);
  } catch(e) { showErr(err, 'Greška. Pokušajte ponovo.'); }
}

// INIT
updateNav();
showHamburger();
initCookieConsent();

// Hide loader
function hideLoader() {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 400);
  }
}
// Check for tokens in URL
const hashParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
const hashPath = window.location.hash.split('?')[0].replace('#', '');
if (hashPath === 'reset-password' && hashParams.get('token')) {
  navigate('reset-password', { token: hashParams.get('token') });
} else if (hashPath === 'verify' && hashParams.get('token')) {
  navigate('verify', { token: hashParams.get('token') });
} else {
  navigate('home');
}
