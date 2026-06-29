import { createFileRoute } from '@tanstack/react-router';
import { EmiCalculator } from '@/components/pages/emi/emi-calculator';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

export const Route = createFileRoute('/emi-calculator')({
  component: EmiCalculatorPage,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: () => {
    const meta = generateMeta({
      path: '/emi-calculator',
      title: 'EMI Calculator',
      description:
        "Calculate monthly EMI for your dream property. Plan your real estate investment in Bangladesh with Shaon Landmarks' easy-to-use EMI calculator.",
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'EMI Calculator',
          description:
            'Plan your real estate investment with Shaon Landmarks EMI calculator. Estimate monthly payments, total interest, and total payment.',
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
    };
  },
});

function EmiCalculatorPage() {
  return (
    <main>
      <EmiCalculator />
    </main>
  );
}
