'use client';

import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export function PrivacyCta() {
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
            section.querySelector('[data-cta-card]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
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
    <section ref={sectionRef} className='bg-surface-container-low py-20'>
      <div className='mx-auto max-w-225 px-4 md:px-16'>
        <div
          data-cta-card
          className='border border-outline-variant bg-white p-8 md:p-12'
        >
          <h2 className='mb-4 text-xl font-serif text-on-surface md:text-2xl'>
            Questions About Your Data?
          </h2>
          <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
            If you have any questions or concerns about how we handle your
            personal information, please do not hesitate to reach out to our
            data protection team.
          </p>
          <Link
            to='/contact'
            className='inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
          >
            Contact Us
            <span className='material-symbols-outlined text-base'>
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
