import { createFileRoute } from '@tanstack/react-router';
import { LegalCta } from '@/components/pages/legal/legal-cta';
import { LegalDisclosures } from '@/components/pages/legal/legal-disclosures';
import { LegalHero } from '@/components/pages/legal/legal-hero';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/legal')({
  component: Legal,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
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
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Legal Disclosures', url: `${SITE_URL}/legal` },
          ]),
        },
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
