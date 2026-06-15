'use client';

import { useEffect, useRef } from 'react';
import { DynamicIcon } from '@/lib/icon-map';

const CERTIFICATIONS = [
  { icon: 'verified', label: 'RAJUK Certified' },
  { icon: 'handshake', label: 'REHAB Member' },
  { icon: 'workspace_premium', label: 'ISO 9001:2015' },
];

export function AboutCertifications() {
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
            section.querySelector('[data-cert-text]'),
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.7 },
          );

          const badges = section.querySelectorAll('[data-cert-badge]');
          tl.fromTo(
            badges,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1 },
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
    <section ref={sectionRef} className='bg-surface-container py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='flex flex-col items-center justify-between gap-12 border-y border-outline-variant py-16 md:flex-row'>
          <div data-cert-text className='max-w-md text-center md:text-left'>
            <h2 className='mb-4 text-3xl font-serif'>Certified Excellence</h2>
            <p className='text-sm leading-relaxed text-on-surface-variant'>
              We adhere to the highest regulatory standards in Bangladesh,
              ensuring every development is legal, secure, and built to last.
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-16 opacity-70 transition-opacity hover:opacity-100'>
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.label}
                data-cert-badge
                className='flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1'
              >
                <div className='flex h-24 w-24 items-center justify-center border border-outline-variant bg-white'>
                  <DynamicIcon
                    name={cert.icon}
                    size={40}
                    className='text-[#000000]'
                  />
                </div>
                <span className='text-label font-medium tracking-widest text-on-surface uppercase'>
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
