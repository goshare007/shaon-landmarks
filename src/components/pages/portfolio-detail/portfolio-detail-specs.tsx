import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/content/projects';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioDetailSpecs({
  specs,
}: {
  specs: ProjectDetail['specs'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const items = [
    { label: 'Total Area', value: specs.totalArea },
    { label: 'Units', value: specs.units },
    { label: 'Floor Count', value: specs.floorCount },
    { label: 'Completion', value: specs.completion },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-specs__item', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='border-b border-border bg-surface-raised py-20'
    >
      <div className='container'>
        <div className='grid grid-cols-2 gap-12 md:grid-cols-4'>
          {items.map((item) => (
            <div key={item.label} className='detail-specs__item'>
              <p className='text-[10px] font-medium tracking-[0.15em] text-custom uppercase'>
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
