'use client';

import { Link } from '@tanstack/react-router';
import { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function ServicesCta() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapAnimation((gsap, _ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const circles = section.querySelectorAll('[data-cta-circle]');
      if (circles[0]) {
        gsap.to(circles[0], {
          rotation: 360,
          duration: 60,
          repeat: -1,
          ease: 'none',
        });
      }
      if (circles[1]) {
        gsap.to(circles[1], {
          rotation: -360,
          duration: 90,
          repeat: -1,
          ease: 'none',
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        section.querySelector('[data-cta-heading]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        section.querySelector('[data-cta-desc]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelectorAll('[data-cta-btn]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-surface py-32'
    >
      <div
        data-cta-circle
        className='absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/20'
      />
      <div
        data-cta-circle
        className='absolute left-1/2 top-1/2 h-300 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/10'
      />

      <div className='relative z-10 mx-auto max-w-360 px-4 text-center md:px-16'>
        <h2
          data-cta-heading
          className='mb-8 text-4xl leading-[1.2] font-serif md:text-5xl'
        >
          Begin Your Legacy With Us
        </h2>
        <p
          data-cta-desc
          className='mx-auto mb-12 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg'
        >
          Whether you are a landowner looking for development or an investor
          seeking premium real estate, our experts are ready to consult.
        </p>
        <div className='flex flex-col justify-center gap-6 md:flex-row'>
          <Link
            data-cta-btn
            to='/contact'
            className='inline-block rounded-sm bg-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-on-primary uppercase transition-all hover:opacity-90'
          >
            Partner with Us
          </Link>
          <Link
            data-cta-btn
            to='/contact'
            className='inline-block rounded-sm border-2 border-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-primary uppercase transition-all hover:bg-primary hover:text-on-primary'
          >
            Consult our Experts
          </Link>
        </div>
      </div>
    </section>
  );
}
