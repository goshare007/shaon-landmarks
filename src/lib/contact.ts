import { sendWithEmailJS } from '@/lib/email';
import { EMAILJS_TEMPLATE_ID } from '@/lib/env';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export async function submitContact(data: ContactFormData) {
  const { name, email, phone, interest, message } = data;

  await sendWithEmailJS(
    EMAILJS_TEMPLATE_ID,
    {
      from_name: name,
      from_email: email,
      phone: phone || 'N/A',
      interest,
      message,
    },
    'contact',
  );
}
