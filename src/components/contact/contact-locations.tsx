'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import CTG_IMG from '@/assets/images/contact/ctg-office.webp';
import DHAKA_IMG from '@/assets/images/contact/dhaka-office.webp';

const OFFICES = [
  {
    tag: 'Corporate Headquarters',
    title: 'Dhaka Executive Studio',
    address: 'Level 24, Landmark Tower',
    area: 'Gulshan Avenue, Dhaka 1212',
    phone: '+880 2 987 6543',
    img: DHAKA_IMG,
    side: 'left',
  },
  {
    tag: 'Regional Studio',
    title: 'Port City Atelier',
    address: '42 Bay View Plaza',
    area: 'Agrabad C/A, Chittagong 4100',
    phone: '+880 31 123 4567',
    img: CTG_IMG,
    side: 'right',
  },
];

export function ContactLocations() {
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
            section.querySelector('[data-loc-heading]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelector('[data-loc-card="left"]'),
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.8 },
            '-=0.3',
          );

          tl.fromTo(
            section.querySelector('[data-loc-card="right"]'),
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8 },
            '-=0.4',
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
    <section ref={sectionRef} className='bg-surface-container'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <h2
          data-loc-heading
          className='mb-16 text-center text-4xl leading-[1.2] font-serif md:text-5xl'
        >
          Global Presence
        </h2>
        <div className='grid gap-12 pb-16 md:grid-cols-2'>
          {OFFICES.map((office) => (
            <div
              key={office.title}
              data-loc-card={office.side}
              className='group cursor-pointer space-y-6'
            >
              <div className='h-100 overflow-hidden border border-outline-variant bg-surface-dim'>
                <Image
                  src={office.img}
                  alt={office.title}
                  layout='fullWidth'
                  className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                />
              </div>
              <div>
                <span className='mb-2 block text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                  {office.tag}
                </span>
                <h3 className='mb-4 text-2xl font-serif'>{office.title}</h3>
                <p className='max-w-sm text-sm leading-relaxed text-on-surface-variant'>
                  {office.address}
                  <br />
                  {office.area}
                  <br />
                  {office.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
