import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const stats = [
  { value: '40%', label: 'Energy Reduction' },
  { value: '200+', label: 'Green-Certified Units' },
  { value: 'Zero', label: 'Net Carbon Committed' },
];

export function SustainabilityPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      if (copyRef.current) {
        gsap.from(Array.from(copyRef.current.children), {
          y: 22,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: copyRef.current,
            start: 'top 86%',
            once: true,
          },
        });
      }

      if (statsRef.current) {
        gsap.from(Array.from(statsRef.current.children), {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 88%',
            once: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 border-t border-border'>
      <div className='container'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          {/* Copy */}
          <div ref={copyRef}>
            <SectionHeading
              eyebrow='Our Philosophy'
              heading='Designing for'
              highlight='Generations'
            />
            <p className='mt-5 text-sm leading-relaxed text-muted-foreground'>
              At Shaon Landmarks, sustainability is not an afterthought — it is
              the foundation. Every project begins with a commitment to
              environmental stewardship, community well-being, and enduring
              value. We believe luxury and responsibility are not mutually
              exclusive.
            </p>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className='grid grid-cols-3 divide-x divide-border'
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className='group px-6 text-center first:pl-0 last:pr-0'
              >
                <div className='font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light text-foreground transition-colors duration-300 group-hover:text-custom'>
                  {s.value}
                </div>
                <div className='mx-auto mt-3 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
                <div className='mt-3 text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase'>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
