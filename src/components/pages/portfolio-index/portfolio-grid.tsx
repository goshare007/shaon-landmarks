import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatusBadge } from '@/components/ui/status-badge';
import { allProjects } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <div ref={headingRef} className='mb-12 md:mb-14'>
          <SectionHeading
            eyebrow='Selected Works'
            heading='Our Portfolio'
            highlight='Landmarks'
            highlightStyle='muted'
          />
        </div>

        {allProjects.length === 0 ? (
          <p className='text-center text-muted-foreground py-12'>
            No projects available yet.
          </p>
        ) : (
          <div
            ref={gridRef}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
          >
            {allProjects.map((project) => (
              <div key={project.id} className='portfolio-grid__card relative'>
                <Link
                  to='/portfolio/$slug'
                  params={{ slug: project.slug }}
                  className='block'
                >
                  <div className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'>
                    <div className='absolute inset-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.03] backface-hidden'>
                      <Image
                        src={project.image}
                        alt={project.title}
                        layout='fullWidth'
                        decoding='async'
                        height={400}
                        loading='lazy'
                        className='h-full w-full object-cover will-change-transform'
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
                      <div className='mt-3 flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase opacity-0 -translate-x-2 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
                        View Landmark
                        <IconArrowRight size={14} aria-hidden='true' />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
