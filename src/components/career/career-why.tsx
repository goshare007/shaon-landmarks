'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import CAREER_TEAM from '@/assets/images/career/team.webp';

const benefits = [
  'Work on iconic projects across Bangladesh',
  'Collaborate with industry-leading architects and engineers',
  'Competitive compensation and growth opportunities',
  'Culture of innovation and continuous learning',
];

export function CareerWhy() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

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
            section.querySelector('[data-why-text]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelector('[data-why-image]'),
            { opacity: 0, scale: 1.03 },
            { opacity: 1, scale: 1, duration: 0.8 },
            '-=0.4',
          );
        }, section);

        ctrls.push(() => ctx.revert());
      });
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div data-why-text>
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Why Shaon Landmarks
            </span>
            <h2 className='mt-3 text-3xl leading-tight font-serif text-on-surface sm:text-4xl'>
              Shape the Skyline of Tomorrow
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base'>
              At Shaon Landmarks, we believe that great architecture is built by
              great people. We offer a collaborative environment where
              creativity meets precision, and every team member contributes to
              landmarks that define generations.
            </p>
            <div className='mt-8 space-y-4'>
              {benefits.map((item) => (
                <div key={item} className='flex items-start gap-3'>
                  <span className='mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary' />
                  <span className='text-sm text-on-surface-variant'>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            data-why-image
            className='aspect-4/3 overflow-hidden border border-outline-variant bg-surface-container-low'
          >
            <Image
              src={CAREER_TEAM}
              alt='Team collaboration'
              layout='fullWidth'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
