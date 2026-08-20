import nodemailer from 'nodemailer';

// Helper for sending emails using nodemailer
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const smtpUser = process.env.SMTP_EMAIL;
  const smtpPass = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    console.warn('SMTP_EMAIL or SMTP_PASSWORD is not set. Email not sent.');
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Sistem Notifikasi Pengaduan" <${smtpUser}>`,
      to: Array.isArray(to) ? to.join(', ') : to,
      replyTo: replyTo || smtpUser,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
