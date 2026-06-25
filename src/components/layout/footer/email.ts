const logPrefix = '[Shaon Email]';

export async function sendContactNotification(data: {
  name: string;
  email: string;
  interest?: string;
  message?: string;
}): Promise<void> {
  // biome-ignore lint/suspicious/noConsole: placeholder until SMTP configured
  console.log(logPrefix, 'Contact notification:', {
    ...data,
    time: new Date().toISOString(),
  });
}

export async function sendNewsletterWelcome(email: string): Promise<void> {
  // biome-ignore lint/suspicious/noConsole: placeholder until SMTP configured
  console.log(logPrefix, 'Newsletter welcome:', {
    email,
    time: new Date().toISOString(),
  });
}
