import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function SustainabilityCta() {
  return (
    <section className='bg-surface-brand py-16 md:py-20 border-t border-white/6'>
      <div className='site-wrapper'>
        <div className='flex flex-col items-center text-center'>
          <h2 className='font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-white leading-snug'>
            Build a greener future
          </h2>
          <p className='mt-3 max-w-lg text-sm leading-relaxed text-white/55 font-light'>
            Discover how Shaon Landmarks can bring sustainable luxury to your
            next development.
          </p>

          <div className='mt-6 h-px w-12 bg-custom/50' />

          <Link
            to='/contact'
            className='group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
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
