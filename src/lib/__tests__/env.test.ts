import { describe, expect, it } from 'bun:test';
import {
  getSmtpConfig,
  NOTIFICATION_EMAIL,
  SITE_URL,
  WHATSAPP_MSG,
  WHATSAPP_NUMBER,
} from '@/lib/env';

describe('env', () => {
  it('SITE_URL defaults to production URL', () => {
    expect(SITE_URL).toBe('https://shaonlandmarks.vercel.app');
  });

  it('WHATSAPP_NUMBER has a default', () => {
    expect(WHATSAPP_NUMBER).toBeString();
    expect(WHATSAPP_NUMBER).toStartWith('+88');
  });

  it('WHATSAPP_MSG is URL-encoded', () => {
    expect(WHATSAPP_MSG).toBeString();
    expect(WHATSAPP_MSG).toContain('Hello');
  });

  it('NOTIFICATION_EMAIL defaults to empty', () => {
    expect(NOTIFICATION_EMAIL).toBeString();
    expect(NOTIFICATION_EMAIL).toBeEmpty();
  });

  it('getSmtpConfig returns null when env vars are not set', () => {
    expect(getSmtpConfig()).toBeNull();
  });

  it('getSmtpConfig is memoized', () => {
    const first = getSmtpConfig();
    const second = getSmtpConfig();
    expect(first).toBe(second);
  });
});
