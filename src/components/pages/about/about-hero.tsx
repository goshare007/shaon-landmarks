import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import HERO_IMAGE from '@/assets/images/about/hero.webp';
import { gsap, MOTION } from '@/lib/gsap';

const HERO_STATS = [
  { num: '2008', label: 'Founded' },
  { num: '48+', label: 'Projects' },
  { num: '500+', label: 'Families' },
];

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(imageRef.current, { scale: 1.06, opacity: 0, duration: 1.1 }, 0)
        .from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.6 }, 0.35)
        .from(
          headlineRef.current?.children
            ? Array.from(headlineRef.current.children)
            : [],
          { y: 40, opacity: 0, stagger: 0.12, duration: 0.7 },
          0.5,
        )
        .from(descriptorRef.current, { y: 14, opacity: 0, duration: 0.6 }, 0.8)
        .from(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { y: 12, opacity: 0, stagger: 0.1, duration: 0.5 },
          0.95,
        )
        .from(locationRef.current, { y: 10, opacity: 0, duration: 0.5 }, 1.1);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative h-[80vh] min-h-160 overflow-hidden'
    >
      <div ref={imageRef} className='absolute inset-0'>
        <Image
          src={HERO_IMAGE}
          alt='Shaon Landmarks — architectural excellence since 2008'
          layout='fullWidth'
          decoding='async'
          height={1000}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='absolute inset-0 bg-linear-to-r from-surface-brand/85 via-surface-brand/50 to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent' />

      <div className='relative z-10 flex h-full items-center'>
        <div className='site-wrapper w-full'>
          <div className='max-w-lg'>
            <div ref={eyebrowRef} className='flex items-center gap-4 mb-6'>
              <div className='w-10 h-px bg-custom' />
              <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
                Since 2008
              </span>
            </div>

            <h1
              ref={headlineRef}
              className='font-serif text-[clamp(2.8rem,5.5vw,4.2rem)] font-light leading-[1.04] text-white'
            >
              A Legacy of <span className='italic text-custom'>Integrity</span>
            </h1>

            <p
              ref={descriptorRef}
              className='mt-5 max-w-md text-sm leading-relaxed text-white/55'
            >
              Crafting landmarks that stand as a testament to architectural
              precision and unwavering commitment in the heart of Bangladesh.
            </p>

            <div
              ref={statsRef}
              className='flex items-center gap-8 mt-10 pt-8 border-t border-white/10'
            >
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className='flex items-center gap-8'>
                  {i > 0 && <div className='w-px h-7 bg-white/10' />}
                  <div className='flex flex-col gap-1'>
                    <span className='font-serif text-[22px] md:text-[26px] text-white leading-none'>
                      {s.num}
                    </span>
                    <span className='text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium'>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div ref={locationRef} className='absolute bottom-6 right-6 z-10'>
        <div
          className='flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm border border-white/8'
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            willChange: 'transform',
          }}
        >
          <div className='w-1.5 h-1.5 rounded-full bg-custom animate-pulse' />
          <span className='text-[10px] tracking-[0.12em] uppercase text-white/55 font-medium'>
            Dhaka, Bangladesh
          </span>
        </div>
      </div>
    </section>
  );
}
