import { createFileRoute } from '@tanstack/react-router';
import img from '@/assets/images/projects/the-obsidian.webp';
import { PortfolioGrid } from '@/components/portfolio-index/portfolio-grid';
import { PortfolioHero } from '@/components/portfolio-index/portfolio-hero';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/portfolio/')({
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
  return (
    <main>
      <PortfolioHero />
      <PortfolioGrid />
    </main>
  );
}
