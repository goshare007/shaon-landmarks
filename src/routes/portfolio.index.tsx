import { createFileRoute } from '@tanstack/react-router';
import img from '@/assets/images/projects/the-obsidian.webp';
import { PortfolioGrid } from '@/components/portfolio-index/portfolio-grid';
import { PortfolioHero } from '@/components/portfolio-index/portfolio-hero';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/portfolio/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    status: string;
    location: string;
    search: string;
  } => ({
    status: (search.status as string) || '',
    location: (search.location as string) || '',
    search: (search.search as string) || '',
  }),
  component: PortfolioIndex,
  head: () => ({
    ...generateMeta({
      path: '/portfolio',
      title: 'Our Portfolio',
      description:
        "Explore Shaon Landmarks' portfolio of premium residential and commercial projects across Dhaka and Chattogram.",
      image: img,
    }),
    links: [{ rel: 'preload', as: 'image', href: img }],
  }),
});

function PortfolioIndex() {
  const { status, location, search: searchText } = Route.useSearch();
  const navigate = Route.useNavigate();

  const setFilters = (updates: Record<string, string>) => {
    navigate({ search: (prev) => ({ ...prev, ...updates }) });
  };

  return (
    <main id='main-content'>
      <PortfolioHero />
      <PortfolioGrid
        filters={{ status, location, search: searchText }}
        onFilterChange={setFilters}
      />
    </main>
  );
}
