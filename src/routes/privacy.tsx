import { createFileRoute } from '@tanstack/react-router';
import { PrivacyCta } from '@/components/privacy/privacy-cta';
import { PrivacyHero } from '@/components/privacy/privacy-hero';
import { PrivacyPolicy } from '@/components/privacy/privacy-policy';
import { generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/privacy')({
  component: Privacy,
  head: () => {
    const meta = generateMeta({
      path: '/privacy',
      title: 'Privacy Policy',
      description:
        "Shaon Landmarks & Housing's privacy policy — how we collect, use, and protect your personal information.",
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Privacy Policy',
          description:
            "Shaon Landmarks & Housing's privacy policy — how we collect, use, and protect your personal information.",
          url: `${SITE_URL}/privacy`,
        }),
      },
    ];

    return { meta: [...meta.meta, ...ldMeta] };
  },
});

function Privacy() {
  return (
    <main>
      <PrivacyHero />
      <PrivacyPolicy />
      <PrivacyCta />
    </main>
  );
}
