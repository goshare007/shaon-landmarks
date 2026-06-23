import { Image } from '@unpic/react';
import type { Project, ProjectDetail } from '@/content/projects';

export function PortfolioDetailHero({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  return (
    <section className='relative h-170 overflow-hidden'>
      <div className='absolute inset-0 z-10 bg-primary/40' />
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src={detail.heroImage}
          alt=''
          layout='fullWidth'
          height={600}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='absolute inset-0 z-20 mx-auto flex max-w-360 flex-col justify-end px-4 pb-24 md:px-16'>
        <div className='mb-6 flex items-center gap-4'>
          <span className='bg-secondary px-4 py-1 text-label font-medium tracking-[0.2em] text-on-secondary uppercase'>
            {project.status}
          </span>
          <div className='h-px w-24 bg-secondary' />
          <span className='text-label font-medium tracking-[0.2em] text-white/80 uppercase'>
            {project.location}
          </span>
        </div>
        <h1 className='heading-hero max-w-3xl text-white'>
          {project.title.split(' ').map((word, i, arr) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: words from static string — stable order
            <span key={i}>
              {word}
              {i === Math.floor(arr.length / 2) - 1 ? <br /> : ' '}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
}
