'use client';

import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

export function AboutStory() {
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
            section.querySelector('[data-story-heading]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6 },
          );

          tl.fromTo(
            section.querySelectorAll('[data-story-p]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
            '-=0.3',
          );

          tl.fromTo(
            section.querySelector('[data-story-divider]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, transformOrigin: 'left' },
            '-=0.2',
          );

          const statValues = section.querySelectorAll('[data-stat-value]');
          statValues.forEach((el) => {
            const raw = el.getAttribute('data-stat-raw') || '';
            const match = raw.match(/^([\d.]+)(.*)$/);
            if (!match) return;
            const num = Number(match[1]);
            const suffix = match[2];

            gsap.fromTo(
              el,
              { textContent: '0' },
              {
                textContent: String(num),
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
                onUpdate: function () {
                  const val = Math.round(Number(this.targets()[0].textContent));
                  el.textContent = `${val}${suffix}`;
                },
                onComplete: () => {
                  el.textContent = raw;
                },
              },
            );
          });

          const statLabels = section.querySelectorAll('[data-stat-label]');
          tl.fromTo(
            statLabels,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
            '-=0.6',
          );

          tl.fromTo(
            section.querySelector('[data-story-cta]'),
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4 },
            '-=0.2',
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
    <section ref={sectionRef} className='bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-6 md:grid-cols-12'>
          <div className='mb-12 md:col-span-4 md:mb-0'>
            <h2
              data-story-heading
              className='sticky top-32 text-4xl leading-[1.2] font-serif md:text-5xl'
            >
              Our Story
            </h2>
          </div>
          <div className='md:col-span-8'>
            <p
              data-story-p
              className='text-base leading-relaxed text-on-surface-variant md:text-lg'
            >
              Founded on the principles of transparency and architectural
              innovation, Shaon Landmarks & Housing began its journey with a
              single vision: to redefine the real estate landscape of
              Bangladesh. For over a decade, we have navigated the complexities
              of urban development with a focus on sustainable growth and
              aesthetic excellence.
            </p>
            <div
              data-story-divider
              className='my-12 grid grid-cols-2 gap-8 border-y border-outline-variant py-8 scale-x-0 origin-left'
            >
              <div>
                <span
                  data-stat-value
                  data-stat-raw='15+'
                  className='block text-3xl font-serif text-secondary md:text-4xl'
                >
                  15+
                </span>
                <span
                  data-stat-label
                  className='text-label font-medium tracking-widest text-on-surface-variant uppercase'
                >
                  Years of Expertise
                </span>
              </div>
              <div>
                <span
                  data-stat-value
                  data-stat-raw='40+'
                  className='block text-3xl font-serif text-secondary md:text-4xl'
                >
                  40+
                </span>
                <span
                  data-stat-label
                  className='text-label font-medium tracking-widest text-on-surface-variant uppercase'
                >
                  Completed Projects
                </span>
              </div>
            </div>
            <p
              data-story-p
              className='text-sm leading-relaxed text-on-surface-variant md:text-base'
            >
              Our commitment goes beyond construction. We meticulously select
              locations that offer the perfect balance of serenity and
              connectivity. Every project is a collaborative masterpiece,
              involving the country&apos;s finest architects and engineers to
              ensure that &ldquo;Shaon Landmarks&rdquo; remains synonymous with
              prestige.
            </p>
            <Link
              data-story-cta
              to='/portfolio'
              className='mt-8 flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:text-secondary group'
            >
              View Our Portfolio
              <span className='material-symbols-outlined text-base transition-transform group-hover:translate-x-1'>
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
