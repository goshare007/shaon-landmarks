import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioDetailSpecs({
  specs,
}: {
  specs: ProjectDetail['specs'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { label: 'Total Area', value: specs.totalArea },
    { label: 'Units', value: specs.units },
    { label: 'Floor Count', value: specs.floorCount },
    { label: 'Completion', value: specs.completion },
  ];

  return (
    <section
      ref={sectionRef}
      className='border-b border-border bg-surface-container py-20'
    >
      <div className='site-wrapper'>
        <div ref={gridRef} className='grid grid-cols-2 gap-12 md:grid-cols-4'>
          {items.map((item) => (
            <div key={item.label} className='detail-specs__item'>
              <p className='text-[10px] font-medium tracking-[0.15em] text-brand uppercase'>
                {item.label}
              </p>
              <p className='mt-2 text-xl font-serif text-foreground md:text-2xl'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
