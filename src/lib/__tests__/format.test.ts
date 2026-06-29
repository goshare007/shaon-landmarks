import { describe, expect, it } from 'bun:test';
import { formatCurrency } from '@/lib/format';
import { cn } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats number in INR locale with BDT currency', () => {
    expect(formatCurrency(5000000)).toBe('BDT\u00a050,00,000');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('BDT\u00a00');
  });

  it('formats small numbers', () => {
    expect(formatCurrency(500)).toBe('BDT\u00a0500');
  });
});

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('handles twMerge overrides', () => {
    expect(cn('px-4', 'px-6')).toBe('px-6');
  });

  it('returns empty string for no inputs', () => {
    expect(cn()).toBe('');
  });

  it('handles clsx array input', () => {
    expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });
});
