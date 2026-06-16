'use client';

import { useEffect, useRef } from 'react';
import { WHATSAPP_MSG, WHATSAPP_NUMBER } from '@/lib/constants';

export function ContactCta() {
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
            section.querySelector('[data-cta-link]'),
            { opacity: 0, y: 20 },
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
    <section ref={sectionRef} className='mx-auto my-32 max-w-360 px-4 md:px-16'>
      <div className='relative overflow-hidden border-y border-on-tertiary-fixed-variant/10 bg-tertiary py-24 text-center md:py-32'>
        <div
          className='pointer-events-none absolute inset-0 opacity-10'
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
        <div data-cta-content className='relative z-10'>
          <h2 className='mb-6 text-4xl leading-[1.2] font-serif text-on-tertiary md:text-5xl'>
            Immediate Dialogue
          </h2>
          <p className='mx-auto mb-10 max-w-2xl text-base leading-relaxed text-on-tertiary/70 md:text-lg'>
            For urgent inquiries or to speak directly with our principal design
            leads, initiate a direct conversation via our secure WhatsApp
            channel.
          </p>
        </div>
        <a
          data-cta-link
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-4 border border-secondary px-12 py-5 text-label font-medium tracking-[0.15em] text-secondary uppercase transition-all duration-500 hover:bg-secondary hover:text-on-primary hover:scale-[1.02] active:scale-[0.98]'
        >
          <span className='material-symbols-outlined' aria-hidden='true'>
            chat
          </span>
          WhatsApp Integration
        </a>
      </div>
    </section>
  );
}
