'use client';

import { useEffect, useRef } from 'react';
import { DynamicIcon } from '@/lib/icon-map';

const MISSION_LIST = [
  '100% Timely Handover',
  'Premium Raw Materials',
  'Transparent Contracts',
];

export function AboutMissionVision() {
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
            section.querySelector('[data-mv-mission]'),
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8 },
          );

          tl.fromTo(
            section.querySelector('[data-mv-vision]'),
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8 },
            '-=0.3',
          );

          const icons = section.querySelectorAll('[data-mv-icon]');
          tl.fromTo(
            icons,
            { scale: 0, rotate: -30 },
            { scale: 1, rotate: 0, duration: 0.5, stagger: 0.1 },
            '-=0.4',
          );

          const listItems = section.querySelectorAll('[data-mv-list]');
          tl.fromTo(
            listItems,
            { opacity: 0, x: -15 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.08 },
            '-=0.2',
          );

          const quotes = section.querySelectorAll('[data-mv-quote]');
          tl.fromTo(
            quotes,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            '-=0.1',
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
    <section ref={sectionRef} className='bg-surface-container-low py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-12 md:grid-cols-2'>
          <div
            data-mv-mission
            className='flex flex-col justify-between border border-outline-variant bg-white p-12 transition-all duration-300 hover:-translate-y-1'
          >
            <div>
              <DynamicIcon
                name='track_changes'
                data-mv-icon
                size={36}
                className='mb-8 inline-block text-secondary'
              />
              <h3 className='mb-6 text-3xl font-serif'>Mission</h3>
              <p className='mb-8 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                To deliver world-class living spaces that harmonize luxury with
                functionality, ensuring every client experiences the peace of
                mind that comes with timely handover and uncompromising build
                quality.
              </p>
            </div>
            <ul className='space-y-4 text-label font-medium tracking-widest text-on-surface uppercase'>
              {MISSION_LIST.map((item) => (
                <li key={item} data-mv-list className='flex items-center gap-3'>
                  <span className='h-1.5 w-1.5 shrink-0 bg-secondary' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-mv-vision
            className='flex flex-col justify-between bg-tertiary p-12 text-on-tertiary transition-all duration-300 hover:-translate-y-1 md:mt-16'
          >
            <div>
              <DynamicIcon
                name='visibility'
                data-mv-icon
                size={36}
                className='mb-8 inline-block text-secondary-fixed-dim'
              />
              <h3 className='mb-6 text-3xl font-serif'>Vision</h3>
              <p className='mb-8 text-sm leading-relaxed text-tertiary-fixed-dim md:text-base'>
                To become the most trusted real estate partner in the region,
                recognized for setting the gold standard in architectural
                integrity and customer-centric property management.
              </p>
            </div>
            <div
              data-mv-quote
              className='border-t border-on-tertiary-container pt-8'
            >
              <p className='text-2xl italic font-serif leading-snug'>
                &ldquo;Building the Future, Preserving the Legacy.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
