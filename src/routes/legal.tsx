import { createFileRoute } from '@tanstack/react-router';
import { LegalCta } from '@/components/pages/legal/legal-cta';
import { LegalDisclosures } from '@/components/pages/legal/legal-disclosures';
import { LegalHero } from '@/components/pages/legal/legal-hero';

export const Route = createFileRoute('/legal')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <LegalHero />
      <LegalDisclosures />
      <LegalCta />
    </main>
  );
}
