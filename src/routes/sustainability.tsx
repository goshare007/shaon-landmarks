import { createFileRoute } from '@tanstack/react-router';
import { SustainabilityCertifications } from '@/components/pages/sustainability/sustainability-certifications';
import { SustainabilityCta } from '@/components/pages/sustainability/sustainability-cta';
import { SustainabilityHero } from '@/components/pages/sustainability/sustainability-hero';
import { SustainabilityPhilosophy } from '@/components/pages/sustainability/sustainability-philosophy';
import { SustainabilityPillars } from '@/components/pages/sustainability/sustainability-pillars';

export const Route = createFileRoute('/sustainability')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <SustainabilityHero />
      <SustainabilityPhilosophy />
      <SustainabilityPillars />
      <SustainabilityCertifications />
      <SustainabilityCta />
    </main>
  );
}
