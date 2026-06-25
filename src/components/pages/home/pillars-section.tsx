import {
  IconDiamond,
  IconHourglass,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { pillars } from '@/content/pillars';
import { gsap, MOTION } from '@/lib/gsap';

// Map pillar id → Tabler React icon component
const ICONS: Record<string, React.ReactNode> = {
  '1': <IconShieldCheck size={20} stroke={1.5} />,
  '2': <IconDiamond size={20} stroke={1.5} />,
  '3': <IconHourglass size={20} stroke={1.5} />,
};

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          y: 32,
          opacity: 0,
          duration: 0.65,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 82%',
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
        {/* Section heading */}
        <div ref={headingRef} className='mb-16 md:mb-20'>
          <div className='flex items-center gap-4 mb-5'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
              What We Stand For
            </span>
          </div>
          <h2 className='font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-foreground leading-tight max-w-sm'>
            Built on three{' '}
            <span className='italic text-muted-foreground'>
              immovable pillars
            </span>
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className='grid md:grid-cols-3 gap-6'>
          {pillars.map((pillar) => (
            <Card
              key={pillar.id}
              className='group relative overflow-hidden rounded-sm border-border bg-card shadow-none transition-shadow duration-300 hover:shadow-md'
            >
              {/* Top accent line — draws in on hover */}
              <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />

              <CardContent className='flex flex-col gap-5 p-8 md:p-10'>
                {/* Icon container */}
                <div className='flex items-center justify-center w-11 h-11 rounded-md border border-border bg-background text-custom transition-all duration-300 group-hover:border-custom/30 group-hover:shadow-sm'>
                  {ICONS[pillar.id]}
                </div>

                {/* Title + rule + description */}
                <div className='flex flex-col gap-3 flex-1'>
                  <h3 className='font-serif text-xl font-light text-foreground tracking-wide'>
                    {pillar.title}
                  </h3>
                  <div className='w-8 h-px bg-custom/40 transition-all duration-300 group-hover:w-14 group-hover:bg-custom' />
                  <p className='text-sm leading-relaxed text-neutral-700 mt-1'>
                    {pillar.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
