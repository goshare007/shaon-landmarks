import { createFileRoute } from '@tanstack/react-router';
import HERO_IMAGE from '@/assets/images/about/hero.webp';
import { AboutCertifications } from '@/components/pages/about/about-certifications';
import { AboutHero } from '@/components/pages/about/about-hero';
import { AboutLeadership } from '@/components/pages/about/about-leadership';
import { AboutMissionVision } from '@/components/pages/about/about-mission-vision';
import { AboutStory } from '@/components/pages/about/about-story';
import { AboutTestimonials } from '@/components/pages/about/about-testimonials';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/about')({
  component: About,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/about',
      title: 'About Us',
      description:
        "Learn about Shaon Landmarks & Housing's legacy of architectural integrity, visionary leadership, and certified excellence in Bangladesh real estate.",
      image: HERO_IMAGE,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'About Us',
          description:
            "Shaon Landmarks & Housing's legacy of architectural integrity and certified excellence in Bangladesh real estate.",
          url: `${SITE_URL}/about`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'About Us', url: `${SITE_URL}/about` },
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

function About() {
  return (
    <main id='main-content'>
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutTestimonials />
      <AboutLeadership />
      <AboutCertifications />
    </main>
  );
}
