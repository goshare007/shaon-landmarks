import { createFileRoute } from '@tanstack/react-router';
import HERO_IMAGE from '@/assets/images/projects/the-obsidian.webp';
import { CtaSection } from '@/components/home/cta-section';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { HeroSection } from '@/components/home/hero-section';
import { PillarsSection } from '@/components/home/pillars-section';
import { Preloader } from '@/components/home/preloader';
import { SustainabilitySection } from '@/components/home/sustainability-section';
import { TestimonialSection } from '@/components/home/testimonials';
import { TrustStats } from '@/components/home/trust-stats';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    ...generateMeta({
      path: '/',
      image: HERO_IMAGE,
    }),
    links: [{ rel: 'preload', as: 'image', href: HERO_IMAGE }],
  }),
});

function Home() {
  return (
    <>
      <Preloader />
      <main>
        <HeroSection />
        <PillarsSection />
        <FeaturedProjects />
        <SustainabilitySection />
        <TestimonialSection />
        <TrustStats />
        <CtaSection />
      </main>
    </>
  );
}
