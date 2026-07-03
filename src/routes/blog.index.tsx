import { createFileRoute } from '@tanstack/react-router';
import { BlogCta } from '@/components/pages/blog/blog-cta';
import { BlogGrid } from '@/components/pages/blog/blog-grid';
import { BlogHero } from '@/components/pages/blog/blog-hero';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import {
  breadcrumbLd,
  generateMeta,
  organizationLd,
  SITE_URL,
  webpageLd,
} from '@/lib/seo';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/blog',
      title: 'Blog',
      description:
        'Insights and guides on Bangladesh real estate, home buying, architecture, and market trends from Shaon Landmarks & Housing.',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Blog',
          description:
            'Insights and guides on Bangladesh real estate from Shaon Landmarks & Housing.',
          url: `${SITE_URL}/blog`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
          ]),
        },
      },
      {
        'script:ld+json': organizationLd(),
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'canonical', href: `${SITE_URL}/blog` }],
    };
  },
});

function BlogIndex() {
  return (
    <main>
      <BlogHero />
      <BlogGrid />
      <BlogCta />
    </main>
  );
}
