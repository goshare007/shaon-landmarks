import { sendWithEmailJS } from '@/lib/email';
import { EMAILJS_NEWSLETTER_TEMPLATE_ID } from '@/lib/env';

export async function sendNewsletterWelcome(email: string): Promise<void> {
  await sendWithEmailJS(
    EMAILJS_NEWSLETTER_TEMPLATE_ID,
    {
      from_email: email,
      time: new Date().toISOString(),
    },
    'newsletter',
  );
}
