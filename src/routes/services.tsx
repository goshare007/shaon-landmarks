import { createFileRoute } from '@tanstack/react-router';
import HERO_IMG from '@/assets/images/services/hero.webp';
import { ServicesCards } from '@/components/services/services-cards';
import { ServicesCta } from '@/components/services/services-cta';
import { ServicesHero } from '@/components/services/services-hero';
import { ServicesStandard } from '@/components/services/services-standard';
import { generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/services')({
  component: Services,
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
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'preload', as: 'image', href: HERO_IMG }],
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
