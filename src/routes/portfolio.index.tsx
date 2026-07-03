import { createFileRoute } from '@tanstack/react-router';
import img from '@/assets/images/projects/the-obsidian.webp';
import { PortfolioCta } from '@/components/pages/portfolio-index/portfolio-cta';
import { PortfolioGrid } from '@/components/pages/portfolio-index/portfolio-grid';
import { PortfolioHero } from '@/components/pages/portfolio-index/portfolio-hero';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import {
  breadcrumbLd,
  generateMeta,
  organizationLd,
  SITE_URL,
  webpageLd,
} from '@/lib/seo';

export const Route = createFileRoute('/portfolio/')({
  component: PortfolioIndex,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/portfolio',
      title: 'Our Portfolio',
      description:
        "Explore Shaon Landmarks' portfolio of premium residential and commercial projects across Dhaka and Chattogram.",
      image: img,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Portfolio',
          description:
            "Explore Shaon Landmarks' portfolio of premium residential and commercial projects.",
          url: `${SITE_URL}/portfolio`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
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
        { rel: 'canonical', href: `${SITE_URL}/portfolio` },
        { rel: 'preload', as: 'image', href: img },
      ],
    };
  },
});

function PortfolioIndex() {
  return (
    <main id='main-content'>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCta />
    </main>
  );
}
