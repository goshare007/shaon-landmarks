import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.from(
        cornersRef.current ? Array.from(cornersRef.current.children) : [],
        { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.03 },
        0,
      )
        .from(headingRef.current, { y: 26, opacity: 0, duration: 0.7 }, 0.15)
        .from(paraRef.current, { y: 14, opacity: 0, duration: 0.6 }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden dark-section bg-background py-24 md:py-32 border-t border-white/6'
    >
      <div ref={cornersRef}>
        <div className='absolute top-0 left-0 w-10 h-px bg-brand/30' />
        <div className='absolute top-0 left-0 w-px h-10 bg-brand/30' />
        <div className='absolute top-0 right-0 w-10 h-px bg-brand/30' />
        <div className='absolute top-0 right-0 w-px h-10 bg-brand/30' />
        <div className='absolute bottom-0 left-0 w-10 h-px bg-brand/30' />
        <div className='absolute bottom-0 left-0 w-px h-10 bg-brand/30' />
        <div className='absolute bottom-0 right-0 w-10 h-px bg-brand/30' />
        <div className='absolute bottom-0 right-0 w-px h-10 bg-brand/30' />
      </div>

      <div className='portfolio-hero__content site-wrapper'>
        <SectionHeading
          ref={headingRef}
          as='h1'
          eyebrow='Selected Works'
          heading='Our Portfolio'
          highlight='Landmarks'
          highlightStyle='muted'
          headingClassName='text-white'
        />
        <p
          ref={paraRef}
          className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'
        >
          A curated portfolio of architectural excellence across Bangladesh.
        </p>
      </div>
    </section>
  );
}
