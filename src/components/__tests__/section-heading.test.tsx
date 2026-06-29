import { describe, expect, it } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { SectionHeading } from '@/components/ui/section-heading';

describe('SectionHeading', () => {
  it('renders eyebrow and heading text', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow='Test Eyebrow' heading='Test Heading' />,
    );
    expect(html).toContain('Test Eyebrow');
    expect(html).toContain('Test Heading');
  });

  it('renders highlight text', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow='E' heading='Main' highlight='Highlighted' />,
    );
    expect(html).toContain('Highlighted');
  });

  it('renders as h1 when as prop is h1', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow='E' heading='Title' as='h1' />,
    );
    expect(html).toContain('<h1');
    expect(html).not.toContain('<h2');
  });

  it('renders as h2 by default', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow='E' heading='Title' />,
    );
    expect(html).toContain('<h2');
  });

  it('applies center alignment class', () => {
    const html = renderToStaticMarkup(
      <SectionHeading eyebrow='E' heading='H' align='center' />,
    );
    expect(html).toContain('justify-center');
  });
});
