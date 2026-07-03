import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';
import { cn } from '@/lib/utils';

const MILESTONES = [
  {
    year: '2008',
    title: 'Founded',
    description:
      'Shaon Landmarks & Housing was established with a single vision: to redefine the real estate landscape of Bangladesh through transparency and architectural innovation.',
  },
  {
    year: '2012',
    title: 'First Landmark Delivered',
    description:
      'Completed our first residential project, setting the standard for build quality and timely handover that would become our hallmark.',
  },
  {
    year: '2016',
    title: '10 Projects Milestone',
    description:
      'Reached a decade of expertise with 10 completed projects, earning the trust of hundreds of families across Dhaka.',
  },
  {
    year: '2020',
    title: 'REHAB Membership',
    description:
      'Joined the Real Estate & Housing Association of Bangladesh, reinforcing our commitment to ethical practices and industry standards.',
  },
  {
    year: '2024',
    title: '48+ Projects & Growing',
    description:
      'Expanded our portfolio to over 48 landmark projects, serving more than 500 families with uncompromising quality.',
  },
];

function CornerAccents() {
  return (
    <>
      <div className='absolute top-0 left-0 w-6 h-6' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
        <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
      </div>
      <div className='absolute bottom-0 right-0 w-6 h-6' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
      </div>
    </>
  );
}

function MilestoneCard({ m }: { m: (typeof MILESTONES)[number] }) {
  return (
    <div className='group relative border border-border/50 bg-background rounded-sm p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-custom/20'>
      <CornerAccents />
      <h3 className='font-serif text-xl font-light text-foreground'>
        {m.title}
      </h3>
      <div className='w-8 h-px bg-custom/40 mt-3 mb-4 transition-all duration-300 group-hover:w-14 group-hover:bg-custom' />
      <p className='text-sm leading-relaxed text-muted-foreground'>
        {m.description}
      </p>
    </div>
  );
}

function DesktopYear({ year }: { year: string }) {
  return (
    <span className='block font-serif text-[clamp(2.5rem,4vw,3.5rem)] font-light text-custom leading-none mt-2'>
      {year}
    </span>
  );
}

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);

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

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        scrollTrigger: {
          trigger: milestonesRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(
        milestonesRef.current ? Array.from(milestonesRef.current.children) : [],
        {
          y: 36,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          scrollTrigger: {
            trigger: milestonesRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='bg-white py-24 border-t border-border'>
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Our Journey'
          heading='Built on'
          highlight='Experience'
          align='center'
          className='mb-16'
        />

        <div className='relative max-w-4xl mx-auto'>
          <div
            ref={lineRef}
            className='absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-custom/40 to-transparent md:-translate-x-px'
          />

          <div ref={milestonesRef} className='space-y-16 md:space-y-20'>
            {MILESTONES.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={m.year}
                  className='relative grid md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-10 items-start'
                >
                  <div className='absolute left-6 md:relative md:flex md:justify-center z-10 md:order-2'>
                    <div className='w-4 h-4 rounded-full bg-custom ring-[3px] ring-white shadow-sm mt-2' />
                  </div>

                  <div className='md:hidden pl-14'>
                    <span className='inline-block px-2.5 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase text-custom border border-custom/30 rounded-sm mb-3'>
                      {m.year}
                    </span>
                    <MilestoneCard m={m} />
                  </div>

                  <div
                    className={cn(
                      'hidden md:block md:order-1 md:pr-10',
                      isEven && 'text-right',
                    )}
                  >
                    {isEven ? (
                      <DesktopYear year={m.year} />
                    ) : (
                      <MilestoneCard m={m} />
                    )}
                  </div>

                  <div className='hidden md:block md:order-3 md:pl-10'>
                    {isEven ? (
                      <MilestoneCard m={m} />
                    ) : (
                      <DesktopYear year={m.year} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
