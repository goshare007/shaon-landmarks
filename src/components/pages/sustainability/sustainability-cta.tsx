import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useRef } from 'react';

export function SustainabilityCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='relative bg-surface-brand py-20 md:py-28 border-t border-white/6 overflow-hidden'
    >
      {/* Dot grid */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-custom/40' />
        <div className='absolute top-0 left-0 h-full w-px bg-custom/40' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/40' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/40' />
      </div>

      <div className='container'>
        <div
          ref={contentRef}
          className='flex flex-col items-center text-center'
        >
          {/* Eyebrow */}
          <div className='mb-7 flex items-center gap-4'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Take Action
            </span>
          </div>

          <h2 className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-white'>
            Build a{' '}
            <span
              className='italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              Greener Future
            </span>
          </h2>

          <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55 font-light'>
            Discover how Shaon Landmarks can bring sustainable luxury to your
            next development.
          </p>

          <div className='mt-5 h-px w-14 bg-custom/50' />

          <Link
            to='/contact'
            className='group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10 inline-flex items-center gap-3'>
              Get in Touch
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
