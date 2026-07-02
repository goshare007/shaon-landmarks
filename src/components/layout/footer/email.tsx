const logPrefix = '[Shaon Email]';

export async function sendNewsletterWelcome(email: string): Promise<void> {
  if (process.env.NODE_ENV !== 'production') {
    console.log(logPrefix, 'Newsletter welcome:', {
      email,
      time: new Date().toISOString(),
    });
  }
}
