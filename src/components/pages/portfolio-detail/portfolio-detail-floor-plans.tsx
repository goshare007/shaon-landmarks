import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ProjectDetail } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioDetailFloorPlans({
  floorPlans,
}: {
  floorPlans: ProjectDetail['floorPlans'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const plansRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(plansRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: plansRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='border-b border-border bg-surface-container py-24'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Layouts'
          heading='Floor Plans'
          className='mb-16'
        />

        <div ref={plansRef} className='space-y-24'>
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
                  <div className='w-12 h-px bg-brand mb-6' />
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
