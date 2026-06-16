'use client';

import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { allProjects } from '@/data/projects';

type Filter = 'All' | 'Ongoing' | 'Upcoming' | 'Completed';

const filters: Filter[] = ['All', 'Ongoing', 'Upcoming', 'Completed'];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-900/60 text-emerald-100 border-emerald-700',
  Ongoing: 'bg-amber-900/60 text-amber-100 border-amber-700',
  Upcoming: 'bg-sky-900/60 text-sky-100 border-sky-700',
};

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.status === activeFilter);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section.querySelector('[data-e="grid-section"]'),
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            defaults: { ease: 'power3.out' },
          });

          tl.fromTo(
            section.querySelector('[data-e="project-count"]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
          );

          tl.fromTo(
            section.querySelector('[data-e="filter-bar"]'),
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.3',
          );

          tl.fromTo(
            section.querySelectorAll('[data-e="card"]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
            '-=0.2',
          );

          tl.fromTo(
            section.querySelector('[data-e="view-count"]'),
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.2',
          );
        }, section);

        ctrls.push(() => ctx.revert());
      });
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  const handleFilterChange = (f: Filter) => {
    import('gsap/Flip').then(({ Flip }) => {
      import('gsap').then(({ gsap }) => {
        const cards = sectionRef.current?.querySelectorAll('[data-e="card"]');
        if (!cards || cards.length === 0) {
          setActiveFilter(f);
          return;
        }
        const state = Flip.getState(cards);
        setActiveFilter(f);
        requestAnimationFrame(() => {
          Flip.from(state, {
            duration: 0.5,
            ease: 'power3.out',
            absolute: true,
            onEnter: (els) =>
              gsap.fromTo(
                els,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5 },
              ),
            onLeave: (els) =>
              gsap.to(els, { opacity: 0, y: 30, duration: 0.3 }),
          });
        });
      });
    });
  };

  return (
    <section ref={sectionRef} className='bg-surface py-12 md:py-16'>
      <div data-e='grid-section' className='mx-auto max-w-360 px-4 md:px-16'>
        <div
          data-e='project-count'
          className='mb-8 flex items-center justify-between'
        >
          <span className='text-body-sm font-medium text-on-surface-variant'>
            {allProjects.length} Total Projects
          </span>
        </div>

        <div
          data-e='filter-bar'
          className='mb-10 flex flex-wrap gap-2 border-b border-outline-variant pb-4'
        >
          {filters.map((f) => (
            <button
              key={f}
              type='button'
              onClick={() => handleFilterChange(f)}
              className={`rounded-sm px-4 py-2 text-label font-medium tracking-widest uppercase transition-colors ${
                activeFilter === f
                  ? 'bg-secondary text-on-secondary'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {filtered.map((project) => (
            <Link
              key={project.id}
              data-e='card'
              to='/portfolio/$slug'
              params={{ slug: project.slug }}
              className='block'
            >
              <div className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'>
                <div
                  className='absolute inset-0 bg-cover bg-center transition-all duration-[600ms] group-hover:scale-105'
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
                <div className='absolute right-3 top-3'>
                  <span
                    className={`rounded-sm border px-2.5 py-1 text-caption font-medium tracking-widest uppercase ${statusColors[project.status] ?? ''}`}
                  >
                    {project.status}
                  </span>
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
                  <div className='mt-3 flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200'>
                    View Landmark
                    <span className='material-symbols-outlined text-sm'>
                      arrow_right_alt
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div data-e='view-count' className='mt-10 text-center'>
          <p className='text-body-sm text-on-surface-variant'>
            Viewing {filtered.length} of {allProjects.length} projects
          </p>
        </div>
      </div>
    </section>
  );
}
