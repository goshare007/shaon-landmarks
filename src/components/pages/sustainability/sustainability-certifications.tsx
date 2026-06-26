import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const certifications = [
  'RAJUK Certified',
  'REHAB Member',
  'ISO 14001',
  'Green Building Council',
];

export function SustainabilityCertifications() {
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
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
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
      className='relative bg-surface-overlay py-20 md:py-28 border-t border-white/6'
    >
      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-custom/40' />
        <div className='absolute top-0 left-0 h-full w-px bg-custom/40' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/40' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/40' />
      </div>

      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Recognition'
          heading='Certifications &'
          highlight='Recognition'
          highlightStyle='stroke'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <p className='mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
          Our sustainable practices are recognized by leading industry bodies
          and regulatory authorities.
        </p>

        <div
          ref={gridRef}
          className='flex flex-wrap justify-center gap-4'
        >
          {certifications.map((cert) => (
            <div
              key={cert}
              className='group relative overflow-hidden rounded-sm px-6 py-4 transition-all duration-300 hover:-translate-y-0.5'
              style={{
                background: 'rgba(0,0,0,0.45)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
              <span
                className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/60 transition-colors duration-200 group-hover:text-custom'
              >
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
