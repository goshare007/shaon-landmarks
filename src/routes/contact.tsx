import { createFileRoute } from '@tanstack/react-router';
import { ContactCta } from '@/components/pages/contact/contact-cta';
import { ContactForm } from '@/components/pages/contact/contact-form';
import { ContactHero } from '@/components/pages/contact/contact-hero';
import { ContactLocations } from '@/components/pages/contact/contact-locations';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <ContactHero />
      <ContactLocations />
      <ContactForm />
      <ContactCta />
    </main>
  );
}
