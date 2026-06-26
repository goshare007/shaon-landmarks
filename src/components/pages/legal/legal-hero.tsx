import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function LegalHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.legal-hero__content > *', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
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
      className='relative bg-surface-brand py-24 md:py-32 border-b border-white/6 overflow-hidden'
    >
      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/30' />

      <div className='legal-hero__content container'>
        <div className='mb-5 flex items-center gap-4'>
          <div className='w-8 h-px bg-custom' />
          <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
            Compliance & Transparency
          </span>
        </div>
        <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white'>
          Legal{' '}
          <span
            className='italic'
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            }}
          >
            Information
          </span>
        </h1>
        <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'>
          Shaon Landmarks & Housing operates with full regulatory compliance and
          transparency. Below are our certifications, memberships, and legal
          information.
        </p>
      </div>
    </section>
  );
}
