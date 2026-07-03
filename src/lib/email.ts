import emailjs from '@emailjs/browser';
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID } from '@/lib/env';

export async function sendWithEmailJS(
  templateId: string,
  params: Record<string, unknown>,
  label: string,
) {
  if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !templateId) {
    // biome-ignore lint/suspicious/noConsole: this is fine
    console.info(`[${label}] EmailJS not configured — data:`, params);
    return;
  }

  emailjs.init(EMAILJS_PUBLIC_KEY);

  await emailjs.send(EMAILJS_SERVICE_ID, templateId, params);
}
