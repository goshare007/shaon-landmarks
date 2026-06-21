'use client';

import { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function BlogHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelector('[data-e="content"]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative border-b border-outline-variant bg-tertiary pb-16 pt-24 md:pb-20 md:pt-32'
    >
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary)_0%,_transparent_60%)] opacity-10' />
      <div className='relative z-10 mx-auto max-w-360 px-4 md:px-16'>
        <div data-e='content'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Insights & Guides
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Blog</h1>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-[#d6d8d8]'>
            Market trends, buying guides, architecture insights, and tips for
            making informed real estate decisions in Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}
