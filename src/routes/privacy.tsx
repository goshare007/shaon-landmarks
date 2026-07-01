import { createFileRoute } from '@tanstack/react-router';
import { PrivacyCta } from '@/components/pages/privacy/privacy-cta';
import { PrivacyHero } from '@/components/pages/privacy/privacy-hero';
import { PrivacyPolicy } from '@/components/pages/privacy/privacy-policy';

export const Route = createFileRoute('/privacy')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <PrivacyHero />
      <PrivacyPolicy />
      <PrivacyCta />
    </main>
  );
}
