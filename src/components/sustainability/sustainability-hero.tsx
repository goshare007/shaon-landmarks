'use client';

import { useRef } from 'react';
import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function SustainabilityHero() {
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
        section.querySelector('[data-hero-content]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
      );
    }, section);

    cleanups.push(() => ctx.revert());
    return cleanups;
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-[50vh] min-h-120 overflow-hidden bg-tertiary'
    >
      <div
        data-hero-bg
        className='absolute inset-0 bg-cover bg-center will-change-transform'
        style={{ backgroundImage: `url(${SustainabilityImg})` }}
      />
      <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
      <div className='relative z-10 flex h-full items-center'>
        <div
          data-hero-content
          className='mx-auto w-full max-w-360 px-4 md:px-16'
        >
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Building Responsibly
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Sustainability</h1>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
            Committed to a greener future through responsible architecture and
            innovative design.
          </p>
        </div>
      </div>
    </section>
  );
}
