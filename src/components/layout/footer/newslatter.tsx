import { sendNewsletterWelcome } from './email';

interface SubmitResult {
  success: boolean;
  message: string;
}

export async function submitNewsletterSignup(input: {
  data: { email: string };
}): Promise<SubmitResult> {
  const { email } = input.data;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  try {
    await sendNewsletterWelcome(email);
    return {
      success: true,
      message:
        'Welcome! Stay tuned for the latest updates from Shaon Landmarks.',
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : 'Something went wrong. Please try again.';
    return { success: false, message: errorMessage };
  }
}
