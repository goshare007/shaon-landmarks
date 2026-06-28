import { Image } from '@unpic/react';
import { useRef } from 'react';
import type { Project, ProjectDetail } from '@/content/projects';

export function PortfolioDetailHero({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className='relative h-170 overflow-hidden bg-surface-brand'
    >
      <div className='absolute inset-0 z-10 bg-surface-brand/40' />
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src={detail.heroImage}
          alt=''
          layout='fullWidth'
          height={600}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Corner accents */}
      <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />

      <div className='absolute inset-0 z-20 mx-auto flex container flex-col justify-end pb-24'>
        <div className='detail-hero__content'>
          <div className='mb-6 flex items-center gap-4'>
            <span className='bg-custom px-4 py-1 text-[10px] font-medium tracking-[0.2em] text-white uppercase'>
              {project.status}
            </span>
            <div className='h-px w-24 bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.2em] text-white/80 uppercase'>
              {project.location}
            </span>
          </div>
          <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white max-w-3xl'>
            {project.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
