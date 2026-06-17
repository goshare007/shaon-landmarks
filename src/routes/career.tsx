import { createFileRoute } from '@tanstack/react-router';
import HERO_IMAGE from '@/assets/images/career/hero.webp';
import { CareerCta } from '@/components/career/career-cta';
import { CareerHero } from '@/components/career/career-hero';
import { CareerPositions } from '@/components/career/career-positions';
import { CareerWhy } from '@/components/career/career-why';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/career')({
  component: Career,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/career',
      title: 'Careers',
      description:
        'Join Shaon Landmarks & Housing. Explore career opportunities in architecture, project management, interior design, and more.',
      image: HERO_IMAGE,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Careers',
          description:
            'Career opportunities at Shaon Landmarks & Housing in architecture, project management, interior design, and more.',
          url: `${SITE_URL}/career`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Careers', url: `${SITE_URL}/career` },
          ]),
        },
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'preload', as: 'image', href: HERO_IMAGE }],
    };
  },
});

function Career() {
  return (
    <main>
      <CareerHero />
      <CareerWhy />
      <CareerPositions />
      <CareerCta />
    </main>
  );
}
