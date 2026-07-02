import { createFileRoute } from '@tanstack/react-router';
import { ContactCta } from '@/components/pages/contact/contact-cta';
import { ContactForm } from '@/components/pages/contact/contact-form';
import { ContactHero } from '@/components/pages/contact/contact-hero';
import { ContactLocations } from '@/components/pages/contact/contact-locations';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
  head: () => {
    const meta = generateMeta({
      path: '/contact',
      title: 'Contact Us',
      description:
        'Get in touch with Shaon Landmarks & Housing. Visit our offices in Dhaka and Chattogram for premium real estate consultations.',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Contact Us',
          description:
            'Get in touch with Shaon Landmarks & Housing for premium real estate consultations.',
          url: `${SITE_URL}/contact`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Contact Us', url: `${SITE_URL}/contact` },
          ]),
        },
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'canonical', href: `${SITE_URL}/contact` }],
    };
  },
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
