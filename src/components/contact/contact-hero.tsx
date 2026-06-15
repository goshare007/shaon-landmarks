'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import HERO_IMG from '@/assets/images/contact/hero.webp';

export function ContactHero() {
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
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          section.querySelector('[data-hero-image]'),
          { scale: 1.1 },
          { scale: 1, duration: 1.5, ease: 'easeOut' },
        );

        tl.fromTo(
          section.querySelector('[data-hero-eyebrow]'),
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.8',
        );

        tl.fromTo(
          section.querySelector('[data-hero-heading]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.35',
        );

        tl.fromTo(
          section.querySelector('[data-hero-desc]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.35',
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
      className='relative flex h-[90vh] items-center justify-center overflow-hidden'
    >
      <div data-hero-image className='absolute inset-0 z-0'>
        <Image
          src={HERO_IMG}
          alt=''
          layout='fullWidth'
          width={1440}
          height={800}
          className='h-full w-full object-cover brightness-40'
        />
      </div>
      <div className='relative z-10 max-w-4xl px-4 text-center md:px-16'>
        <span
          data-hero-eyebrow
          className='mb-6 block text-label font-medium tracking-[0.4em] text-secondary-fixed-dim uppercase'
        >
          Personalized Service
        </span>
        <h1 data-hero-heading className='heading-hero mb-8 text-on-tertiary'>
          Connect with our Consultants
        </h1>
        <p
          data-hero-desc
          className='mx-auto max-w-2xl text-base leading-relaxed text-on-tertiary/80 md:text-lg'
        >
          At Shaon Landmarks, we believe that exceptional architecture begins
          with a shared vision. Our consultants are prepared to guide you
          through a bespoke development journey tailored to your specific
          requirements.
        </p>
      </div>
    </section>
  );
}
