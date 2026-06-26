import { IconLeaf, IconSolarPanel, IconTree } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const pillars = [
  {
    icon: IconLeaf,
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
  },
  {
    icon: IconTree,
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
  },
  {
    icon: IconSolarPanel,
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
  },
];

export function SustainabilityPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 86%',
          once: true,
        },
      });
      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          y: 28,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 84%',
            once: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-raised py-20 md:py-28 border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Our Initiatives'
          heading='Three Pillars of'
          highlight='Sustainability'
          align='center'
          className='mb-12'
        />

        <div ref={gridRef} className='grid gap-6 md:grid-cols-3'>
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className='group relative border border-border bg-card p-8 md:p-10 transition-colors duration-500 hover:border-custom/25'
              >
                {/* Top accent draw */}
                <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />

                {/* Icon container */}
                <div className='flex items-center justify-center w-11 h-11 rounded-md border border-border bg-background text-custom transition-all duration-300 group-hover:border-custom/30 group-hover:shadow-sm'>
                  <Icon size={20} stroke={1.5} aria-hidden='true' />
                </div>

                <h3 className='mb-3 mt-6 font-serif text-base font-light text-foreground'>
                  {p.title}
                </h3>

                {/* Expanding rule */}
                <div className='mb-4 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />

                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {p.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
