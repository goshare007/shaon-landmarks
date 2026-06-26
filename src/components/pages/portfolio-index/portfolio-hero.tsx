import { Image } from '@unpic/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import HERO_IMG from '@/assets/images/projects/the-obsidian.webp';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-hero__content > *', {
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
      className='relative h-[50vh] min-h-120 overflow-hidden bg-surface-brand'
    >
      {/* Background image */}
      <div className='absolute inset-0 overflow-hidden'>
        <Image
          src={HERO_IMG}
          alt=''
          layout='fullWidth'
          height={600}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />

      {/* Corner accents — above the overlay so they're visible */}
      <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />

      <div className='relative z-10 flex h-full items-center'>
        <div className='portfolio-hero__content container'>
          <div className='mb-5 flex items-center gap-4'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Selected Works
            </span>
          </div>
          <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white'>
            Our{' '}
            <span
              className='italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              Landmarks
            </span>
          </h1>
          <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'>
            A curated portfolio of architectural excellence across Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}
