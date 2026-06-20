'use client';

import { Image } from '@unpic/react';
import { useRef, useState } from 'react';
import type { ProjectDetail } from '@/data/projects';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function PortfolioDetailFloorPlans({
  floorPlans,
}: {
  floorPlans: ProjectDetail['floorPlans'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = floorPlans[activeIndex];

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

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
        section.querySelector('[data-floorplans-header]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
      );

      tl.fromTo(
        section.querySelectorAll('[data-floorplans-tab]'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        '-=0.2',
      );

      tl.fromTo(
        section.querySelector('[data-floorplans-image]'),
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.2',
      );

      tl.fromTo(
        section.querySelector('[data-floorplans-desc]'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.3',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section
      ref={sectionRef}
      className='border-b border-outline-variant bg-surface py-24'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-floorplans-header className='mb-16'>
          <h2 className='text-2xl font-serif text-primary md:text-3xl'>
            Floor Plans
          </h2>
          <p className='mt-2 text-on-surface-variant'>
            Explore the layouts and configurations available
          </p>
        </div>

        <div className='mb-12 flex flex-wrap gap-3'>
          {floorPlans.map((plan, index) => (
            <button
              key={plan.title}
              data-floorplans-tab
              type='button'
              onClick={() => setActiveIndex(index)}
              className={`rounded-sm border px-6 py-3 text-label font-medium tracking-[0.1em] uppercase transition-colors ${
                index === activeIndex
                  ? 'border-secondary bg-secondary text-on-secondary'
                  : 'border-outline-variant text-on-surface hover:border-secondary hover:text-secondary'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div data-floorplans-image className='overflow-hidden rounded-sm'>
          <Image
            src={activePlan.image}
            alt={`${activePlan.title} floor plan`}
            layout='fullWidth'
            width={1200}
            height={800}
            className='h-auto w-full object-cover'
          />
        </div>

        <div data-floorplans-desc className='mt-8 max-w-2xl'>
          <h3 className='text-xl font-serif text-primary md:text-2xl'>
            {activePlan.title}
          </h3>
          <p className='mt-2 leading-relaxed text-on-surface-variant'>
            {activePlan.description}
          </p>
        </div>
      </div>
    </section>
  );
}
