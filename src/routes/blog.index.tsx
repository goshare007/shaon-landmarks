import { createFileRoute } from '@tanstack/react-router';
import { BlogCta } from '@/components/pages/blog/blog-cta';
import { BlogGrid } from '@/components/pages/blog/blog-grid';
import { BlogHero } from '@/components/pages/blog/blog-hero';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
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
    ];

    return { meta: [...meta.meta, ...ldMeta] };
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
