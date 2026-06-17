'use client';

import { Image } from '@unpic/react';
import { useRef } from 'react';
import type { Project, ProjectDetail } from '@/data/projects';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function PortfolioDetailHero({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const cleanups: (() => void)[] = [];

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
        cleanups.push(() => infiniteTween.kill());
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

    cleanups.push(() => ctx.revert());
    return cleanups;
  }, []);

  return (
    <section ref={sectionRef} className='relative h-170 overflow-hidden'>
      <div className='absolute inset-0 z-10 bg-primary/40' />
      <div data-hero-bg className='absolute inset-0 overflow-hidden'>
        <Image
          src={detail.heroImage}
          alt=''
          layout='fullWidth'
          width={1440}
          height={600}
          className='h-full w-full object-cover'
        />
      </div>
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
