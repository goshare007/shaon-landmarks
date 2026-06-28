import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);

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
