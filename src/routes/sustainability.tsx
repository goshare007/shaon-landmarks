import { createFileRoute } from '@tanstack/react-router';
import SUSTAINABILITY_IMG from '@/assets/images/sustainability/sustainability.webp';
import { SustainabilityCertifications } from '@/components/pages/sustainability/sustainability-certifications';
import { SustainabilityCta } from '@/components/pages/sustainability/sustainability-cta';
import { SustainabilityHero } from '@/components/pages/sustainability/sustainability-hero';
import { SustainabilityPhilosophy } from '@/components/pages/sustainability/sustainability-philosophy';
import { SustainabilityPillars } from '@/components/pages/sustainability/sustainability-pillars';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/sustainability')({
  component: RouteComponent,
  head: () => {
    const meta = generateMeta({
      path: '/sustainability',
      title: 'Sustainability',
      description:
        "Discover Shaon Landmarks & Housing's commitment to sustainable architecture, green building practices, and eco-friendly design in Bangladesh.",
      image: SUSTAINABILITY_IMG,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Sustainability',
          description:
            "Shaon Landmarks & Housing's commitment to sustainable architecture and green building.",
          url: `${SITE_URL}/sustainability`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Sustainability', url: `${SITE_URL}/sustainability` },
          ]),
        },
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [
        { rel: 'canonical', href: `${SITE_URL}/sustainability` },
        { rel: 'preload', as: 'image', href: SUSTAINABILITY_IMG },
      ],
    };
  },
});

function RouteComponent() {
  return (
    <main>
      <SustainabilityHero />
      <SustainabilityPhilosophy />
      <SustainabilityPillars />
      <SustainabilityCertifications />
      <SustainabilityCta />
    </main>
  );
}
