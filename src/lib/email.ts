import nodemailer from 'nodemailer';
import { getSmtpConfig, NOTIFICATION_EMAIL } from '@/lib/env';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  const cfg = getSmtpConfig();
  if (cfg) {
    transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: false,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    return transporter;
  }
  return null;
}

function getSenderEmail(): string {
  return getSmtpConfig()?.user ?? 'noreply@shaonlandmarks.com';
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  interest?: string;
  message?: string;
}): Promise<void> {
  const tr = getTransporter();
  if (!tr || !NOTIFICATION_EMAIL) return;

  try {
    await tr.sendMail({
      from: `"Shaon Landmarks" <${getSenderEmail()}>`,
      to: NOTIFICATION_EMAIL,
      subject: `New Contact Inquiry — ${data.name}`,
      text: [
        `New inquiry from ${data.name} (${data.email})`,
        `Interest: ${data.interest ?? 'Not specified'}`,
        `Message: ${data.message ?? '(none)'}`,
        `Time: ${new Date().toISOString()}`,
      ].join('\n'),
    });
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: intentional — log server-side email failures silently
    console.error('[Email] Failed to send contact notification:', err);
  }
}

export async function sendNewsletterWelcome(email: string): Promise<void> {
  const tr = getTransporter();
  if (!tr) return;

  try {
    await tr.sendMail({
      from: `"Shaon Landmarks" <${getSenderEmail()}>`,
      to: email,
      subject: 'Welcome to Shaon Landmarks',
      text: [
        `Hi ${email},`,
        '',
        'Thank you for subscribing to Shaon Landmarks & Housing updates.',
        'You will receive curated insights on premium real estate in Bangladesh.',
        '',
        '— Shaon Landmarks Team',
      ].join('\n'),
    });
  } catch (err) {
    // biome-ignore lint/suspicious/noConsole: intentional — log server-side email failures silently
    console.error('[Email] Failed to send newsletter welcome:', err);
  }
}
