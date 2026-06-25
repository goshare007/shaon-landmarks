import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import { allProjects } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  location: string;
  date: string;
  image: string;
}

// ── Status badge ────────────────────────────────────────────────────────────

const statusConfig: Record<
  string,
  { dot: string; text: string; border: string }
> = {
  Completed: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-100',
    border: 'border-emerald-700/60',
  },
  Ongoing: {
    dot: 'bg-amber-400',
    text: 'text-amber-100',
    border: 'border-amber-700/60',
  },
  Upcoming: {
    dot: 'bg-sky-400',
    text: 'text-sky-100',
    border: 'border-sky-700/60',
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm ${cfg?.border ?? ''} ${cfg?.text ?? ''}`}
      style={{ background: 'rgba(0,0,0,0.45)' }}
    >
      <span className={`size-1.5 rounded-full ${cfg?.dot ?? ''}`} />
      {status}
    </span>
  );
}

// ── Featured card (hero-sized) ───────────────────────────────────────────────

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link
      to='/portfolio/$slug'
      params={{ slug: project.slug }}
      className='group block'
    >
      <div className='relative min-h-[50vh] md:min-h-[68vh] overflow-hidden rounded-sm'>
        {/* Image */}
        <div className='absolute inset-0'>
          <Image
            src={project.image}
            alt={project.title}
            layout='fullWidth'
            height={800}
            className='h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.03]'
          />
        </div>

        {/* Gradients */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent' />
        <div className='absolute inset-0 bg-gradient-to-r from-black/30 to-transparent' />

        {/* Border overlay */}
        <div className='absolute inset-0 border border-white/[0.07] transition-colors duration-500 group-hover:border-custom/30 rounded-sm' />

        {/* Content */}
        <div className='absolute bottom-0 left-0 right-0 p-8 md:p-12'>
          <StatusBadge status={project.status} />

          <h3 className='mt-4 font-serif text-3xl md:text-[2.6rem] font-light text-white leading-tight'>
            {project.title}
          </h3>

          <div className='flex items-center gap-3 mt-2'>
            <div className='w-4 h-px bg-custom/60' />
            <p className='text-[11px] tracking-[0.15em] uppercase text-white/40'>
              {project.location} · {project.date}
            </p>
          </div>

          <p className='mt-4 max-w-lg text-sm leading-relaxed text-white/55'>
            {project.description}
          </p>

          {/* CTA — slides in on hover */}
          <div className='mt-6 inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] text-custom uppercase opacity-0 -translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0'>
            View Landmark
            <svg
              className='w-3.5 h-3.5'
              viewBox='0 0 16 16'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path d='M2 8h12M9 3l5 5-5 5' />
            </svg>
          </div>
        </div>

        {/* Top-right corner: featured label */}
        <div className='absolute top-6 right-6 md:top-8 md:right-8'>
          <span
            className='text-[9px] font-medium tracking-[0.22em] uppercase text-white/30'
            style={{ writingMode: 'vertical-rl' }}
          >
            Featured
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Grid card ────────────────────────────────────────────────────────────────

function GridCard({ project }: { project: Project }) {
  return (
    <Link
      to='/portfolio/$slug'
      params={{ slug: project.slug }}
      className='group block'
    >
      <div className='relative min-h-64 md:min-h-72 overflow-hidden rounded-sm'>
        {/* Image */}
        <div className='absolute inset-0'>
          <Image
            src={project.image}
            alt={project.title}
            layout='fullWidth'
            height={500}
            className='h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]'
          />
        </div>

        {/* Gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent' />

        {/* Border overlay */}
        <div className='absolute inset-0 border border-white/[0.06] transition-colors duration-500 group-hover:border-custom/25 rounded-sm' />

        {/* Status badge */}
        <div className='absolute top-3 right-3'>
          <StatusBadge status={project.status} />
        </div>

        {/* Content */}
        <div className='absolute bottom-0 left-0 right-0 p-5 md:p-6'>
          <h3 className='font-serif text-base md:text-lg font-light text-white leading-snug'>
            {project.title}
          </h3>
          <p className='mt-1 text-[11px] tracking-[0.1em] text-white/45 uppercase'>
            {project.location}
          </p>
          <p className='mt-0.5 text-[10px] text-white/30'>{project.date}</p>

          {/* CTA */}
          <div className='mt-3 inline-flex items-center gap-1.5 text-[9px] font-medium tracking-[0.18em] text-custom uppercase opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
            View
            <svg
              className='w-3 h-3'
              viewBox='0 0 16 16'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path d='M2 8h12M9 3l5 5-5 5' />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.from(headingRef.current, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 86%',
          once: true,
        },
      });

      // Featured card
      gsap.from(featuredRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuredRef.current,
          start: 'top 84%',
          once: true,
        },
      });

      // Grid cards stagger
      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 84%',
            once: true,
          },
        });
      }

      // Footer CTA
      gsap.from(footerRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const feature =
    allProjects.find((p) => p.slug === 'the-obsidian') ?? allProjects[0];
  const gridProjects = allProjects
    .filter((p) => p.slug !== feature?.slug)
    .slice(0, 4);

  if (!feature) return null;

  return (
    <section
      ref={sectionRef}
      className='bg-white py-20 md:py-28 border-t border-border'
    >
      <div className='container'>
        {/* Heading */}
        <div ref={headingRef} className='mb-12 md:mb-14'>
          <div className='flex items-center gap-4 mb-5'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
              Iconic Developments
            </span>
          </div>
          <h2 className='font-serif text-[clamp(1.7rem,3.2vw,2.6rem)] font-light text-foreground leading-tight max-w-2xl'>
            A curated selection of our most ambitious projects,{' '}
            <span className='italic text-muted-foreground'>
              redefined for modern living.
            </span>
          </h2>
          <div className='mt-6 h-px w-16 bg-custom/40' />
        </div>

        {/* Featured card */}
        <div ref={featuredRef}>
          <FeaturedCard project={feature} />
        </div>

        {/* Grid cards */}
        <div
          ref={gridRef}
          className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
        >
          {gridProjects.map((project) => (
            <GridCard key={project.id} project={project} />
          ))}
        </div>

        {/* Footer CTA */}
        <div ref={footerRef} className='mt-12 flex items-center gap-6'>
          <div className='hidden h-px w-16 bg-custom/30 md:block' />
          <Link
            to='/portfolio'
            search={{ status: '', location: '', search: '' }}
            className='group inline-flex items-center gap-3 rounded-sm border border-border px-6 py-3 text-[11px] font-medium tracking-[0.18em] text-foreground no-underline transition-all duration-200 hover:border-custom hover:text-custom uppercase'
          >
            View All Projects
            <svg
              className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5'
              viewBox='0 0 16 16'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path d='M2 8h12M9 3l5 5-5 5' />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
