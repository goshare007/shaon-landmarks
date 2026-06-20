'use client';

import { Link } from '@tanstack/react-router';
import { ArrowLeft, Printer } from 'lucide-react';
import { useRef } from 'react';
import type { Project } from '@/data/projects';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function PortfolioDetailSimple({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const bg = section.querySelector('[data-simple-bg]');
      if (bg) {
        gsap.set(bg, { scale: 1 });
        const infiniteTween = gsap.to(bg, {
          scale: 1.1,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'easeInOut',
        });
        cleanups.push(() => infiniteTween.kill());
      }

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        section.querySelector('[data-simple-heading]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        section.querySelector('[data-simple-desc]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.35',
      );
    }, section);

    cleanups.push(() => ctx.revert());
    return cleanups;
  }, []);

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
      <section
        ref={sectionRef}
        className='relative h-[60vh] min-h-96 overflow-hidden'
      >
        <div
          data-simple-bg
          className='absolute inset-0 bg-cover bg-center'
          style={{ backgroundImage: `url(${project.image})` }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
        <div className='relative z-10 flex h-full items-end pb-20'>
          <div className='mx-auto w-full max-w-360 px-4 md:px-16'>
            <h1 data-simple-heading className='heading-hero text-white'>
              {project.title}
            </h1>
            <p
              data-simple-desc
              className='mt-4 max-w-xl text-base text-white/60'
            >
              {project.description}
            </p>
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
              <ArrowLeft size={16} aria-hidden='true' />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
