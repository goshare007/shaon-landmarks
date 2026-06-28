import { IconArrowRight, IconEye } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-cta__content > *', {
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
      className='relative bg-surface-brand py-24 md:py-32 border-t border-white/6 overflow-hidden'
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

      <div className='portfolio-cta__content site-wrapper'>
        <div className='max-w-lg'>
          <div className='mb-5 flex items-center gap-4'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Get in Touch
            </span>
          </div>
          <h2 className='font-serif text-[clamp(1.8rem,4vw,3rem)] font-light leading-tight tracking-[-0.01em] text-white'>
            Interested in a{' '}
            <span
              className='italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              Landmark
            </span>{' '}
            of Your Own?
          </h2>
          <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'>
            Whether you are looking for a premium residential address or a
            commercial space, our team is ready to help you find the perfect
            property.
          </p>
          <div className='mt-8 flex items-center gap-6'>
            <Link
              to='/contact'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3'>
                Start Your Journey
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
            <Link
              to='/services'
              className='inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-white/60 uppercase transition-colors hover:text-white'
            >
              <IconEye size={14} stroke={1.5} />
              Explore Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
