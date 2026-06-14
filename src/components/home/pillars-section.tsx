'use client';

import { useEffect, useRef } from 'react';
import { pillars } from '@/data/pillars';
import { loadGsap } from '@/lib/gsap-loader';

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    loadGsap().then(({ gsap }) => {
      const section = sectionRef.current;
      if (!section) return;
      const cards = section.querySelectorAll('[data-pillar]');
      if (cards.length === 0) return;

      const ctx = gsap.context(() => {
        cards.forEach((card) => {
          const icon = card.querySelector('[data-pillar-icon]');
          const underline = card.querySelector('[data-pillar-underline]');
          const text = card.querySelector('[data-pillar-text]');
          const title = card.querySelector('[data-pillar-title]');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            defaults: { ease: 'power3.out' },
          });

          tl.fromTo(
            card,
            { opacity: 0, y: 40, rotateX: 15 },
            { opacity: 1, y: 0, rotateX: 0, duration: 0.8 },
          );

          if (icon) {
            tl.fromTo(
              icon,
              { scale: 0, rotate: -30 },
              { scale: 1, rotate: 0, duration: 0.5 },
              '-=0.4',
            );
          }

          if (title) {
            tl.fromTo(
              title,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4 },
              '-=0.2',
            );
          }

          if (underline) {
            tl.fromTo(
              underline,
              { scaleX: 0 },
              { scaleX: 1, duration: 0.5, transformOrigin: 'center' },
              '-=0.2',
            );
          }

          if (text) {
            tl.fromTo(
              text,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4 },
              '-=0.2',
            );
          }
        });
      }, section);

      ctrls.push(() => ctx.revert());
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-container-low py-20 md:py-28'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-12 md:grid-cols-3'>
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              data-pillar
              className='group opacity-0'
              style={{ perspective: '800px' }}
            >
              <span
                data-pillar-icon
                className='inline-flex items-center justify-center text-2xl text-secondary'
              >
                <span
                  className='material-symbols-outlined text-3xl'
                  aria-hidden='true'
                >
                  {pillar.icon}
                </span>
              </span>
              <h3
                data-pillar-title
                className='mb-3 mt-4 text-lg font-serif text-on-surface'
              >
                {pillar.title}
              </h3>
              <div
                data-pillar-underline
                className='mb-4 h-px bg-secondary origin-center scale-x-0'
              />
              <p
                data-pillar-text
                className='text-sm leading-relaxed text-on-surface-variant'
              >
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
