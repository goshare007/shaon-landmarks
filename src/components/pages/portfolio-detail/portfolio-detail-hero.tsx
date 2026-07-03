import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import type { Project, ProjectDetail } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioDetailHero({
  project,
  detail,
}: {
  project: Project;
  detail: ProjectDetail;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(imageRef.current, { scale: 1.06, opacity: 0, duration: 1.1 }, 0)
        .from(
          cornersRef.current ? Array.from(cornersRef.current.children) : [],
          { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.04 },
          0.2,
        )
        .from(
          contentRef.current ? Array.from(contentRef.current.children) : [],
          { y: 30, opacity: 0, stagger: 0.15, duration: 0.7 },
          0.5,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-170 overflow-hidden dark-section bg-background'
    >
      <div className='absolute inset-0 z-10 dark-section bg-background/40' />
      <div ref={imageRef} className='absolute inset-0 overflow-hidden'>
        <Image
          src={detail.heroImage}
          alt={`${project.title} — exterior view`}
          layout='fullWidth'
          decoding='async'
          height={600}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Corner accents */}
      <div ref={cornersRef}>
        <div className='absolute top-0 left-0 z-20 w-10 h-px bg-brand/30' />
        <div className='absolute top-0 left-0 z-20 w-px h-10 bg-brand/30' />
        <div className='absolute top-0 right-0 z-20 w-10 h-px bg-brand/30' />
        <div className='absolute top-0 right-0 z-20 w-px h-10 bg-brand/30' />
        <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-brand/30' />
        <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-brand/30' />
        <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-brand/30' />
        <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-brand/30' />
      </div>

      <div className='absolute inset-0 z-20 mx-auto flex site-wrapper flex-col justify-end pb-24'>
        <div ref={contentRef} className='detail-hero__content'>
          <div className='mb-6 flex items-center gap-4'>
            <span className='bg-brand px-4 py-1 text-[10px] font-medium tracking-[0.2em] text-white uppercase'>
              {project.status}
            </span>
            <div className='h-px w-24 bg-brand' />
            <span className='text-[10px] font-medium tracking-[0.2em] text-white/80 uppercase'>
              {project.location}
            </span>
          </div>
          <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white max-w-3xl'>
            {project.title}
          </h1>
        </div>
      </div>
    </section>
  );
}
