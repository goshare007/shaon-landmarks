import {
  IconDiamond,
  IconHourglass,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { pillars } from '@/content/pillars';
import { gsap, MOTION } from '@/lib/gsap';

const ICONS: Record<string, React.ReactNode> = {
  shield: <IconShieldCheck size={24} stroke={1.5} />,
  architecture: <IconDiamond size={24} stroke={1.5} />,
  history_edu: <IconHourglass size={24} stroke={1.5} />,
};

export function AboutMissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      gsap.from(Array.from(cardsRef.current?.children ?? []), {
        y: 32,
        opacity: 0,
        duration: 0.65,
        stagger: 0.12,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden dark-section bg-background py-24 border-t border-white/6'
    >
      <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-brand/30' />
        <div className='absolute top-0 left-0 h-full w-px bg-brand/30' />
      </div>
      <div className='absolute top-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 right-0 w-full h-px bg-brand/30' />
        <div className='absolute top-0 right-0 h-full w-px bg-brand/30' />
      </div>
      <div className='absolute bottom-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 left-0 w-full h-px bg-brand/30' />
        <div className='absolute bottom-0 left-0 h-full w-px bg-brand/30' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-brand/30' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-brand/30' />
      </div>

      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='What We Stand For'
          heading='Three'
          highlight='Pillars'
          headingClassName='max-w-sm text-white'
          className='mb-14'
        />

        <div ref={cardsRef} className='grid md:grid-cols-3 gap-px bg-white/10'>
          {pillars.map((p) => (
            <div
              key={p.id}
              className='bg-background dark-section p-10 md:p-12 transition-colors duration-300'
            >
              <div className='flex items-center justify-center w-12 h-12 rounded-md border border-white/10 text-brand mb-7 transition-all duration-300'>
                {ICONS[p.icon]}
              </div>

              <h3 className='font-serif text-2xl font-light text-white mb-4'>
                {p.title}
              </h3>
              <div className='w-8 h-px bg-brand/40 mb-5 transition-all duration-300' />
              <p className='text-sm leading-relaxed text-white/55'>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
