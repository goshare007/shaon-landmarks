import { createFileRoute } from '@tanstack/react-router';
import { CtaSection } from '@/components/home/cta-section';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { HeroSection } from '@/components/home/hero-section';
import { PillarsSection } from '@/components/home/pillars-section';
import { SustainabilitySection } from '@/components/home/sustainability-section';
import { TestimonialSection } from '@/components/home/testimonials';
import { TrustStats } from '@/components/home/trust-stats';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => generateMeta({}),
});

function Home() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <FeaturedProjects />
      <SustainabilitySection />
      <TestimonialSection />
      <TrustStats />
      <CtaSection />
    </main>
  );
}
