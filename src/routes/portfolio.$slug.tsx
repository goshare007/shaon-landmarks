import { createFileRoute, Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'motion/react';
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
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
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

  return (
    <>
      {!project.detail ? (
        <SimpleProjectView project={project} />
      ) : (
        <FullProjectView project={project} detail={project.detail} />
      )}
    </>
  );
}

function SimpleProjectView({ project }: { project: Project }) {
  return (
    <main>
      <section className='relative h-[60vh] min-h-96 overflow-hidden'>
        <motion.div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${project.image})` }}
          animate={{ scale: [1, 1.1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
        <div className='relative z-10 flex h-full items-end pb-20'>
          <div className='mx-auto w-full max-w-360 px-4 md:px-16'>
            <motion.h1
              className='heading-hero text-white'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              className='mt-4 max-w-xl text-base text-white/60'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {project.description}
            </motion.p>
          </div>
        </div>
      </section>

      <section className='bg-surface py-24'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid gap-8 md:grid-cols-3'>
            <div>
              <p className='text-label font-medium tracking-widest text-secondary uppercase'>
                Status
              </p>
              <p className='mt-1 text-lg font-serif'>{project.status}</p>
            </div>
            <div>
              <p className='text-label font-medium tracking-widest text-secondary uppercase'>
                Location
              </p>
              <p className='mt-1 text-lg font-serif'>{project.location}</p>
            </div>
            <div>
              <p className='text-label font-medium tracking-widest text-secondary uppercase'>
                {project.date.includes(':') ? 'Timeline' : 'Launch'}
              </p>
              <p className='mt-1 text-lg font-serif'>{project.date}</p>
            </div>
          </div>
          <div className='mt-12'>
            <Link
              to='/portfolio'
              className='inline-flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:text-secondary'
            >
              <span className='material-symbols-outlined text-base'>
                arrow_back
              </span>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
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
      <HeroSection project={project} detail={detail} />
      <SpecsSection specs={detail.specs} />
      <VisionSection vision={detail.vision} />
      <GallerySection images={detail.gallery} projectTitle={project.title} />
      <AmenitiesSection amenities={detail.amenities} />
      <LocationSection location={detail.location} />
    </main>
  );
}

function HeroSection({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetailData;
}) {
  return (
    <section className='relative h-170 overflow-hidden'>
      <div className='absolute inset-0 z-10 bg-primary/40' />
      <motion.div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${detail.heroImage})` }}
        animate={{ scale: [1, 1.08] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      <div className='absolute inset-0 z-20 mx-auto flex max-w-360 flex-col justify-end px-4 pb-24 md:px-16'>
        <motion.div
          className='mb-6 flex items-center gap-4'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className='bg-secondary px-4 py-1 text-label font-medium tracking-[0.2em] text-on-secondary uppercase'>
            {project.status}
          </span>
          <div className='h-px w-24 bg-secondary' />
          <span className='text-label font-medium tracking-[0.2em] text-white/80 uppercase'>
            {project.location}
          </span>
        </motion.div>
        <motion.h1
          className='heading-hero max-w-3xl text-white'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.15, 1] }}
        >
          {project.title.split(' ').map((word, i, arr) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
            <span key={i}>
              {word}
              {i === Math.floor(arr.length / 2) - 1 ? <br /> : ' '}
            </span>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}

function SpecsSection({ specs }: { specs: ProjectDetailData['specs'] }) {
  const items = [
    { label: 'Total Area', value: specs.totalArea },
    { label: 'Units', value: specs.units },
    { label: 'Floor Count', value: specs.floorCount },
    { label: 'Completion', value: specs.completion },
  ];

  return (
    <section className='border-b border-outline-variant bg-surface py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid grid-cols-2 gap-12 md:grid-cols-4'>
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                {item.label}
              </p>
              <p className='mt-2 text-xl font-serif text-primary md:text-2xl'>
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection({ vision }: { vision: ProjectDetailData['vision'] }) {
  return (
    <section className='bg-surface py-32'>
      <div className='mx-auto flex max-w-360 flex-col gap-20 px-4 md:flex-row md:px-16'>
        <motion.div
          className='w-full md:w-1/2'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
        >
          <h2 className='mb-10 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
            {vision.title}{' '}
            {vision.italicPart && (
              <span className='italic'>{vision.italicPart}</span>
            )}
          </h2>
          <div className='max-w-xl space-y-6 text-base leading-relaxed text-on-surface-variant md:text-lg'>
            {vision.paragraphs.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>
        <motion.div
          className='w-full overflow-hidden bg-surface-container md:w-1/2'
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Image
            src={vision.image}
            alt=''
            layout='fullWidth'
            className='aspect-4/5 h-full w-full object-cover'
          />
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) {
  const [img1, img2, img3] = images;

  return (
    <section className='bg-surface-container-low py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <motion.div
          className='mb-16 flex items-end justify-between'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-2xl font-serif text-primary md:text-3xl'>
            Immersive Spaces
          </h2>
          <p className='cursor-pointer border-b border-secondary pb-1 text-label font-medium tracking-[0.15em] text-secondary uppercase transition-opacity hover:opacity-70'>
            View Full Gallery
          </p>
        </motion.div>
        <div className='grid h-200 grid-cols-12 grid-rows-2 gap-6'>
          <motion.div
            className='group col-span-12 cursor-crosshair overflow-hidden md:col-span-8 md:row-span-2'
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src={img1}
              alt={`${projectTitle} gallery — main view`}
              layout='fullWidth'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
          </motion.div>
          {img2 && (
            <motion.div
              className='group col-span-6 cursor-crosshair overflow-hidden md:col-span-4 md:row-span-1'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                src={img2}
                alt={`${projectTitle} gallery — view 2`}
                layout='fullWidth'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </motion.div>
          )}
          {img3 && (
            <motion.div
              className='group col-span-6 cursor-crosshair overflow-hidden md:col-span-4 md:row-span-1'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={img3}
                alt={`${projectTitle} gallery — view 3`}
                layout='fullWidth'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

function AmenitiesSection({
  amenities,
}: {
  amenities: ProjectDetailData['amenities'];
}) {
  return (
    <section className='bg-primary py-32 text-on-primary'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <motion.div
          className='mb-24 max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className='mb-6 text-3xl font-serif md:text-4xl lg:text-5xl'>
            Elevating the <br />
            Daily Experience
          </h2>
          <p className='text-base leading-relaxed text-on-primary-container md:text-lg'>
            We have curated a selection of amenities that mirror the needs of a
            global citizen, focusing on wellness, security, and effortless
            service.
          </p>
        </motion.div>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {amenities.map((a, i) => (
            <motion.div
              key={a.title}
              className='border-l border-outline-variant py-4 pl-8'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className='material-symbols-outlined mb-6 text-4xl text-secondary'>
                {a.icon}
              </span>
              <h3 className='mb-4 font-serif text-xl md:text-2xl'>{a.title}</h3>
              <p className='text-sm leading-relaxed text-on-primary-container md:text-base'>
                {a.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LocationSection({
  location,
}: {
  location: ProjectDetailData['location'];
}) {
  return (
    <section className='bg-surface py-32'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-16 lg:grid-cols-12'>
          <motion.div
            className='lg:col-span-5'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <h2 className='mb-8 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
              The Heart of <br />
              Modern Prestige
            </h2>
            <p className='mb-12 text-base leading-relaxed text-on-surface-variant md:text-lg'>
              {location.description}
            </p>
            <div className='space-y-8'>
              {location.points.map((point) => (
                <motion.div
                  key={point.number}
                  className='flex items-start gap-6'
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.5,
                    delay: Number(point.number) * 0.1,
                  }}
                >
                  <span className='text-label font-medium tracking-widest text-secondary'>
                    {point.number}.
                  </span>
                  <div>
                    <h4 className='mb-1 text-label font-medium tracking-widest text-primary uppercase'>
                      {point.title}
                    </h4>
                    <p className='text-sm leading-relaxed text-on-surface-variant'>
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className='relative h-150 overflow-hidden bg-surface-container-highest lg:col-span-7'
            initial={{ opacity: 0, scale: 1.03 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className='pointer-events-none absolute inset-0 z-10 bg-primary/5' />
            <Image
              src={location.mapImage}
              alt=''
              layout='fullWidth'
              className='h-full w-full object-cover opacity-80 grayscale'
            />
            <div className='absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
              <div className='relative'>
                <div className='absolute inset-0 animate-ping rounded-full bg-secondary/20' />
                <div className='relative z-30 h-4 w-4 rounded-full border-2 border-surface bg-secondary' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
