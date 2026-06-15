'use client';

import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

export function PortfolioDetailGallery({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  const [img1, img2, img3] = images;

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];
    const hasImg2 = images.length > 1;
    const hasImg3 = images.length > 2;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
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
          section.querySelector('[data-gallery-header]'),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
        );

        tl.fromTo(
          section.querySelector('[data-gallery-main]'),
          { opacity: 0, scale: 1.02 },
          { opacity: 1, scale: 1, duration: 0.7 },
          '-=0.3',
        );

        if (hasImg2) {
          tl.fromTo(
            section.querySelector('[data-gallery-2]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.4',
          );
        }

        if (hasImg3) {
          tl.fromTo(
            section.querySelector('[data-gallery-3]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.3',
          );
        }
      }, section);

      ctrls.push(() => ctx.revert());
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, [images.length]);

  return (
    <section ref={sectionRef} className='bg-surface-container-low py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div
          data-gallery-header
          className='mb-16 flex items-end justify-between'
        >
          <h2 className='text-2xl font-serif text-primary md:text-3xl'>
            Immersive Spaces
          </h2>
          <p className='border-b border-secondary pb-1 text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            View Full Gallery
          </p>
        </div>
        <div className='grid h-200 grid-cols-12 grid-rows-2 gap-6'>
          <div
            data-gallery-main
            className='group col-span-12 cursor-crosshair overflow-hidden md:col-span-8 md:row-span-2'
          >
            <Image
              src={img1}
              alt={`${projectTitle} gallery — main view`}
              layout='fullWidth'
              width={800}
              height={800}
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
          </div>
          {img2 && (
            <div
              data-gallery-2
              className='group col-span-6 cursor-crosshair overflow-hidden md:col-span-4 md:row-span-1'
            >
              <Image
                src={img2}
                alt={`${projectTitle} gallery — view 2`}
                layout='fullWidth'
                width={400}
                height={400}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
          )}
          {img3 && (
            <div
              data-gallery-3
              className='group col-span-6 cursor-crosshair overflow-hidden md:col-span-4 md:row-span-1'
            >
              <Image
                src={img3}
                alt={`${projectTitle} gallery — view 3`}
                layout='fullWidth'
                width={400}
                height={400}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
