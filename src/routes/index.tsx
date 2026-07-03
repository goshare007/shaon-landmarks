import { createFileRoute } from '@tanstack/react-router';
import HERO_IMAGE from '@/assets/images/projects/the-obsidian.webp';
import { CtaSection } from '@/components/pages/home/cta-section';
import { FeaturedProjects } from '@/components/pages/home/featured-projects';
import { HeroSection } from '@/components/pages/home/hero-section';
import { PillarsSection } from '@/components/pages/home/pillars-section';
import { SustainabilitySection } from '@/components/pages/home/sustainability-section';
import { TestimonialSection } from '@/components/pages/home/testimonials';
import { TrustStats } from '@/components/pages/home/trust-stats';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import {
  breadcrumbLd,
  generateMeta,
  organizationLd,
  SITE_URL,
  webpageLd,
} from '@/lib/seo';

export const Route = createFileRoute('/')({
  component: Home,
  errorComponent: RouteError,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/',
      description:
        'Shaon Landmarks & Housing — architectural integrity, timely handover, and premium quality construction in Bangladesh real estate.',
      image: HERO_IMAGE,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Home',
          description:
            'Shaon Landmarks & Housing — architectural integrity, timely handover, and premium quality construction in Bangladesh real estate.',
          url: SITE_URL,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([{ name: 'Home', url: SITE_URL }]),
        },
      },
      {
        'script:ld+json': organizationLd(),
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [
        { rel: 'canonical', href: SITE_URL },
        { rel: 'preload', as: 'image', href: HERO_IMAGE },
      ],
    };
  },
});

function Home() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <TrustStats />
      <FeaturedProjects />
      <SustainabilitySection />
      <TestimonialSection />
      <CtaSection />
    </main>
  );
}
