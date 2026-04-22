const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'AI Starter Pack <noreply@ai-starterpack.edu.rs>';

async function sendWelcomeEmail(firstName, email) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: 'Dobrodošao/la na AI Starter Pack! 🎓',
      html: `
        <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e2e7;border-radius:16px;overflow:hidden">
          <div style="background:#06080f;padding:32px 40px;text-align:center">
            <img src="https://www.ai-starterpack.edu.rs/img/logo.svg" height="32" style="height:32px">
          </div>
          <div style="padding:40px">
            <h1 style="font-size:26px;font-weight:800;letter-spacing:-.03em;color:#1a1a1a;margin-bottom:12px">Zdravo, ${firstName}! 👋</h1>
            <p style="font-size:16px;color:#6b6b72;line-height:1.7;margin-bottom:28px">
              Dobrodošao/la na <strong style="color:#1a1a1a">AI Starter Pack</strong> – besplatan online kurs o veštačkoj inteligenciji kroz 7 modula.
            </p>
            <div style="background:#f5f5f7;border-radius:12px;padding:24px;margin-bottom:28px">
              <p style="font-size:14px;color:#6b6b72;margin-bottom:16px;font-weight:600;text-transform:uppercase;letter-spacing:.05em">Šta te čeka:</p>
              <div style="display:grid;gap:10px">
                ${['🟣 7 modula o veštačkoj inteligenciji','⚡ Praktični AI alati odmah primenjivi','🎓 Digitalni sertifikat + 2 ECTS boda','🏆 100€ popust za ITS/ITHS upis'].map(item => `<div style="font-size:14px;color:#3a3a3a">${item}</div>`).join('')}
              </div>
            </div>
            <a href="https://www.ai-starterpack.edu.rs" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Počni kurs →</a>
            <p style="font-size:13px;color:#ababb2;margin-top:28px;line-height:1.6">
              Imaš pitanje? Piši nam na <a href="mailto:upis@its.edu.rs" style="color:#E8192C">upis@its.edu.rs</a>
            </p>
          </div>
          <div style="background:#f5f5f7;padding:20px 40px;border-top:1px solid #e2e2e7;text-align:center">
            <p style="font-size:12px;color:#ababb2">AI Starter Pack · ITS · ITHS · Savez za AI Srbije</p>
          </div>
        </div>
      `
    });
    console.log('Welcome email sent to', email);
  } catch(e) {
    console.error('Email error:', e);
  }
}

async function sendCertificateEmail(firstName, lastName, email) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: '🎓 Čestitamo! Tvoj AI Starter Pack sertifikat je spreman!',
      html: `
        <div style="font-family:'Plus Jakarta Sans',Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff;border:1px solid #e2e2e7;border-radius:16px;overflow:hidden">
          <div style="background:#06080f;padding:32px 40px;text-align:center">
            <img src="https://www.ai-starterpack.edu.rs/img/logo.svg" height="32" style="height:32px">
          </div>
          <div style="padding:40px">
            <div style="text-align:center;margin-bottom:32px">
              <div style="font-size:56px;margin-bottom:16px">🎉</div>
              <h1 style="font-size:28px;font-weight:800;letter-spacing:-.03em;color:#1a1a1a;margin-bottom:8px">Čestitamo, ${firstName}!</h1>
              <p style="font-size:16px;color:#6b6b72">Uspešno si završio/la AI Starter Pack kurs!</p>
            </div>
            <div style="background:#06080f;border-radius:16px;padding:32px;margin-bottom:28px;text-align:center">
              <p style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">Sertifikat o završetku</p>
              <p style="font-size:24px;font-weight:800;color:#fff;margin-bottom:8px">AI Starter Pack</p>
              <p style="font-size:13px;color:rgba(255,255,255,.4);margin-bottom:8px">Dodeljuje se</p>
              <p style="font-size:28px;font-weight:800;color:#E8192C;margin-bottom:20px">${firstName} ${lastName}</p>
              <div style="display:inline-flex;gap:12px">
                <span style="background:#E8192C;color:#fff;padding:8px 20px;border-radius:980px;font-size:12px;font-weight:700">2 ECTS boda</span>
                <span style="background:#E8192C;color:#fff;padding:8px 20px;border-radius:980px;font-size:12px;font-weight:700">100€ popust</span>
              </div>
            </div>
            <div style="text-align:center">
              <a href="https://www.ai-starterpack.edu.rs" style="display:inline-block;background:#E8192C;color:#fff;padding:14px 32px;border-radius:980px;text-decoration:none;font-weight:700;font-size:15px">Preuzmi sertifikat →</a>
            </div>
            <p style="font-size:13px;color:#ababb2;margin-top:28px;line-height:1.6;text-align:center">
              Pitanja? <a href="mailto:upis@its.edu.rs" style="color:#E8192C">upis@its.edu.rs</a>
            </p>
          </div>
          <div style="background:#f5f5f7;padding:20px 40px;border-top:1px solid #e2e2e7;text-align:center">
            <p style="font-size:12px;color:#ababb2">AI Starter Pack · ITS · ITHS · Savez za AI Srbije</p>
          </div>
        </div>
      `
    });
    console.log('Certificate email sent to', email);
  } catch(e) {
    console.error('Email error:', e);
  }
}

module.exports = { sendWelcomeEmail, sendCertificateEmail };
