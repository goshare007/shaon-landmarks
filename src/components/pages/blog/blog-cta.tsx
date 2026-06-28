import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { SectionHeading } from '@/components/ui/section-heading';

export function BlogCta() {
  return (
    <section className='bg-surface-brand py-16 md:py-20 border-t border-white/6'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Stay Informed'
          heading='Get the Latest'
          highlight='Insights'
          highlightStyle='stroke'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <p className='mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
          Subscribe to our newsletter for market updates, buying guides, and
          exclusive property alerts delivered to your inbox.
        </p>

        <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
          <Link
            to='/contact'
            className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10 inline-flex items-center gap-3'>
              Subscribe Now
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </span>
          </Link>
          <Link
            to='/contact'
            className='group inline-flex items-center gap-3 rounded-sm border border-custom/40 px-10 py-3.5 text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase transition-colors duration-200 hover:border-custom hover:text-custom'
          >
            Contact Our Team
            <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Link>
        </div>
      </div>
    </section>
  );
}
