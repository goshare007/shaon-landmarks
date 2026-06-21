import { Image } from '@unpic/react';
import { useState } from 'react';
import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailFloorPlans({
  floorPlans,
}: {
  floorPlans: ProjectDetail['floorPlans'];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = floorPlans[activeIndex];

  return (
    <section className='border-b border-outline-variant bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-16'>
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

        <div className='overflow-hidden rounded-sm'>
          <Image
            src={activePlan.image}
            alt={`${activePlan.title} floor plan`}
            layout='fullWidth'
            height={800}
            className='h-auto w-full object-cover'
          />
        </div>

        <div className='mt-8 max-w-2xl'>
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
