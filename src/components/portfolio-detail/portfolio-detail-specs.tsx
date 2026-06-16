'use client';

import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailSpecs({
  specs,
}: {
  specs: ProjectDetail['specs'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  const items = [
    { label: 'Total Area', value: specs.totalArea },
    { label: 'Units', value: specs.units },
    { label: 'Floor Count', value: specs.floorCount },
    { label: 'Completion', value: specs.completion },
  ];

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
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            defaults: { ease: 'power3.out' },
          });

          tl.fromTo(
            section.querySelectorAll('[data-spec-item]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
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
      className='border-b border-outline-variant bg-surface py-20'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid grid-cols-2 gap-12 md:grid-cols-4'>
          {items.map((item) => (
            <div key={item.label} data-spec-item>
              <p className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                {item.label}
              </p>
              <p className='mt-2 text-xl font-serif text-primary md:text-2xl'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
