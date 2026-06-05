import { createFileRoute } from '@tanstack/react-router';
import { CtaSection } from '@/components/home/cta-section';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { HeroSection } from '@/components/home/hero-section';
import { PillarsSection } from '@/components/home/pillars-section';
import { SustainabilitySection } from '@/components/home/sustainability-section';
import { TestimonialSection } from '@/components/home/testimonials';
import { TrustStats } from '@/components/home/trust-stats';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      {
        title:
          'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh',
      },
      {
        name: 'description',
        content:
          'Shaon Landmarks & Housing redefines Bangladesh real estate with architectural integrity, timely handover, and premium quality construction. Explore iconic developments.',
      },
      {
        property: 'og:title',
        content: 'Shaon Landmarks — Architectural Integrity',
      },
      {
        property: 'og:description',
        content:
          'Premium real estate in Bangladesh with uncompromising architectural integrity and timely handover.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
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
