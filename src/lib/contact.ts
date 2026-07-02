import { createServerFn } from '@tanstack/react-start';
import { getSmtpConfig, NOTIFICATION_EMAIL } from '@/lib/env';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

export const submitContact = createServerFn({ method: 'POST' })
  .validator((data: unknown) => data as ContactFormData)
  .handler(async ({ data }) => {
    const { name, email, phone, interest, message } = data;

    const smtp = getSmtpConfig();
    const to = NOTIFICATION_EMAIL || smtp?.user;

    if (!smtp || !to) {
      console.info('[contact] No SMTP configured — contact form submitted:', {
        name,
        email,
        phone,
        interest,
        message,
      });
      return { success: true };
    }

    try {
      const { createTransport } = await import('nodemailer');
      const transporter = createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.port === 465,
        auth: { user: smtp.user, pass: smtp.pass },
      });
      await transporter.sendMail({
        from: smtp.user,
        to,
        subject: `New Contact Form Submission from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Phone: ${phone || 'N/A'}`,
          `Interest: ${interest}`,
          `Message: ${message}`,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[contact] Failed to send email:', err);
    }

    return { success: true };
  });
