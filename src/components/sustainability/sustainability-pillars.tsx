'use client';

import { useEffect, useRef } from 'react';
import { DynamicIcon } from '@/lib/icon-map';

const pillars = [
  {
    icon: 'ecology',
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
  },
  {
    icon: 'forest',
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
  },
  {
    icon: 'energy_savings_leaf',
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
  },
];

export function SustainabilityPillars() {
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
            section.querySelector('[data-pillars-heading]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
          );

          tl.fromTo(
            section.querySelectorAll('[data-pillars-card]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
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
    <section
      ref={sectionRef}
      className='bg-surface-container-low py-20 md:py-28'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-pillars-heading className='mb-12 text-center'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Our Initiatives
          </span>
          <h2 className='mt-3 text-3xl font-serif text-on-surface sm:text-4xl'>
            Three Pillars of Sustainability
          </h2>
        </div>
        <div className='grid gap-8 md:grid-cols-3'>
          {pillars.map((p) => (
            <div
              key={p.title}
              data-pillars-card
              className='rounded-sm bg-white p-8 transition-transform duration-300 hover:-translate-y-1'
            >
              <DynamicIcon name={p.icon} size={28} className='text-secondary' />
              <h3 className='mb-3 mt-4 text-lg font-serif text-on-surface'>
                {p.title}
              </h3>
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
