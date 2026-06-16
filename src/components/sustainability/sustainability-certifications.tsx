'use client';

import { useEffect, useRef } from 'react';

const certifications = [
  'RAJUK Certified',
  'REHAB Member',
  'ISO 14001',
  'Green Building Council',
];

export function SustainabilityCertifications() {
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
            section.querySelector('[data-cert-heading]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelectorAll('[data-cert-badge]'),
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1 },
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
    <section ref={sectionRef} className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-cert-heading className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-serif text-on-surface sm:text-4xl'>
            Certifications & Recognition
          </h2>
          <p className='mt-4 text-sm leading-relaxed text-on-surface-variant'>
            Our sustainable practices are recognized by leading industry bodies
            and regulatory authorities.
          </p>
        </div>
        <div className='mt-10 flex flex-wrap justify-center gap-6'>
          {certifications.map((cert) => (
            <div
              key={cert}
              data-cert-badge
              className='rounded-sm border border-outline-variant bg-white px-6 py-4 transition-transform duration-300 hover:scale-105'
            >
              <span className='text-label font-medium tracking-widest text-on-surface uppercase'>
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
