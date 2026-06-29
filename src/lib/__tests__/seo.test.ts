import { describe, expect, it } from 'bun:test';
import {
  articleLd,
  breadcrumbLd,
  generateMeta,
  productLd,
  webpageLd,
} from '@/lib/seo';

describe('generateMeta', () => {
  it('returns default title when no pageTitle given', () => {
    const result = generateMeta({});
    const titleTag = result.meta.find((m) => 'title' in m);
    expect(titleTag?.title).toBe(
      'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh',
    );
  });

  it('prepends pageTitle to brand name', () => {
    const result = generateMeta({ title: 'About Us' });
    const titleTag = result.meta.find((m) => 'title' in m);
    expect(titleTag?.title).toBe('About Us — Shaon Landmarks & Housing');
  });

  it('uses default description when none given', () => {
    const result = generateMeta({});
    const descTag = result.meta.find((m) => m.name === 'description');
    expect(descTag?.content).toBeString();
  });

  it('sets og:url from path', () => {
    const result = generateMeta({ path: '/about' });
    const ogUrl = result.meta.find((m) => m.property === 'og:url');
    expect(ogUrl?.content).toEndWith('/about');
  });

  it('sets og:type to article when provided', () => {
    const result = generateMeta({ type: 'article' });
    const ogType = result.meta.find((m) => m.property === 'og:type');
    expect(ogType?.content).toBe('article');
  });

  it('sets twitter card meta', () => {
    const result = generateMeta({});
    const twitterCard = result.meta.find((m) => m.name === 'twitter:card');
    expect(twitterCard?.content).toBe('summary_large_image');
  });
});

describe('breadcrumbLd', () => {
  it('returns breadcrumb list with items', () => {
    const items = [
      { name: 'Home', url: 'https://example.com' },
      { name: 'About', url: 'https://example.com/about' },
    ];
    const result = breadcrumbLd(items);
    expect(result['@type']).toBe('BreadcrumbList');
    expect(result.itemListElement).toHaveLength(2);
    expect(result.itemListElement[0].position).toBe(1);
    expect(result.itemListElement[1].position).toBe(2);
    expect(result.itemListElement[0].name).toBe('Home');
  });

  it('handles single item', () => {
    const result = breadcrumbLd([{ name: 'Home', url: 'https://example.com' }]);
    expect(result.itemListElement).toHaveLength(1);
  });
});

describe('productLd', () => {
  it('returns RealEstateListing schema', () => {
    const result = productLd({
      name: 'Test Project',
      description: 'A test',
      image: '/test.jpg',
      url: 'https://example.com/test',
      status: 'Ongoing',
      location: 'Dhaka',
      area: '5 katha',
      units: '24',
    });
    expect(result['@type']).toBe('RealEstateListing');
    expect(result.name).toBe('Test Project');
    expect(result.additionalProperty).toHaveLength(4);
  });
});

describe('webpageLd', () => {
  it('returns WebPage schema with breadcrumb', () => {
    const result = webpageLd({
      name: 'About Us',
      description: 'About page',
      url: 'https://example.com/about',
    });
    expect(result['@type']).toBe('WebPage');
    expect(result.breadcrumb.itemListElement).toHaveLength(2);
  });
});

describe('articleLd', () => {
  it('returns Article schema', () => {
    const result = articleLd({
      headline: 'Test Article',
      description: 'A test article',
      image: '/test.jpg',
      url: 'https://example.com/blog/test',
      publishedAt: '2025-01-01',
      author: 'John Doe',
    });
    expect(result['@type']).toBe('Article');
    expect(result.headline).toBe('Test Article');
    expect(result.author.name).toBe('John Doe');
  });
});
