import { createFileRoute } from '@tanstack/react-router';
import { LegalCta } from '@/components/legal/legal-cta';
import { LegalDisclosures } from '@/components/legal/legal-disclosures';
import { LegalHero } from '@/components/legal/legal-hero';
import { generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/legal')({
  component: Legal,
  head: () => {
    const meta = generateMeta({
      path: '/legal',
      title: 'Legal Disclosures',
      description:
        'RAJUK certified, REHAB member — Shaon Landmarks operates with full regulatory compliance and transparency in Bangladesh real estate.',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Legal Disclosures',
          description:
            'RAJUK certified, REHAB member — Shaon Landmarks operates with full regulatory compliance.',
          url: `${SITE_URL}/legal`,
        }),
      },
    ];

    return { meta: [...meta.meta, ...ldMeta] };
  },
});

function Legal() {
  return (
    <main>
      <LegalHero />
      <LegalDisclosures />
      <LegalCta />
    </main>
  );
}
