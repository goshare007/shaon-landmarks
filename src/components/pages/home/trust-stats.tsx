import { useEffect, useRef } from 'react';
import { TRUST_STATS as stats } from '@/content/home';
import { gsap, MOTION } from '@/lib/gsap';

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        gsap.from(Array.from(gridRef.current.children), {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
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
      className='border-y border-border bg-white py-14 md:py-16'
    >
      <div className='container'>
        <h2 className='sr-only'>Company Statistics</h2>
        <div ref={gridRef} className='grid grid-cols-2 md:grid-cols-4'>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group flex flex-col items-center justify-center gap-2 px-6 py-8 text-center transition-colors duration-300 hover:bg-surface-raised ${
                i < stats.length - 1 ? 'border-r border-border' : ''
              }`}
            >
              {/* Value */}
              <span className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-foreground transition-colors duration-300 group-hover:text-custom'>
                {stat.value}
              </span>

              {/* Expanding rule */}
              <div className='h-px w-6 bg-custom/30 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />

              {/* Label */}
              <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
