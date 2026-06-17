'use client';

import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { allProjects } from '@/data/projects';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

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

const statusStyles: Record<string, string> = {
  Completed: 'bg-emerald-900/60 text-emerald-100 border-emerald-700',
  Ongoing: 'bg-amber-900/60 text-amber-100 border-amber-700',
  Upcoming: 'bg-sky-900/60 text-sky-100 border-sky-700',
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`rounded-sm border px-2.5 py-1 text-caption font-medium tracking-widest uppercase ${statusStyles[status] ?? ''}`}
    >
      {status}
    </span>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Link
      to='/portfolio/$slug'
      params={{ slug: project.slug }}
      className='block'
    >
      <div
        data-el-feature
        className='relative min-h-[50vh] overflow-hidden rounded-sm md:min-h-[70vh]'
      >
        <div
          data-el-feature-image
          className='absolute inset-0'
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            layout='fullWidth'
            width={1200}
            height={800}
            className='h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105'
          />
        </div>
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
        <div className='absolute inset-0 border border-white/5 transition-all duration-500 hover:border-secondary/40' />

        <div
          data-el-feature-text
          className='absolute bottom-0 left-0 right-0 p-8 md:p-12'
        >
          <StatusBadge status={project.status} />
          <h3 className='mt-3 text-3xl font-serif text-white md:text-4xl'>
            {project.title}
          </h3>
          <p className='mt-2 max-w-xl text-sm text-white/60'>
            {project.description}
          </p>
          <p className='mt-4 flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0'>
            View Landmark
            <svg
              className='h-4 w-4'
              viewBox='0 0 16 16'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
              aria-hidden='true'
            >
              <path d='M2 8h12M9 3l5 5-5 5' />
            </svg>
          </p>
        </div>
      </div>
    </Link>
  );
}

function GridCard({ project }: { project: Project }) {
  return (
    <Link
      to='/portfolio/$slug'
      params={{ slug: project.slug }}
      className='group block'
    >
      <div
        data-el-card
        className='relative min-h-72 overflow-hidden rounded-sm md:min-h-80'
      >
        <div
          data-el-card-image
          className='absolute inset-0'
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            layout='fullWidth'
            width={600}
            height={500}
            className='h-full w-full object-cover transition-transform duration-[800ms] group-hover:scale-105'
          />
        </div>
        <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
        <div className='absolute inset-0 border border-white/5 transition-all duration-500 group-hover:border-secondary/30' />

        <div className='absolute right-3 top-3'>
          <StatusBadge status={project.status} />
        </div>

        <div data-el-card-text className='absolute bottom-0 left-0 right-0 p-6'>
          <h3 className='text-lg font-serif text-white'>{project.title}</h3>
          <p className='mt-1 text-sm text-white/60'>{project.location}</p>
          <p className='mt-0.5 text-label text-white/40'>{project.date}</p>
          <div className='mt-3 flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
            View Landmark
            <ArrowRight size={14} aria-hidden='true' />
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap, ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        section.querySelector('[data-el-header]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        section.querySelector('[data-el-header-divider]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: 'left center' },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelector('[data-el-feature-image]'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 1, ease: 'power3.out' },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelector('[data-el-feature-text]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5',
      );

      tl.fromTo(
        section.querySelectorAll('[data-el-card-image]'),
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.8, stagger: 0.12 },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelectorAll('[data-el-card-text]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.5',
      );

      tl.fromTo(
        section.querySelector('[data-el-bottom-line]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, transformOrigin: 'left center' },
        '-=0.2',
      );

      tl.fromTo(
        section.querySelector('[data-el-bottom-cta]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3',
      );
    }, section);

    cleanups.push(() => ctx.revert());

    const featureEl = section.querySelector('[data-el-feature]');
    if (featureEl) {
      const st = ScrollTrigger.create({
        trigger: featureEl,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const img = featureEl.querySelector('[data-el-feature-image]');
          if (img) {
            gsap.set(img, { y: `${self.progress * 10}%` });
          }
        },
      });
      cleanups.push(() => st.kill());
    }

    return cleanups;
  }, []);

  const feature =
    allProjects.find((p) => p.slug === 'the-obsidian') ?? allProjects[0];
  const gridProjects = allProjects
    .filter((p) => p.slug !== feature?.slug)
    .slice(0, 4);

  if (!feature || gridProjects.some((p) => !p)) return null;

  return (
    <section ref={sectionRef} className='bg-white py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-el-header className='mb-12'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Iconic Developments
          </span>
          <h2 className='mt-3 text-3xl leading-tight text-on-surface font-serif sm:text-4xl'>
            A curated selection of our most ambitious projects,
            <br />
            redefined for modern living.
          </h2>
          <div
            data-el-header-divider
            className='mt-6 h-px w-24 bg-secondary origin-left scale-x-0'
          />
        </div>

        <FeaturedCard project={feature} />

        <div className='mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {gridProjects.map((project) => (
            <GridCard key={project.id} project={project} />
          ))}
        </div>

        <div className='mt-12 flex items-center gap-6'>
          <div
            data-el-bottom-line
            className='hidden h-px w-16 bg-secondary origin-left scale-x-0 md:block'
          />
          <Link
            data-el-bottom-cta
            to='/portfolio'
            className='inline-flex items-center gap-3 rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary uppercase'
          >
            View All Projects
            <svg
              className='h-4 w-4'
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
