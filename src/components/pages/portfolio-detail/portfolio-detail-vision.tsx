import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioDetailVision({
  vision,
}: {
  vision: ProjectDetail['vision'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(
        cornersRef.current ? Array.from(cornersRef.current.children) : [],
        { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.04 },
      );

      gsap.from(Array.from(copyRef.current?.children ?? []), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: copyRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(imageRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative bg-surface-brand py-32 overflow-hidden'
    >
      {/* Corner accents */}
      <div ref={cornersRef}>
        <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />
      </div>

      <div className='site-wrapper'>
        <div className='flex flex-col gap-16 lg:flex-row lg:items-center'>
          <div ref={copyRef} className='w-full lg:w-1/2 lg:pr-12'>
            <div className='w-12 h-px bg-custom mb-8' />
            <h2 className='mb-10 text-3xl leading-tight font-serif text-white md:text-4xl lg:text-5xl'>
              {vision.title}{' '}
              {vision.italicPart && (
                <span className='italic text-custom'>{vision.italicPart}</span>
              )}
            </h2>
            <div className='max-w-xl space-y-6 text-base leading-relaxed text-white/55 md:text-lg'>
              {vision.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div ref={imageRef} className='w-full lg:w-1/2'>
            <div className='overflow-hidden rounded-sm'>
              <Image
                src={vision.image}
                alt={`${vision.title} — vision illustration`}
                layout='fullWidth'
                decoding='async'
                height={750}
                loading='lazy'
                className='aspect-4/5 h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
