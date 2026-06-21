import { createFileRoute } from '@tanstack/react-router';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogHero } from '@/components/blog/blog-hero';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/blog/')({
  validateSearch: (search: Record<string, unknown>): { category: string } => ({
    category: (search.category as string) || '',
  }),
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
  const { category } = Route.useSearch();
  const navigate = Route.useNavigate();

  const setCategory = (cat: string) => {
    navigate({ search: { category: cat } });
  };

  return (
    <main>
      <BlogHero />
      <BlogGrid category={category} onCategoryChange={setCategory} />
    </main>
  );
}
