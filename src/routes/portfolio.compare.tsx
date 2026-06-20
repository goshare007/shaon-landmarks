import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { z } from 'zod';
import { CompareTable } from '@/components/portfolio-compare/compare-table';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { allProjects } from '@/data/projects';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

const compareSearchSchema = z.object({
  ids: z
    .string()
    .optional()
    .transform((val) => val?.split(',').filter(Boolean) ?? []),
});

export const Route = createFileRoute('/portfolio/compare')({
  validateSearch: compareSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ deps }) => {
    const projects = allProjects.filter((p) => deps.ids.includes(p.id));
    return { projects, ids: deps.ids };
  },
  component: ComparePage,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  head: ({ loaderData }) => {
    const meta = generateMeta({
      path: '/portfolio/compare',
      title: 'Compare Projects',
      description:
        'Side-by-side comparison of Shaon Landmarks & Housing projects. Compare total area, units, floor count, amenities, and more.',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': webpageLd({
          name: 'Compare Projects',
          description:
            'Side-by-side comparison of premium real estate projects in Bangladesh.',
          url: `${SITE_URL}/portfolio/compare`,
        }),
      },
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
            {
              name: 'Compare Projects',
              url: `${SITE_URL}/portfolio/compare`,
            },
          ]),
        },
      },
    ];

    const names = loaderData?.projects.map((p) => p.title).join(', ');

    return {
      meta: [
        ...meta.meta,
        ...ldMeta,
        ...(names ? [{ name: 'keywords', content: names }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <main className='flex min-h-[60vh] items-center justify-center bg-surface'>
      <div className='text-center'>
        <h1 className='text-4xl font-serif text-on-surface'>
          No Projects Selected
        </h1>
        <p className='mt-4 text-on-surface-variant'>
          Select 2–4 projects from the portfolio to compare.
        </p>
        <Link
          to='/portfolio'
          className='mt-8 inline-block rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:border-secondary hover:text-secondary'
        >
          Back to Portfolio
        </Link>
      </div>
    </main>
  ),
});

function ComparePage() {
  const { projects } = Route.useLoaderData();

  if (projects.length < 2) {
    return (
      <main className='flex min-h-[60vh] items-center justify-center bg-surface'>
        <div className='text-center'>
          <h1 className='text-4xl font-serif text-on-surface'>
            Select Projects to Compare
          </h1>
          <p className='mt-4 text-on-surface-variant'>
            Please select at least 2 projects to compare side-by-side.
          </p>
          <Link
            to='/portfolio'
            className='mt-8 inline-block rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:border-secondary hover:text-secondary'
          >
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className='bg-surface py-12 md:py-16'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <Link
            to='/portfolio'
            className='inline-flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:text-secondary'
          >
            <ArrowLeft size={16} aria-hidden='true' />
            Back to Portfolio
          </Link>

          <div className='mt-8 mb-12'>
            <h1 className='text-3xl font-serif text-primary md:text-4xl'>
              Project Comparison
            </h1>
            <p className='mt-3 text-on-surface-variant'>
              Comparing {projects.length} project
              {projects.length > 1 ? 's' : ''}
            </p>
          </div>

          <CompareTable projects={projects} />
        </div>
      </section>
    </main>
  );
}
