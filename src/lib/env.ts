import { z } from 'zod';

let smtpConfig: {
  host: string;
  port: number;
  user: string;
  pass: string;
} | null = null;
let validated = false;

export function getSmtpConfig(): {
  host: string;
  port: number;
  user: string;
  pass: string;
} | null {
  if (validated) return smtpConfig;
  validated = true;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER && !SMTP_HOST) {
    return null;
  }

  const result = z
    .object({
      host: z.string().min(1, 'SMTP_HOST required when SMTP_USER is set'),
      user: z.string().min(1, 'SMTP_USER is required'),
      pass: z.string().min(1, 'SMTP_PASS required when SMTP_USER is set'),
    })
    .safeParse({ host: SMTP_HOST, user: SMTP_USER, pass: SMTP_PASS });

  if (!result.success) {
    // biome-ignore lint/suspicious/noConsole: intentional — warn on server-side SMTP misconfiguration
    console.warn(
      '[env] SMTP validation failed:',
      result.error.format()._errors.join(', '),
    );
    return null;
  }

  smtpConfig = {
    host: result.data.host,
    port: Number(SMTP_PORT) || 587,
    user: result.data.user,
    pass: result.data.pass,
  };

  return smtpConfig;
}

export const SITE_URL =
  (typeof process !== 'undefined' ? process.env.SITE_URL : null) ??
  'https://shaonlandmarks.vercel.app';
export const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER ?? '+8801712345678';
export const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I'm interested in Shaon Landmarks & Housing properties.",
);

export const NOTIFICATION_EMAIL =
  (typeof process !== 'undefined' ? process.env.NOTIFICATION_EMAIL : null) ??
  '';
