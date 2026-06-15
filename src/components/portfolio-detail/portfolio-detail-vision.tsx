'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailVision({
  vision,
}: {
  vision: ProjectDetail['vision'];
}) {
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
            section.querySelector('[data-vision-text]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelector('[data-vision-image]'),
            { opacity: 0, scale: 1.03 },
            { opacity: 1, scale: 1, duration: 0.8 },
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
    <section ref={sectionRef} className='bg-surface py-32'>
      <div className='mx-auto flex max-w-360 flex-col gap-20 px-4 md:flex-row md:px-16'>
        <div data-vision-text className='w-full md:w-1/2'>
          <h2 className='mb-10 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
            {vision.title}{' '}
            {vision.italicPart && (
              <span className='italic'>{vision.italicPart}</span>
            )}
          </h2>
          <div className='max-w-xl space-y-6 text-base leading-relaxed text-on-surface-variant md:text-lg'>
            {vision.paragraphs.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph order
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div
          data-vision-image
          className='w-full overflow-hidden bg-surface-container md:w-1/2'
        >
          <Image
            src={vision.image}
            alt=''
            layout='fullWidth'
            width={600}
            height={750}
            className='aspect-4/5 h-full w-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
