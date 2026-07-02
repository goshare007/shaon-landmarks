import { Image } from '@unpic/react';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ProjectDetail } from '@/content/projects';

export function PortfolioDetailFloorPlans({
  floorPlans,
}: {
  floorPlans: ProjectDetail['floorPlans'];
}) {
  return (
    <section className='border-b border-border bg-surface-raised py-24'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Layouts'
          heading='Floor Plans'
          className='mb-16'
        />

        <div className='space-y-24'>
          {floorPlans.map((plan, i) => (
            <div
              key={plan.title}
              className={`flex flex-col gap-12 md:flex-row ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className='w-full md:w-1/2'>
                <div className='overflow-hidden rounded-sm'>
                  <Image
                    src={plan.image}
                    alt={`${plan.title} floor plan`}
                    layout='fullWidth'
                    decoding='async'
                    height={600}
                    loading='lazy'
                    className='h-auto w-full object-cover'
                  />
                </div>
              </div>
              <div className='flex w-full items-center md:w-1/2 md:px-8'>
                <div>
                  <div className='w-12 h-px bg-custom mb-6' />
                  <h3 className='text-xl font-serif text-foreground md:text-2xl lg:text-3xl'>
                    {plan.title}
                  </h3>
                  <p className='mt-4 leading-relaxed text-muted-foreground'>
                    {plan.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
