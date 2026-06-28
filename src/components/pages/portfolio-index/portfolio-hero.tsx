import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-hero__content > *', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-surface-brand py-24 md:py-32 border-t border-white/6'
    >
      <div className='absolute top-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/30' />

      <div className='portfolio-hero__content site-wrapper'>
        <SectionHeading
          eyebrow='Selected Works'
          heading='Our Portfolio'
          highlight='Landmarks'
          highlightStyle='muted'
          headingClassName='text-white'
        />
        <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'>
          A curated portfolio of architectural excellence across Bangladesh.
        </p>
      </div>
    </section>
  );
}
