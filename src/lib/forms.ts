import { createCsrfMiddleware, createServerFn } from '@tanstack/react-start';
import { getRequestIP } from '@tanstack/react-start/server';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import { sendContactNotification, sendNewsletterWelcome } from '@/lib/email';

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
// For production, replace with a shared store (Redis/DB).
const subscribedEmails = new Set<string>();
const submissionTimestamps = new Map<string, number>();

const csrfMiddleware = createCsrfMiddleware();

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
  .middleware([csrfMiddleware])
  .inputValidator((data: ContactFormData) => contactFormSchema.parse(data))
  .handler(async ({ data }) => {
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const ip = getRequestIP({ xForwardedFor: true });
    if (ip && isRateLimited(`ip:${ip}`)) {
      return {
        success: false,
        message:
          'Too many requests. Please wait a few seconds before trying again.',
      };
    }

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

    if (sanitizedData.name.length < 2) {
      return {
        success: false,
        message: 'Name must be at least 2 characters.',
      };
    }

    sendContactNotification(sanitizedData);

    return {
      success: true,
      message:
        'Thank you for your inquiry. A senior consultant will reach out within 24 business hours.',
    };
  });

export const submitNewsletterSignup = createServerFn({ method: 'POST' })
  .middleware([csrfMiddleware])
  .inputValidator((data: { email: string }) => newsletterSchema.parse(data))
  .handler(async ({ data }) => {
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const email = data.email.toLowerCase().trim();

    const ip = getRequestIP({ xForwardedFor: true });
    if (ip && isRateLimited(`ip:${ip}`)) {
      return {
        success: false,
        message: 'Please wait before subscribing again.',
      };
    }

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

    sendNewsletterWelcome(email);

    return {
      success: true,
      message:
        'You have been subscribed to our newsletter. Welcome to Shaon Landmarks.',
    };
  });
