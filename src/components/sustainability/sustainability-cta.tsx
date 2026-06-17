'use client';

import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function SustainabilityCta() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

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
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-tertiary py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <div data-cta-content>
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Build a Greener Future
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              Discover how Shaon Landmarks can bring sustainable luxury to your
              next development.
            </p>
          </div>
          <Link
            data-cta-btn
            to='/contact'
            className='mt-8 inline-block rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary no-underline uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]'
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
