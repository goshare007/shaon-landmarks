import { createFileRoute, Link } from '@tanstack/react-router';
import { Printer } from 'lucide-react';
import { PortfolioDetailAmenities } from '@/components/portfolio-detail/portfolio-detail-amenities';
import { PortfolioDetailFloorPlans } from '@/components/portfolio-detail/portfolio-detail-floor-plans';
import { PortfolioDetailGallery } from '@/components/portfolio-detail/portfolio-detail-gallery';
import { PortfolioDetailHero } from '@/components/portfolio-detail/portfolio-detail-hero';
import { PortfolioDetailLocation } from '@/components/portfolio-detail/portfolio-detail-location';
import { PortfolioDetailSimple } from '@/components/portfolio-detail/portfolio-detail-simple';
import { PortfolioDetailSpecs } from '@/components/portfolio-detail/portfolio-detail-specs';
import { PortfolioDetailVision } from '@/components/portfolio-detail/portfolio-detail-vision';
import type {
  Project,
  ProjectDetail as ProjectDetailData,
} from '@/data/projects';
import { allProjects } from '@/data/projects';
import { breadcrumbLd, generateMeta, productLd, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/portfolio/$slug')({
  loader: ({ params }) => {
    const project = allProjects.find((p) => p.slug === params.slug);
    return { project: project ?? null };
  },
  component: ProjectDetail,
  pendingMs: 100,
  pendingComponent: () => (
    <main>
      <section className='relative h-230.25 overflow-hidden bg-surface-container-high'>
        <div className='mx-auto flex h-full max-w-360 flex-col justify-end px-4 pb-24 md:px-16'>
          <div className='mb-6 h-6 w-64 animate-pulse rounded bg-surface-container-higher' />
          <div className='h-20 w-3/4 animate-pulse rounded bg-surface-container-higher md:h-28' />
        </div>
      </section>
      <section className='bg-surface py-20'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid grid-cols-4 gap-12'>
            {[...Array(4)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton rows
              <div key={i} className='space-y-2'>
                <div className='h-4 w-20 animate-pulse rounded bg-surface-container-high' />
                <div className='h-6 w-32 animate-pulse rounded bg-surface-container-higher' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className='flex min-h-[60vh] items-center justify-center bg-surface'>
      <div className='text-center'>
        <h1 className='text-4xl font-serif text-on-surface'>Project Error</h1>
        <p className='mt-4 text-on-surface-variant'>
          {error instanceof Error
            ? error.message
            : 'Failed to load project details.'}
        </p>
        <Link
          to='/portfolio'
          search={{ status: '', location: '', search: '' }}
          className='mt-8 inline-block rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:border-secondary hover:text-secondary'
        >
          Back to Portfolio
        </Link>
      </div>
    </main>
  ),
  head: ({ loaderData, params }) => {
    const project = loaderData?.project ?? null;
    const meta = generateMeta({
      path: `/portfolio/${params.slug}`,
      title: project?.title ?? 'Project Details',
      description: project?.description,
      image: project?.image,
    });

    const ldMeta: Array<Record<string, unknown>> = [];

    if (project) {
      ldMeta.push({
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Portfolio', url: `${SITE_URL}/portfolio` },
            {
              name: project.title,
              url: `${SITE_URL}/portfolio/${project.slug}`,
            },
          ]),
        },
      });

      const specs = project.detail?.specs;

      if (specs) {
        ldMeta.push({
          'script:ld+json': {
            '@context': 'https://schema.org',
            ...productLd({
              name: project.title,
              description: project.description,
              image: project.image,
              url: `${SITE_URL}/portfolio/${project.slug}`,
              status: project.status,
              location: project.location,
              area: specs.totalArea,
              units: specs.units,
            }),
          },
        });
      }
    }

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [
        ...(project?.image
          ? [
              {
                rel: 'preload' as const,
                as: 'image' as const,
                href: project.image,
              },
            ]
          : []),
      ],
    };
  },
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <main className='flex min-h-[60vh] items-center justify-center bg-surface'>
      <div className='text-center'>
        <h1 className='text-6xl font-serif text-on-surface'>404</h1>
        <p className='mt-4 text-on-surface-variant'>Project not found</p>
        <Link
          to='/portfolio'
          search={{ status: '', location: '', search: '' }}
          className='mt-8 inline-block rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:border-secondary hover:text-secondary'
        >
          Back to Portfolio
        </Link>
      </div>
    </main>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData();

  if (!project) return <ProjectNotFound />;

  return !project.detail ? (
    <PortfolioDetailSimple project={project} />
  ) : (
    <FullProjectView project={project} detail={project.detail} />
  );
}

function FullProjectView({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetailData;
}) {
  return (
    <main>
      <div className='print:hidden border-b border-outline-variant bg-surface py-2'>
        <div className='mx-auto flex max-w-360 items-center justify-end px-4 md:px-16'>
          <button
            type='button'
            onClick={() => window.print()}
            className='flex items-center gap-2 text-caption font-medium tracking-wider text-on-surface-variant uppercase transition-colors hover:text-secondary'
          >
            <Printer size={14} aria-hidden='true' />
            Print this page
          </button>
        </div>
      </div>
      <PortfolioDetailHero project={project} detail={detail} />
      <PortfolioDetailSpecs specs={detail.specs} />
      <PortfolioDetailFloorPlans floorPlans={detail.floorPlans} />
      <PortfolioDetailVision vision={detail.vision} />
      <PortfolioDetailGallery
        images={detail.gallery}
        projectTitle={project.title}
      />
      <PortfolioDetailAmenities amenities={detail.amenities} />
      <PortfolioDetailLocation location={detail.location} />
    </main>
  );
}
