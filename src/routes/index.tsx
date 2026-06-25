import { createFileRoute } from '@tanstack/react-router';
import { CtaSection } from '@/components/pages/home/cta-section';
import { FeaturedProjects } from '@/components/pages/home/featured-projects';
import { HeroSection } from '@/components/pages/home/hero-section';
import { PillarsSection } from '@/components/pages/home/pillars-section';
import { SustainabilitySection } from '@/components/pages/home/sustainability-section';
import { TestimonialSection } from '@/components/pages/home/testimonials';
import { TrustStats } from '@/components/pages/home/trust-stats';
export const Route = createFileRoute('/')({ component: Home });

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
