import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';
import { gsap, MOTION } from '@/lib/gsap';

export function SustainabilityHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(
        imageWrapRef.current,
        { scale: 1.06, opacity: 0, duration: 1.2, ease: 'power2.out' },
        0,
      );
      tl.from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.6 }, 0.4);

      if (headlineRef.current) {
        tl.from(
          Array.from(headlineRef.current.children),
          {
            y: 40,
            opacity: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
          },
          0.55,
        );
      }

      tl.from(
        descriptorRef.current,
        { y: 14, opacity: 0, duration: 0.6 },
        0.85,
      );
      tl.from(badgeRef.current, { y: 10, opacity: 0, duration: 0.5 }, 1.1);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-[70vh] min-h-144 overflow-hidden'
    >
      {/* Image */}
      <div ref={imageWrapRef} className='absolute inset-0 z-0'>
        <Image
          src={SustainabilityImg}
          alt=''
          layout='fullWidth'
          height={800}
          className='h-full w-full object-cover'
        />
      </div>

      {/* Overlays */}
      <div className='absolute inset-0 bg-linear-to-r from-black/60 to-transparent pointer-events-none z-1' />
      <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none z-1' />

      {/* Content */}
      <div className='relative z-10 flex h-full items-center'>
        <div className='container'>
          <div ref={eyebrowRef} className='mb-5 flex items-center gap-4'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Building Responsibly
            </span>
          </div>
          <h1
            ref={headlineRef}
            className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white overflow-hidden'
          >
            <span className='block'>Sustain</span>
            <span
              className='block italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              ability
            </span>
          </h1>
          <p
            ref={descriptorRef}
            className='mt-4 max-w-xl text-sm leading-relaxed text-white/60'
          >
            Committed to a greener future through responsible architecture and
            innovative design.
          </p>
        </div>
      </div>

      {/* Floating badge */}
      <div
        ref={badgeRef}
        className='absolute bottom-6 left-6 md:bottom-12 md:left-12 z-10'
      >
        <div
          className='flex items-center gap-3 px-4 py-3 rounded-sm border border-custom/30'
          style={{
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className='w-1.5 h-1.5 rounded-full bg-custom shrink-0 animate-pulse' />
          <span className='text-[10px] tracking-[0.12em] uppercase text-white/65 font-medium'>
            40% Energy Reduction Goal
          </span>
        </div>
      </div>
    </section>
  );
}
