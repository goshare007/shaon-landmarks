import { createFileRoute } from '@tanstack/react-router';
import HERO_IMG from '@/assets/images/contact/hero.webp';
import { ContactCta } from '@/components/pages/contact/contact-cta';
import { ContactForm } from '@/components/pages/contact/contact-form';
import { ContactHero } from '@/components/pages/contact/contact-hero';
import { ContactLocations } from '@/components/pages/contact/contact-locations';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/contact')({
  head: () => {
    const meta = generateMeta({
      path: '/contact',
      title: 'Contact Us',
      description:
        'Get in touch with Shaon Landmarks & Housing. Schedule a consultation or visit our offices in Gulshan, Dhaka or Agrabad, Chattogram.',
      image: HERO_IMG,
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Contact Us',
          description:
            'Get in touch with Shaon Landmarks & Housing for consultations or office visits.',
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
      links: [{ rel: 'preload', as: 'image', href: HERO_IMG }],
    };
  },

  component: Contact,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
});

function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactLocations />
      <ContactForm />
      <ContactCta />
    </main>
  );
}
