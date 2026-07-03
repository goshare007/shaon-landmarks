import { createFileRoute } from '@tanstack/react-router';
import HERO_IMG from '@/assets/images/services/hero.webp';
import { ServicesCards } from '@/components/pages/services/services-cards';
import { ServicesCta } from '@/components/pages/services/services-cta';
import { ServicesHero } from '@/components/pages/services/services-hero';
import { ServicesStandard } from '@/components/pages/services/services-standard';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import {
  breadcrumbLd,
  generateMeta,
  organizationLd,
  SITE_URL,
  webpageLd,
} from '@/lib/seo';

export const Route = createFileRoute('/services')({
  component: Services,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/services',
      title: 'Our Services',
      description:
        'Shaon Landmarks offers land development, architectural design, construction management, and interior design services across Bangladesh.',
      image: HERO_IMG,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Our Services',
          description:
            'Shaon Landmarks offers land development, architectural design, construction management, and interior design services across Bangladesh.',
          url: `${SITE_URL}/services`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Our Services', url: `${SITE_URL}/services` },
          ]),
        },
      },
      {
        'script:ld+json': organizationLd(),
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [
        { rel: 'canonical', href: `${SITE_URL}/services` },
        { rel: 'preload', as: 'image', href: HERO_IMG },
      ],
    };
  },
});

function Services() {
  return (
    <main>
      <ServicesHero />
      <ServicesCards />
      <ServicesStandard />
      <ServicesCta />
    </main>
  );
}
