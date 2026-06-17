import { createServerFn } from '@tanstack/react-start';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(200, 'Name is too long')
    .trim(),
  email: z.string().email('Please enter a valid email address').trim(),
  interest: z.string().optional(),
  message: z.string().max(2000, 'Message is too long').trim().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').trim(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// NOTE: In-memory only — resets on every server restart / cold start.
// For production, replace with a shared store (Redis/DB) and add IP-based
// rate limiting from request headers (see TanStack Start server function docs).
const subscribedEmails = new Set<string>();
const submissionTimestamps = new Map<string, number>();

function isRateLimited(identifier: string, limitMs = 5000) {
  const now = Date.now();
  const last = submissionTimestamps.get(identifier) ?? 0;
  if (now - last < limitMs) return true;
  submissionTimestamps.set(identifier, now);
  return false;
}

export function sanitize(text: string) {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} }).trim();
}

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactFormData) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isRateLimited(data.email)) {
      return {
        success: false,
        message:
          'Too many requests. Please wait a few seconds before trying again.',
      };
    }

    const sanitizedData = {
      ...data,
      name: sanitize(data.name),
      message: data.message ? sanitize(data.message) : undefined,
    };

    // TODO: Phase B — integrate with Resend/SendGrid for email notification
    // TODO: Phase D — persist to database via Prisma + NeonDB
    // biome-ignore lint/suspicious/noConsole: intentional dev log — replace with email service in Phase B
    console.log('[Form Submission] Contact:', {
      ...sanitizedData,
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
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = data.email.toLowerCase().trim();

    if (isRateLimited(email)) {
      return {
        success: false,
        message: 'Please wait before subscribing again.',
      };
    }

    if (subscribedEmails.has(email)) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter.',
      };
    }

    subscribedEmails.add(email);

    // biome-ignore lint/suspicious/noConsole: intentional dev log — replace with email service in Phase B
    console.log('[Newsletter] New subscriber:', {
      email,
      total: subscribedEmails.size,
      timestamp: new Date().toISOString(),
    });

    return {
      success: true,
      message:
        'You have been subscribed to our newsletter. Welcome to Shaon Landmarks.',
    };
  });
