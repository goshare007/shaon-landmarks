import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function BlogCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(contentRef.current?.children ?? []), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-brand py-16 md:py-20 border-t border-white/6'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Stay Informed'
          heading='Get the Latest'
          highlight='Insights'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <div ref={contentRef}>
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
      </div>
    </section>
  );
}
