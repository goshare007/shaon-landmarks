import { createFileRoute } from '@tanstack/react-router';
import img from '@/assets/images/projects/the-obsidian.webp';
import { PortfolioCta } from '@/components/pages/portfolio-index/portfolio-cta';
import { PortfolioGrid } from '@/components/pages/portfolio-index/portfolio-grid';
import { PortfolioHero } from '@/components/pages/portfolio-index/portfolio-hero';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/portfolio/')({
  component: PortfolioIndex,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
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
  return (
    <main id='main-content'>
      <PortfolioHero />
      <PortfolioGrid />
      <PortfolioCta />
    </main>
  );
}
