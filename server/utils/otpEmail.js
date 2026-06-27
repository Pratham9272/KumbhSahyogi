const nodemailer = require('nodemailer');

function getSenderUser() {
  return process.env.SMTP_USER || process.env.EMAIL_USER || '';
}

function getSenderPass() {
  return (process.env.SMTP_PASS || process.env.EMAIL_PASS || '').replace(/\s/g, '');
}

function getSmtpHost() {
  if (process.env.SMTP_HOST) return process.env.SMTP_HOST;
  const senderUser = getSenderUser();
  if (senderUser.endsWith('@gmail.com')) return 'smtp.gmail.com';
  return '';
}

function isMailConfigured() {
  return Boolean(getSmtpHost() && getSenderUser() && getSenderPass());
}

function createTransporter() {
  return nodemailer.createTransport({
    host: getSmtpHost(),
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true',
    auth: {
      user: getSenderUser(),
      pass: getSenderPass()
    }
  });
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function sendSignupOtpEmail(email, otp) {
  if (!isMailConfigured()) {
    console.warn(`[OTP] SMTP not configured. Signup OTP for ${email}: ${otp}`);
    return { sent: false, devLogged: true };
  }

  const from = process.env.MAIL_FROM || getSenderUser();
  const transporter = createTransporter();

  await transporter.sendMail({
    from,
    to: email,
    subject: 'Your KumbhSahyogi verification code',
    text: `Your verification code is ${otp}. It is valid for 10 minutes.\n\nKumbhSahyogi Team`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;max-width:480px;">
        <h2 style="color:#ea580c;margin-bottom:8px;">Verify your email</h2>
        <p>Use this code to complete your KumbhSahyogi signup:</p>
        <p style="font-size:32px;font-weight:bold;letter-spacing:8px;color:#ea580c;margin:24px 0;">${otp}</p>
        <p style="color:#6b7280;">This code expires in 10 minutes. If you did not request this, you can ignore this email.</p>
        <p>KumbhSahyogi Team</p>
      </div>
    `
  });

  return { sent: true };
}

module.exports = {
  generateOtp,
  sendSignupOtpEmail,
  isMailConfigured
};
