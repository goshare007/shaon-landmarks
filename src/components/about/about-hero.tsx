'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import HERO_IMAGE from '@/assets/images/about/hero.webp';

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 6,
  duration: Math.random() * 4 + 5,
}));

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap').then(({ gsap }) => {
      const section = sectionRef.current;
      if (!section) return;

      const headline = section.querySelector('[data-hero-headline]');
      if (!headline) return;

      const lines = headline.children;
      for (const line of lines) {
        const text = line.textContent || '';
        line.textContent = '';
        for (const char of text) {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = 'char';
          line.appendChild(span);
        }
      }

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          section.querySelector('[data-hero-eyebrow]'),
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
        );

        tl.fromTo(
          headline.querySelectorAll('.char'),
          { opacity: 0, y: 30, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.025 },
          '-=0.3',
        );

        tl.fromTo(
          section.querySelector('[data-hero-desc]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.2',
        );

        tl.fromTo(
          section.querySelector('[data-hero-quote]'),
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5 },
          '-=0.1',
        );
      }, section);

      ctrls.push(() => ctx.revert());
    });

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const img = section?.querySelector('[data-hero-image]');
        if (!section || !img) return;

        const st = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            gsap.set(img, { y: `${self.progress * 12}%` });
          },
        });

        ctrls.push(() => st.kill());
      });
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section ref={sectionRef} className='relative overflow-hidden bg-tertiary'>
      <div className='mx-auto grid min-h-179 max-w-360 md:grid-cols-2'>
        <div className='z-10 flex flex-col justify-center px-4 py-20 text-on-tertiary md:px-16'>
          <span
            data-hero-eyebrow
            className='mb-4 text-label font-medium tracking-[0.2em] text-secondary-fixed-dim uppercase'
          >
            Established Excellence
          </span>
          <h1 data-hero-headline className='heading-hero'>
            <span className='block'>A Legacy of</span>
            <span className='block'>Integrity</span>
          </h1>
          <p
            data-hero-desc
            className='mt-6 max-w-lg text-base leading-relaxed text-on-tertiary-fixed-variant md:text-lg'
          >
            Crafting landmarks that stand as a testament to architectural
            precision and unwavering commitment in the heart of Bangladesh.
          </p>
          <div data-hero-quote className='mt-10 flex gap-4'>
            <div className='mt-2 h-px w-12 shrink-0 bg-secondary-fixed-dim' />
            <p className='max-w-sm text-sm italic leading-relaxed text-on-tertiary-container'>
              &ldquo;We don&apos;t just build structures; we cultivate trust
              through every brick laid and every promise kept.&rdquo;
            </p>
          </div>
        </div>

        <div className='relative h-100 overflow-hidden md:h-full'>
          <div data-hero-image className='h-full w-full'>
            <Image
              src={HERO_IMAGE}
              alt=''
              layout='fullWidth'
              className='h-full w-full object-cover'
            />
          </div>

          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            {PARTICLES.map((p) => (
              <div
                key={p.id}
                className='absolute rounded-full'
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: 'rgba(238,189,142,0.2)',
                  animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}
          </div>

          <div className='absolute inset-0 hidden bg-linear-to-r from-tertiary/60 to-transparent md:block' />
        </div>
      </div>
    </section>
  );
}
