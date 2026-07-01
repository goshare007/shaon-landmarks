const logPrefix = '[Shaon Email]';

export async function sendNewsletterWelcome(email: string): Promise<void> {
  // biome-ignore lint/suspicious/noConsole: placeholder until SMTP configured
  console.log(logPrefix, 'Newsletter welcome:', {
    email,
    time: new Date().toISOString(),
  });
}
