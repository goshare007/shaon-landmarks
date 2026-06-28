import { IconArrowLeft } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { z } from 'zod';
import { CompareTable } from '@/components/pages/portfolio-compare/compare-table';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { allProjects } from '@/content/projects';
import { breadcrumbLd, generateMeta, SITE_URL, webpageLd } from '@/lib/seo';

gsap.registerPlugin(ScrollTrigger);

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
    <main className='flex min-h-[60vh] items-center justify-center bg-surface-raised'>
      <div className='text-center'>
        <h1 className='text-4xl font-serif text-foreground'>
          No Projects Selected
        </h1>
        <p className='mt-4 text-muted-foreground'>
          Select 2–4 projects from the portfolio to compare.
        </p>
        <Link
          to='/portfolio'
          className='mt-8 inline-block rounded-sm border border-border px-6 py-3 text-[10px] font-medium tracking-widest text-foreground uppercase transition-colors hover:border-custom hover:text-custom'
        >
          Back to Portfolio
        </Link>
      </div>
    </main>
  ),
});

function ComparePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const { projects } = Route.useLoaderData();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.compare-page__heading > *', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (projects.length < 2) {
    return (
      <main className='flex min-h-[60vh] items-center justify-center bg-surface-raised'>
        <div className='text-center'>
          <h1 className='text-4xl font-serif text-foreground'>
            Select Projects to Compare
          </h1>
          <p className='mt-4 text-muted-foreground'>
            Please select at least 2 projects to compare side-by-side.
          </p>
          <Link
            to='/portfolio'
            className='inline-flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-custom'
          >
            Back to Portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section ref={sectionRef} className='bg-surface-raised py-12 md:py-16'>
        <div className='container'>
          <Link
            to='/portfolio'
            search={{ status: '', location: '', search: '' }}
            className='inline-flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-custom'
          >
            <IconArrowLeft size={16} aria-hidden='true' />
            Back to Portfolio
          </Link>

          <div className='compare-page__heading mt-8 mb-12'>
            <h1 className='text-3xl font-serif text-foreground md:text-4xl'>
              Project Comparison
            </h1>
            <p className='mt-3 text-muted-foreground'>
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
