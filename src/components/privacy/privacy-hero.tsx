'use client';

import { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function PrivacyHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        section.querySelector('[data-hero-content]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-tertiary py-24 md:py-32'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-hero-content>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Legal
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Privacy Policy</h1>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-[#9a9c9c]'>
            Your privacy matters to us. This policy outlines how Shaon Landmarks
            & Housing collects, uses, and protects your personal information.
          </p>
          <p className='mt-2 text-label font-medium tracking-widest text-on-surface-variant uppercase'>
            Last updated: June 2025
          </p>
        </div>
      </div>
    </section>
  );
}
