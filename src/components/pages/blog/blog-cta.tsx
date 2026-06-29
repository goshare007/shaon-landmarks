import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { buttonVariants } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';

export function BlogCta() {
  return (
    <section className='bg-surface-brand py-16 md:py-20 border-t border-white/6'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Stay Informed'
          heading='Get the Latest'
          highlight='Insights'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <p className='mx-auto mb-8 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
          Subscribe to our newsletter for market updates, buying guides, and
          exclusive property alerts delivered to your inbox.
        </p>

        <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
          <div className='group'>
            <Link
              to='/contact'
              className={`${buttonVariants({ variant: 'custom' })} py-6 px-10 uppercase text-[11px] font-medium tracking-[0.15em]`}
            >
              <span className='relative z-10 inline-flex items-center gap-3'>
                Subscribe Now
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
          </div>
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
