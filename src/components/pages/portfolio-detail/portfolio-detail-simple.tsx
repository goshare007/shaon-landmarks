import { Link } from '@tanstack/react-router';
import type { Project } from '@/content/projects';

export function PortfolioDetailSimple({ project }: { project: Project }) {
  return (
    <main>
      <section className='relative h-[60vh] min-h-96 overflow-hidden bg-surface-brand'>
        <div
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
        {/* Corner accents */}
        <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />
        <div className='relative z-10 flex h-full items-end pb-20'>
          <div className='site-wrapper'>
            <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white'>
              {project.title}
            </h1>
            <p className='mt-4 max-w-xl text-sm leading-relaxed text-white/55'>
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section className='bg-surface-raised py-24'>
        <div className='site-wrapper'>
          <div className='grid gap-8 md:grid-cols-3'>
            <div>
              <p className='text-[10px] font-medium tracking-widest text-custom uppercase'>
                Status
              </p>
              <p className='mt-1 text-lg font-serif text-foreground'>
                {project.status}
              </p>
            </div>
            <div>
              <p className='text-[10px] font-medium tracking-widest text-custom uppercase'>
                Location
              </p>
              <p className='mt-1 text-lg font-serif text-foreground'>
                {project.location}
              </p>
            </div>
            <div>
              <p className='text-[10px] font-medium tracking-widest text-custom uppercase'>
                {project.date.includes(':') ? 'Timeline' : 'Launch'}
              </p>
              <p className='mt-1 text-lg font-serif text-foreground'>
                {project.date}
              </p>
            </div>
          </div>
          <div className='mt-12'>
            <Link
              to='/portfolio'
              className='inline-flex items-center gap-2 text-[10px] font-medium tracking-widest text-muted-foreground uppercase transition-colors hover:text-custom'
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
