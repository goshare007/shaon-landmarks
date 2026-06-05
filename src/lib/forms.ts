import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  interest: z.string().optional(),
  message: z.string().optional(),
});

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactFormData) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    // TODO: Phase B — integrate with Resend/SendGrid for email notification
    // TODO: Phase D — persist to database via Prisma + NeonDB
    // biome-ignore lint/suspicious/noConsole: this is fine
    console.log('[Form Submission] Contact:', {
      ...data,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message:
        'Thank you for your inquiry. A senior consultant will reach out within 24 business hours.',
    };
  });

export const submitNewsletterSignup = createServerFn({ method: 'POST' })
  .inputValidator((data: { email: string }) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    // biome-ignore lint/suspicious/noConsole: this is fine
    console.log('[Form Submission] Newsletter:', {
      email: data.email,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message:
        'You have been subscribed to our newsletter. Welcome to Shaon Landmarks.',
    };
  });
