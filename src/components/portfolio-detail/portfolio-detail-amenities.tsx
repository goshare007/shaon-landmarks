'use client';

import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailAmenities({
  amenities,
}: {
  amenities: ProjectDetail['amenities'];
}) {
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
            section.querySelector('[data-amenities-header]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
          );

          tl.fromTo(
            section.querySelectorAll('[data-amenities-card]'),
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
            '-=0.3',
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
    <section ref={sectionRef} className='bg-primary py-32 text-on-primary'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-amenities-header className='mb-24 max-w-2xl'>
          <h2 className='mb-6 text-3xl font-serif md:text-4xl lg:text-5xl'>
            Elevating the <br />
            Daily Experience
          </h2>
          <p className='text-base leading-relaxed text-on-primary-container md:text-lg'>
            We have curated a selection of amenities that mirror the needs of a
            global citizen, focusing on wellness, security, and effortless
            service.
          </p>
        </div>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {amenities.map((a) => (
            <div
              key={a.title}
              data-amenities-card
              className='border-l border-outline-variant py-4 pl-8'
            >
              <span
                className='material-symbols-outlined mb-6 text-4xl text-secondary'
                aria-hidden='true'
              >
                {a.icon}
              </span>
              <h3 className='mb-4 font-serif text-xl md:text-2xl'>{a.title}</h3>
              <p className='text-sm leading-relaxed text-on-primary-container md:text-base'>
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
