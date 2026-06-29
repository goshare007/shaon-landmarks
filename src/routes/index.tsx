import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/pages/home/hero-section';
import { PillarsSection } from '@/components/pages/home/pillars-section';
import { TrustStats } from '@/components/pages/home/trust-stats';
import { RouteError } from '@/components/shared/route-error';

const FeaturedProjects = lazy(() =>
  import('@/components/pages/home/featured-projects').then((m) => ({
    default: m.FeaturedProjects,
  })),
);
const SustainabilitySection = lazy(() =>
  import('@/components/pages/home/sustainability-section').then((m) => ({
    default: m.SustainabilitySection,
  })),
);
const TestimonialSection = lazy(() =>
  import('@/components/pages/home/testimonials').then((m) => ({
    default: m.TestimonialSection,
  })),
);
const CtaSection = lazy(() =>
  import('@/components/pages/home/cta-section').then((m) => ({
    default: m.CtaSection,
  })),
);

export const Route = createFileRoute('/')({
  component: Home,
  errorComponent: RouteError,
});

function Home() {
  return (
    <main id='main-content'>
      <HeroSection />
      <PillarsSection />
      <TrustStats />
      <Suspense fallback={<div className='h-96' />}>
        <FeaturedProjects />
      </Suspense>
      <Suspense fallback={<div className='h-80' />}>
        <SustainabilitySection />
      </Suspense>
      <Suspense fallback={<div className='h-80' />}>
        <TestimonialSection />
      </Suspense>
      <Suspense fallback={<div className='h-80' />}>
        <CtaSection />
      </Suspense>
    </main>
  );
}
