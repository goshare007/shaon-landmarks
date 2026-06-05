import { describe, expect, it } from 'vitest';
import { DEFAULT_OG_IMAGE, generateMeta } from './seo';

describe('generateMeta', () => {
  it('returns default metadata when no props are provided', () => {
    const result = generateMeta({});
    const title = result.meta.find((m) => 'title' in m)?.title;
    expect(title).toBe(
      'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh',
    );
  });

  it('applies custom title correctly', () => {
    const result = generateMeta({ title: 'About Us' });
    const title = result.meta.find((m) => 'title' in m)?.title;
    expect(title).toBe('About Us — Shaon Landmarks & Housing');
  });

  it('uses custom image when provided', () => {
    const customImage = '/path/to/image.jpg';
    const result = generateMeta({ image: customImage });
    const ogImage = result.meta.find(
      (m) => 'property' in m && m.property === 'og:image',
    )?.content;
    expect(ogImage).toBe(customImage);
  });

  it('falls back to default og image', () => {
    const result = generateMeta({});
    const ogImage = result.meta.find(
      (m) => 'property' in m && m.property === 'og:image',
    )?.content;
    expect(ogImage).toBe(DEFAULT_OG_IMAGE);
  });
});
