'use client';

import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export function CareerCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            defaults: { ease: 'power3.out' },
          });

          tl.fromTo(
            section.querySelector('[data-cta-content]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelector('[data-cta-btn]'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.3',
          );
        }, section);

        ctrls.push(() => ctx.revert());
      });
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section ref={sectionRef} className='bg-tertiary py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <div data-cta-content>
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Don&apos;t See the Right Role?
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              We are always on the lookout for exceptional talent. Send us your
              CV and we will keep you in mind for future opportunities.
            </p>
          </div>
          <Link
            data-cta-btn
            to='/contact'
            className='mt-8 inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary no-underline uppercase transition-all hover:opacity-90'
          >
            Get in Touch
            <span className='material-symbols-outlined text-base'>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
