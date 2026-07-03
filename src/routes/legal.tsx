import { createFileRoute } from '@tanstack/react-router';
import { LegalCta } from '@/components/pages/legal/legal-cta';
import { LegalDisclosures } from '@/components/pages/legal/legal-disclosures';
import { LegalHero } from '@/components/pages/legal/legal-hero';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import {
  breadcrumbLd,
  generateMeta,
  organizationLd,
  SITE_URL,
  webpageLd,
} from '@/lib/seo';

export const Route = createFileRoute('/legal')({
  component: RouteComponent,
  errorComponent: RouteError,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/legal',
      title: 'Legal & Disclosures',
      description:
        'Important legal information, regulatory disclosures, and compliance details for Shaon Landmarks & Housing.',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Legal & Disclosures',
          description:
            'Legal information, regulatory disclosures, and compliance details for Shaon Landmarks & Housing.',
          url: `${SITE_URL}/legal`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            {
              name: 'Legal & Disclosures',
              url: `${SITE_URL}/legal`,
            },
          ]),
        },
      },
      {
        'script:ld+json': organizationLd(),
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'canonical', href: `${SITE_URL}/legal` }],
    };
  },
});

function RouteComponent() {
  return (
    <main>
      <LegalHero />
      <LegalDisclosures />
      <LegalCta />
    </main>
  );
}
