import { describe, expect, it } from 'vitest';
import {
  breadcrumbLd,
  DEFAULT_OG_IMAGE,
  faqLd,
  generateMeta,
  ldScript,
  productLd,
  SITE_URL,
  webpageLd,
} from './seo';

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

describe('ldScript', () => {
  it('wraps data with @context', () => {
    const result = ldScript({ '@type': 'TestType', name: 'Test' });
    expect(JSON.parse(result)).toEqual({
      '@context': 'https://schema.org',
      '@type': 'TestType',
      name: 'Test',
    });
  });
});

describe('productLd', () => {
  it('returns RealEstateListing with all properties', () => {
    const result = productLd({
      name: 'Test Project',
      description: 'A test project',
      image: '/test.jpg',
      url: 'https://example.com/test',
      status: 'Completed',
      location: 'Dhaka',
      area: '5,000 sqft',
      units: '12',
    });
    expect(result).toEqual({
      '@type': 'RealEstateListing',
      name: 'Test Project',
      description: 'A test project',
      image: '/test.jpg',
      url: 'https://example.com/test',
      category: 'Real Estate Development',
      additionalProperty: [
        { '@type': 'PropertyValue', name: 'Status', value: 'Completed' },
        { '@type': 'PropertyValue', name: 'Location', value: 'Dhaka' },
        { '@type': 'PropertyValue', name: 'Total Area', value: '5,000 sqft' },
        { '@type': 'PropertyValue', name: 'Number of Units', value: '12' },
      ],
    });
  });
});

describe('webpageLd', () => {
  it('returns WebPage with breadcrumb', () => {
    const result = webpageLd({
      name: 'About Us',
      description: 'About page description',
      url: 'https://example.com/about',
    });
    expect(result).toEqual({
      '@type': 'WebPage',
      name: 'About Us',
      description: 'About page description',
      url: 'https://example.com/about',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About Us',
            item: 'https://example.com/about',
          },
        ],
      },
    });
  });
});

describe('breadcrumbLd', () => {
  it('returns BreadcrumbList with items', () => {
    const result = breadcrumbLd([
      { name: 'Home', url: 'https://example.com' },
      { name: 'Services', url: 'https://example.com/services' },
      { name: 'Consulting', url: 'https://example.com/services/consulting' },
    ]);
    expect(result).toEqual({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://example.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: 'https://example.com/services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Consulting',
          item: 'https://example.com/services/consulting',
        },
      ],
    });
  });
});

describe('faqLd', () => {
  it('returns FAQPage with questions', () => {
    const result = faqLd([
      { question: 'Q1?', answer: 'A1' },
      { question: 'Q2?', answer: 'A2' },
    ]);
    expect(result).toEqual({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Q1?',
          acceptedAnswer: { '@type': 'Answer', text: 'A1' },
        },
        {
          '@type': 'Question',
          name: 'Q2?',
          acceptedAnswer: { '@type': 'Answer', text: 'A2' },
        },
      ],
    });
  });
});
