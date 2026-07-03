import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function ServicesCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.from(
        ringsRef.current ? Array.from(ringsRef.current.children) : [],
        {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          stagger: 0.15,
          ease: 'power2.out',
        },
        0,
      )
        .from(
          cornersRef.current ? Array.from(cornersRef.current.children) : [],
          { opacity: 0, duration: 0.5, stagger: 0.05 },
          0.1,
        )
        .from(
          contentRef.current ? Array.from(contentRef.current.children) : [],
          { y: 20, opacity: 0, duration: 0.6, stagger: 0.12 },
          0.2,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-surface-brand py-20 md:py-28 border-t border-white/6'
    >
      {/* Concentric rings */}
      <div ref={ringsRef}>
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-125 w-125 rounded-full border border-white/6' />
        </div>
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-187.5 w-187.5 rounded-full border border-white/4' />
        </div>
      </div>

      {/* Corner accents */}
      <div ref={cornersRef}>
        <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
          <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
        </div>
        <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
          <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
        </div>
      </div>

      <div className='relative z-10 site-wrapper'>
        <div ref={contentRef}>
          <SectionHeading
            eyebrow='Get Started'
            heading='Begin Your'
            highlight='Legacy'
            highlightStyle='stroke'
            align='center'
            className='mb-6'
            headingClassName='text-white'
          />
          <p className='mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
            Whether you are a landowner looking for development or an investor
            seeking premium real estate, our experts are ready to consult.
          </p>
          <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
            <Link
              to='/contact'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3'>
                Partner with Us
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
            <Link
              to='/contact'
              className='group inline-flex items-center gap-3 rounded-sm border border-custom/40 px-10 py-3.5 text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase transition-colors duration-200 hover:border-custom hover:text-custom'
            >
              Consult our Experts
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
