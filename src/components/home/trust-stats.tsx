'use client';

import { useEffect, useRef } from 'react';
import { TRUST_STATS as stats } from '@/data/home';
import { loadGsap } from '@/lib/gsap-loader';

function parseStatValue(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { num: Number(match[1]), suffix: match[2] };
}

export function TrustStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const items = section.querySelectorAll('[data-stat]');
      if (items.length === 0) return;

      const ctx = gsap.context(() => {
        items.forEach((item) => {
          const labelEl = item.querySelector('[data-stat-label]');
          const valueEl = item.querySelector('[data-stat-value]');
          if (!valueEl) return;

          const raw = valueEl.getAttribute('data-stat-raw') || '';
          const parsed = parseStatValue(raw);

          if (parsed) {
            const { num, suffix } = parsed;

            gsap.fromTo(
              valueEl,
              { textContent: '0' },
              {
                textContent: String(num),
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                  const val = Math.round(Number(this.targets()[0].textContent));
                  valueEl.textContent = `${val}${suffix}`;
                },
                onComplete: () => {
                  valueEl.textContent = raw;
                },
              },
            );
          } else {
            gsap.fromTo(
              valueEl,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
              },
            );
          }

          if (labelEl) {
            gsap.fromTo(
              labelEl,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.15,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
              },
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
      className='border-b border-t border-outline-variant bg-surface-container-low py-16 md:py-20'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-8 md:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} data-stat className='text-center'>
              <div
                data-stat-value
                data-stat-raw={stat.value}
                className='text-4xl font-serif text-secondary sm:text-5xl'
              >
                {stat.value}
              </div>
              <div
                data-stat-label
                className='mt-2 text-label font-medium tracking-widest text-on-surface-variant uppercase'
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
