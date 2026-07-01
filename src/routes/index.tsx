import { createFileRoute } from '@tanstack/react-router';
import { FeaturedProjects } from '@/components/pages/home/featured-projects';
import { HeroSection } from '@/components/pages/home/hero-section';
import { PillarsSection } from '@/components/pages/home/pillars-section';
import { TrustStats } from '@/components/pages/home/trust-stats';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <TrustStats />
      <FeaturedProjects />
      {/*
      <SustainabilitySection />
      <TestimonialSection />
      <CtaSection />*/}
      <p>Hello world!</p>
    </main>
  );
}
