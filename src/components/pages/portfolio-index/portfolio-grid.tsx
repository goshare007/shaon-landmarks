import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatusBadge } from '@/components/ui/status-badge';
import { allProjects } from '@/content/projects';

export function PortfolioGrid() {
  return (
    <section className='py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <div className='mb-12 md:mb-14'>
          <SectionHeading
            eyebrow='Selected Works'
            heading='Our Portfolio'
            highlight='Landmarks'
            highlightStyle='muted'
          />
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {allProjects.map((project) => (
            <div key={project.id} className='portfolio-grid__card relative'>
              <Link
                to='/portfolio/$slug'
                params={{ slug: project.slug }}
                className='block'
              >
                <div className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'>
                  <div className='absolute inset-0 overflow-hidden transition-transform duration-900 ease-out group-hover:scale-[1.03]'>
                    <Image
                      src={project.image}
                      alt=''
                      layout='fullWidth'
                      height={400}
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
                  <div className='absolute right-3 top-3'>
                    <StatusBadge status={project.status} />
                  </div>
                  <div className='absolute bottom-0 left-0 right-0 p-6'>
                    <h3 className='text-lg font-serif text-white'>
                      {project.title}
                    </h3>
                    <p className='mt-1 text-sm text-white/60'>
                      {project.location}
                    </p>
                    <p className='mt-0.5 text-label text-white/40'>
                      {project.date}
                    </p>
                    <div className='mt-3 flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
                      View Landmark
                      <IconArrowRight size={14} aria-hidden='true' />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
