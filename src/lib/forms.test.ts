import { describe, expect, it } from 'bun:test';
import { contactFormSchema, newsletterSchema, sanitize } from '@/lib/forms';

describe('contactFormSchema', () => {
  it('accepts valid contact data', () => {
    const result = contactFormSchema.parse({
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(result.name).toBe('John Doe');
    expect(result.email).toBe('john@example.com');
  });

  it('rejects short name', () => {
    expect(() =>
      contactFormSchema.parse({ name: 'J', email: 'john@example.com' }),
    ).toThrow('Name must be at least 2 characters');
  });

  it('rejects invalid email', () => {
    expect(() =>
      contactFormSchema.parse({ name: 'John', email: 'not-an-email' }),
    ).toThrow('Please enter a valid email address');
  });

  it('accepts optional message within limit', () => {
    const result = contactFormSchema.parse({
      name: 'John',
      email: 'john@example.com',
      message: 'Hello, I am interested in a property.',
    });
    expect(result.message).toBe('Hello, I am interested in a property.');
  });

  it('rejects message exceeding max length', () => {
    expect(() =>
      contactFormSchema.parse({
        name: 'John',
        email: 'john@example.com',
        message: 'x'.repeat(2001),
      }),
    ).toThrow('Message is too long');
  });

  it('trims whitespace from name', () => {
    const result = contactFormSchema.parse({
      name: '  John Doe  ',
      email: 'john@example.com',
    });
    expect(result.name).toBe('John Doe');
  });
});

describe('newsletterSchema', () => {
  it('accepts valid email', () => {
    const result = newsletterSchema.parse({ email: 'sub@example.com' });
    expect(result.email).toBe('sub@example.com');
  });

  it('rejects invalid email', () => {
    expect(() => newsletterSchema.parse({ email: 'bad' })).toThrow(
      'Please enter a valid email address',
    );
  });
});

describe('sanitize', () => {
  it('strips basic HTML tags', () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('');
  });

  it('strips tags with attributes', () => {
    expect(sanitize('<a href="http://evil.com">click</a>')).toBe('click');
  });

  it('strips bypass attempts without closing >', () => {
    expect(sanitize('<img src=x onerror=alert(1)>')).toBe('');
  });

  it('preserves safe text', () => {
    expect(sanitize('Hello, this is safe text!')).toBe(
      'Hello, this is safe text!',
    );
  });
});
