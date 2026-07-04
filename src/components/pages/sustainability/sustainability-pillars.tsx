import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import ENERGY_EFFICIENCY from '@/assets/images/sustainability/energy-efficiency.webp';
import GREEN_SPACES from '@/assets/images/sustainability/green-spaces.webp';
import SUSTAINABLE_MATERIALS from '@/assets/images/sustainability/sustainable-materials.webp';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const pillars = [
  {
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
    image: SUSTAINABLE_MATERIALS,
    alt: 'Eco-friendly building materials',
  },
  {
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
    image: GREEN_SPACES,
    alt: 'Lush green landscape design',
  },
  {
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
    image: ENERGY_EFFICIENCY,
    alt: 'Energy efficient building design',
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
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
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
      className='bg-surface-container py-20 md:py-28 border-t border-border'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Our Initiatives'
          heading='Three Pillars of'
          highlight='Sustainability'
          align='center'
          className='mb-12'
        />

        <div ref={gridRef} className='grid gap-6 md:grid-cols-3'>
          {pillars.map((p) => (
            <div
              key={p.title}
              className='group border border-border bg-card overflow-hidden rounded-sm transition-colors duration-500 hover:border-brand/25'
            >
              <div className='aspect-[16/9] overflow-hidden'>
                <Image
                  src={p.image}
                  alt={p.alt}
                  layout='fullWidth'
                  decoding='async'
                  width={800}
                  height={400}
                  loading='lazy'
                  className='h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]'
                />
              </div>

              <div className='p-6 md:p-8'>
                <h3 className='font-serif text-base font-light text-foreground'>
                  {p.title}
                </h3>
                <div className='my-3 w-6 h-px bg-brand/40 transition-all duration-300 group-hover:w-10 group-hover:bg-brand' />
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
