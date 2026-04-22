const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = 'AI Starter Pack <noreply@ai-starterpack.edu.rs>';
const BASE = 'https://www.ai-starterpack.edu.rs';

function emailWrapper(content) {
  return `
    <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e2e7;border-radius:16px;overflow:hidden">
      <div style="background:#06080f;padding:24px 40px;display:flex;align-items:center">
        <img src="${BASE}/img/logo.svg" height="28" style="height:28px">
      </div>
      <div style="padding:40px">${content}</div>
      <div style="background:#f5f5f7;padding:18px 40px;border-top:1px solid #e2e2e7;text-align:center">
        <p style="font-size:12px;color:#ababb2;margin:0">AI Starter Pack · ITS · ITHS · Savez za AI Srbije</p>
        <p style="font-size:12px;color:#ababb2;margin:6px 0 0"><a href="${BASE}" style="color:#E8192C;text-decoration:none">www.ai-starterpack.edu.rs</a></p>
      </div>
    </div>`;
}

async function sendVerificationEmail(firstName, email, token) {
  const link = `${BASE}/#verify?token=${token}`;
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: 'Potvrdite email adresu – AI Starter Pack',
      html: emailWrapper(`
        <h1 style="font-size:26px;font-weight:800;color:#1a1a1a;margin-bottom:12px">Zdravo, ${firstName}! 👋</h1>
        <p style="font-size:16px;color:#6b6b72;line-height:1.7;margin-bottom:8px">Hvala na registraciji! Samo još jedan korak — potvrdi email adresu da bismo aktivirali tvoj nalog.</p>
        <p style="font-size:14px;color:#ababb2;margin-bottom:28px">Link važi 24 sata.</p>
        <a href="${link}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Potvrdi email adresu →</a>
        <p style="font-size:13px;color:#ababb2;margin-top:28px">Ako nisi registrovao/la nalog na AI Starter Pack, ignoriši ovaj email.</p>`)
    });
    console.log('Verification email sent to', email);
  } catch(e) { console.error('Email error:', e.message); }
}

async function sendWelcomeEmail(firstName, email) {
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: 'Dobrodošao/la na AI Starter Pack! 🎓',
      html: emailWrapper(`
        <h1 style="font-size:26px;font-weight:800;color:#1a1a1a;margin-bottom:12px">Nalog je potvrđen! 🎉</h1>
        <p style="font-size:16px;color:#6b6b72;line-height:1.7;margin-bottom:24px">Dobrodošao/la, <strong style="color:#1a1a1a">${firstName}</strong>! Tvoj nalog je aktiviran i možeš početi sa učenjem.</p>
        <div style="background:#f5f5f7;border-radius:12px;padding:24px;margin-bottom:28px">
          <p style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#ababb2;margin-bottom:14px">Šta te čeka:</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="font-size:14px;color:#3a3a3a">🟣 7 modula o veštačkoj inteligenciji</div>
            <div style="font-size:14px;color:#3a3a3a">⚡ Praktični AI alati odmah primenjivi</div>
            <div style="font-size:14px;color:#3a3a3a">🎓 Digitalni sertifikat + 2 ECTS boda</div>
            <div style="font-size:14px;color:#3a3a3a">🏆 100€ popust za ITS/ITHS upis</div>
          </div>
        </div>
        <a href="${BASE}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Počni kurs →</a>`)
    });
    console.log('Welcome email sent to', email);
  } catch(e) { console.error('Email error:', e.message); }
}

