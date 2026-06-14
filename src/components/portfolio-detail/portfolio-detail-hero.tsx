'use client';

import { useEffect, useRef } from 'react';
import type { Project, ProjectDetail } from '@/data/projects';
import { loadGsap } from '@/lib/gsap-loader';

export function PortfolioDetailHero({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    loadGsap().then(({ gsap }) => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        const bg = section.querySelector('[data-hero-bg]');
        if (bg) {
          gsap.set(bg, { scale: 1 });
          const infiniteTween = gsap.to(bg, {
            scale: 1.08,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'easeInOut',
          });
          ctrls.push(() => infiniteTween.kill());
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          section.querySelector('[data-hero-meta]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
        );

        tl.fromTo(
          section.querySelector('[data-hero-heading]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.3',
        );
      }, section);

      ctrls.push(() => ctx.revert());
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section ref={sectionRef} className='relative h-170 overflow-hidden'>
      <div className='absolute inset-0 z-10 bg-primary/40' />
      <div
        data-hero-bg
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${detail.heroImage})` }}
      />
      <div className='absolute inset-0 z-20 mx-auto flex max-w-360 flex-col justify-end px-4 pb-24 md:px-16'>
        <div data-hero-meta className='mb-6 flex items-center gap-4'>
          <span className='bg-secondary px-4 py-1 text-label font-medium tracking-[0.2em] text-on-secondary uppercase'>
            {project.status}
          </span>
          <div className='h-px w-24 bg-secondary' />
          <span className='text-label font-medium tracking-[0.2em] text-white/80 uppercase'>
            {project.location}
          </span>
        </div>
        <h1 data-hero-heading className='heading-hero max-w-3xl text-white'>
          {project.title.split(' ').map((word, i, arr) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static word order
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
