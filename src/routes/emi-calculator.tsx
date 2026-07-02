import { createFileRoute } from '@tanstack/react-router';
import { EmiCalculator } from '@/components/pages/emi/emi-calculator';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/emi-calculator')({
  component: RouteComponent,
  head: () => {
    const meta = generateMeta({
      path: '/emi-calculator',
      title: 'EMI Calculator',
      description:
        "Calculate your monthly home loan payments with Shaon Landmarks & Housing's interactive EMI calculator.",
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'EMI Calculator',
          description:
            'Interactive EMI calculator from Shaon Landmarks & Housing.',
          url: `${SITE_URL}/emi-calculator`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'EMI Calculator', url: `${SITE_URL}/emi-calculator` },
          ]),
        },
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [{ rel: 'canonical', href: `${SITE_URL}/emi-calculator` }],
    };
  },
});

function RouteComponent() {
  return (
    <main>
      <EmiCalculator />
    </main>
  );
}
