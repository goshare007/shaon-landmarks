import { useEffect, useRef } from 'react';
import { TRUST_STATS as stats } from '@/content/home';
import { gsap, MOTION } from '@/lib/gsap';

// Splits "500+" → { prefix: '', number: 500, suffix: '+' }
// Splits "A+" → { prefix: '', number: null, suffix: '' } (non-numeric, skip count-up)
function parseStatValue(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!match) return { prefix: '', number: null, suffix: value };
  const [, prefix, numStr, suffix] = match;
  return { prefix, number: Number(numStr), suffix };
}

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      // Reveal the cells
      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Count up each numeric stat
      stats.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (!el) return;

        const { prefix, number, suffix } = parseStatValue(stat.value);
        if (number === null) return; // non-numeric, leave static text as-is

        const isDecimal = !Number.isInteger(number);
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: number,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            const display = isDecimal
              ? proxy.val.toFixed(1)
              : Math.round(proxy.val).toString();
            el.textContent = `${prefix}${display}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='border-y border-border bg-white py-14 md:py-16'
    >
      <div className='site-wrapper'>
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
              <span
                ref={(el) => {
                  valueRefs.current[i] = el;
                }}
                className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-foreground transition-colors duration-300 group-hover:text-custom'
              >
                {MOTION && parseStatValue(stat.value).number !== null
                  ? `0${parseStatValue(stat.value).suffix}`
                  : stat.value}
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