async function sendQuizResultEmail(firstName, email, moduleId, moduleName, score, passed, correct, total) {
  const pct = Math.round(score * 100);
  const color = passed ? '#16a34a' : '#E8192C';
  const emoji = passed ? '🎉' : '📚';
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: `${emoji} Rezultat kviza – Modul ${moduleId}: ${pct}%`,
      html: emailWrapper(`
        <h1 style="font-size:26px;font-weight:800;color:#1a1a1a;margin-bottom:12px">${emoji} Rezultat kviza</h1>
        <p style="font-size:16px;color:#6b6b72;margin-bottom:24px">Modul ${moduleId}: <strong style="color:#1a1a1a">${moduleName}</strong></p>
        <div style="text-align:center;padding:32px;background:#f5f5f7;border-radius:16px;margin-bottom:28px">
          <div style="font-size:64px;font-weight:800;color:${color};letter-spacing:-.04em;line-height:1">${pct}%</div>
          <div style="font-size:16px;color:#6b6b72;margin-top:8px">${correct} od ${total} tačnih odgovora</div>
          <div style="margin-top:16px;display:inline-block;padding:8px 20px;border-radius:980px;background:${passed ? 'rgba(22,163,74,.1)' : 'rgba(232,25,44,.1)'};color:${color};font-weight:700;font-size:14px">${passed ? '✓ Položen' : '✗ Nije položen – potrebno 40%'}</div>
        </div>
        ${passed
          ? `<p style="font-size:15px;color:#6b6b72;line-height:1.7;margin-bottom:24px">Odlično! Nastavi na sledeći modul.</p><a href="${BASE}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Nastavi kurs →</a>`
          : `<p style="font-size:15px;color:#6b6b72;line-height:1.7;margin-bottom:24px">Ne brini — možeš ponovo proći lekcije i pokušati kviz kad god budeš spreman/na.</p><a href="${BASE}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Ponovi lekcije →</a>`}`)
    });
    console.log('Quiz result email sent to', email);
  } catch(e) { console.error('Email error:', e.message); }
}

async function sendInactivityEmail(firstName, email, days, completedModules) {
  const isLong = days >= 30;
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: isLong ? `${firstName}, još si tu? 👀` : `Nastavi tamo gde si stao/la 💪`,
      html: emailWrapper(`
        <h1 style="font-size:26px;font-weight:800;color:#1a1a1a;margin-bottom:12px">${isLong ? '👀 Nedostaje nam!' : '💪 Nastavi!'}</h1>
        <p style="font-size:16px;color:#6b6b72;line-height:1.7;margin-bottom:24px">
          ${isLong
            ? `Prošlo je <strong>${days} dana</strong> od poslednjeg poseta. Tvoj napredak te čeka — <strong>${completedModules}/7 modula</strong> završeno.`
            : `Nismo te videli <strong>${days} dana</strong>. Imaš završeno <strong>${completedModules}/7 modula</strong> — samo nastavi!`}
        </p>
        <div style="background:#f5f5f7;border-radius:12px;padding:20px 24px;margin-bottom:28px">
          <div style="font-size:14px;color:#3a3a3a;margin-bottom:8px">📊 Tvoj napredak: <strong>${completedModules}/7 modula</strong></div>
          <div style="height:8px;background:#e2e2e7;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${Math.round(completedModules/7*100)}%;background:#E8192C;border-radius:4px"></div>
          </div>
        </div>
        <a href="${BASE}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Nastavi kurs →</a>
        <p style="font-size:12px;color:#ababb2;margin-top:24px">Ne želiš više ove podsetnike? <a href="mailto:upis@its.edu.rs" style="color:#E8192C">Javi nam se</a>.</p>`)
    });
    console.log(`Inactivity email (${days}d) sent to`, email);
  } catch(e) { console.error('Email error:', e.message); }
}

async function sendCertificateEmail(firstName, lastName, email) {
  try {
    await resend.emails.send({
      from: FROM, to: email,
      subject: '🎓 Čestitamo! Tvoj AI Starter Pack sertifikat je spreman!',
      html: emailWrapper(`
        <div style="text-align:center;margin-bottom:32px">
          <div style="font-size:56px;margin-bottom:16px">🎉</div>
          <h1 style="font-size:28px;font-weight:800;color:#1a1a1a;margin-bottom:8px">Čestitamo, ${firstName}!</h1>
          <p style="font-size:16px;color:#6b6b72">Uspešno si završio/la AI Starter Pack kurs!</p>
        </div>
        <div style="background:#06080f;border-radius:16px;padding:32px;margin-bottom:28px;text-align:center">
          <p style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">Sertifikat o završetku</p>
          <p style="font-size:22px;font-weight:800;color:#fff;margin-bottom:8px">AI Starter Pack</p>
          <p style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:8px">Dodeljuje se</p>
          <p style="font-size:28px;font-weight:800;color:#E8192C;margin-bottom:20px">${firstName} ${lastName}</p>
          <div style="display:flex;gap:10px;justify-content:center">
            <span style="background:#E8192C;color:#fff;padding:8px 20px;border-radius:980px;font-size:12px;font-weight:700">2 ECTS boda</span>
            <span style="background:#E8192C;color:#fff;padding:8px 20px;border-radius:980px;font-size:12px;font-weight:700">100€ popust</span>
          </div>
        </div>
        <div style="text-align:center">
          <a href="${BASE}" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Preuzmi sertifikat →</a>
        </div>`)
    });
    console.log('Certificate email sent to', email);
  } catch(e) { console.error('Email error:', e.message); }
}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendQuizResultEmail, sendInactivityEmail, sendCertificateEmail };
