import { createFileRoute } from '@tanstack/react-router';
import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';
import { SustainabilityCertifications } from '@/components/sustainability/sustainability-certifications';
import { SustainabilityCta } from '@/components/sustainability/sustainability-cta';
import { SustainabilityHero } from '@/components/sustainability/sustainability-hero';
import { SustainabilityPhilosophy } from '@/components/sustainability/sustainability-philosophy';
import { SustainabilityPillars } from '@/components/sustainability/sustainability-pillars';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/sustainability')({
  component: Sustainability,
  head: () => {
    const meta = generateMeta({
      path: '/sustainability',
      title: 'Sustainability',
      description:
        'Shaon Landmarks is committed to sustainable architecture — eco-friendly materials, green spaces, and energy-efficient building practices in Bangladesh.',
      image: SustainabilityImg,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Sustainability',
          description:
            'Shaon Landmarks is committed to sustainable architecture with eco-friendly materials, green spaces, and energy-efficient practices.',
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
      links: [{ rel: 'preload', as: 'image', href: SustainabilityImg }],
    };
  },
});

function Sustainability() {
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
