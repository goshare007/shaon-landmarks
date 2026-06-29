import { describe, expect, it } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { TrustStats } from '@/components/pages/home/trust-stats';
import { TRUST_STATS } from '@/content/home';

describe('TrustStats', () => {
  it('renders all stat values and labels', () => {
    const html = renderToStaticMarkup(<TrustStats />);
    for (const stat of TRUST_STATS) {
      expect(html).toContain(stat.value);
      expect(html).toContain(stat.label);
    }
  });

  it('renders sr-only heading', () => {
    const html = renderToStaticMarkup(<TrustStats />);
    expect(html).toContain('Company Statistics');
  });
});
