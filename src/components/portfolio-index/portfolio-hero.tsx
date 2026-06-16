'use client';

import { useEffect, useRef } from 'react';
import HERO_IMG from '@/assets/images/projects/the-obsidian.webp';

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap').then(({ gsap }) => {
      const section = sectionRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        const infiniteTween = gsap.to(section.querySelector('[data-e="bg"]'), {
          scale: 1.1,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: 'easeInOut',
        });
        ctrls.push(() => infiniteTween.kill());

        gsap.fromTo(
          section.querySelector('[data-e="content"]'),
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        );
      }, section);

      ctrls.push(() => ctx.revert());
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-[50vh] min-h-120 overflow-hidden bg-tertiary'
    >
      <div
        data-e='bg'
        className='absolute inset-0 bg-cover bg-center will-change-transform'
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
      <div className='relative z-10 flex h-full items-center'>
        <div
          data-e='content'
          className='mx-auto w-full max-w-360 px-4 md:px-16'
        >
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Selected Works
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Our Landmarks</h1>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
            A curated portfolio of architectural excellence across Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}
