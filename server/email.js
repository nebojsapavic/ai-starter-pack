const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(firstName, email) {
  try {
    await resend.emails.send({
      from: 'AI Starter Pack <onboarding@resend.dev>',
      to: email,
      subject: 'Dobrodošao/la na AI Starter Pack! 🎓',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:40px;border-radius:8px">
          <img src="https://ai-starter-pack-production.up.railway.app/img/logo.svg" style="height:40px;margin-bottom:32px">
          <h1 style="color:#E30613;font-size:28px;margin-bottom:16px">Zdravo, ${firstName}! 👋</h1>
          <p style="color:#aaa;line-height:1.7;margin-bottom:24px">
            Dobrodošao/la na <strong style="color:#fff">AI Starter Pack</strong> – besplatan online kurs o veštačkoj inteligenciji kroz 7 modula.
          </p>
          <p style="color:#aaa;line-height:1.7;margin-bottom:32px">
            Možeš odmah da počneš sa učenjem. Kurs je dostupan na svim uređajima, tempom koji ti odgovara.
          </p>
          <a href="https://ai-starter-pack-production.up.railway.app" 
             style="background:#E30613;color:#fff;padding:14px 32px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin-bottom:32px">
            Počni kurs →
          </a>
          <hr style="border-color:#222;margin-bottom:24px">
          <p style="color:#555;font-size:12px">
            AI Starter Pack · ITS · ITHS · Savez za AI Srbije
          </p>
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
      from: 'AI Starter Pack <onboarding@resend.dev>',
      to: email,
      subject: '🎓 Čestitamo! Tvoj AI Starter Pack sertifikat je spreman!',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:40px;border-radius:8px">
          <img src="https://ai-starter-pack-production.up.railway.app/img/logo.svg" style="height:40px;margin-bottom:32px">
          <h1 style="color:#22c55e;font-size:28px;margin-bottom:16px">Čestitamo, ${firstName}! 🎉</h1>
          <p style="color:#aaa;line-height:1.7;margin-bottom:24px">
            Uspešno si završio/la kurs <strong style="color:#fff">AI Starter Pack</strong> i položio/la sve kvizove!
          </p>
          <div style="background:#111;border:1px solid #E30613;padding:24px;border-radius:8px;margin-bottom:32px;text-align:center">
            <p style="color:#888;font-size:12px;letter-spacing:3px;text-transform:uppercase;margin-bottom:8px">Sertifikat dodeljuje se</p>
            <h2 style="color:#E30613;font-size:32px;margin-bottom:16px">${firstName} ${lastName}</h2>
            <p style="color:#aaa;margin-bottom:16px">za uspešno završen kurs AI Starter Pack</p>
            <div style="display:inline-flex;gap:12px">
              <span style="background:#E30613;padding:8px 20px;font-size:12px;font-weight:bold">2 ECTS Boda</span>
              <span style="background:#E30613;padding:8px 20px;font-size:12px;font-weight:bold">100€ Popust</span>
            </div>
          </div>
          <a href="https://ai-starter-pack-production.up.railway.app" 
             style="background:#22c55e;color:#000;padding:14px 32px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin-bottom:32px">
            Preuzmi sertifikat →
          </a>
          <hr style="border-color:#222;margin-bottom:24px">
          <p style="color:#555;font-size:12px">AI Starter Pack · ITS · ITHS · Savez za AI Srbije</p>
        </div>
      `
    });
    console.log('Certificate email sent to', email);
  } catch(e) {
    console.error('Email error:', e);
  }
}

module.exports = { sendWelcomeEmail, sendCertificateEmail };
