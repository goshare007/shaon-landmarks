import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import HERO_IMAGE from '@/assets/images/about/hero.webp';
import { gsap, MOTION } from '@/lib/gsap';

// Deterministic particles — no Math.random() so SSR and client match
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: (i * 137.5 + 42) % 100,
  y: (i * 89.3 + 17) % 100,
  size: (i % 3) + 1,
  delay: i % 6,
  duration: (i % 4) + 5,
}));

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image panel scales in
      tl.from(
        imageWrapRef.current,
        {
          scale: 1.05,
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
        },
        0,
      );

      // Vertical divider draws down
      tl.from(
        dividerRef.current,
        {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.9,
        },
        0.2,
      );

      // Eyebrow
      tl.from(eyebrowRef.current, { y: 14, opacity: 0, duration: 0.6 }, 0.35);

      // Headline lines stagger
      if (headlineRef.current) {
        tl.from(
          Array.from(headlineRef.current.children),
          {
            y: 38,
            opacity: 0,
            duration: 0.75,
            stagger: 0.12,
          },
          0.5,
        );
      }

      // Descriptor
      tl.from(
        descriptorRef.current,
        { y: 14, opacity: 0, duration: 0.6 },
        0.78,
      );

      // Quote block
      tl.from(quoteRef.current, { y: 12, opacity: 0, duration: 0.55 }, 0.95);

      // Particles pop in
      if (particlesRef.current) {
        tl.from(
          Array.from(particlesRef.current.children),
          {
            opacity: 0,
            scale: 0,
            duration: 0.35,
            stagger: 0.04,
            ease: 'back.out(2)',
          },
          1.1,
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-surface-brand min-h-screen md:h-screen grid grid-cols-1 md:grid-cols-2'
    >
      {/* ── LEFT PANEL ── */}
      <div className='relative z-10 flex flex-col justify-between px-6 py-16 md:px-14 md:py-20 order-2 md:order-1'>
        {/* Vertical divider */}
        <div
          ref={dividerRef}
          className='hidden md:block absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-custom to-transparent opacity-25'
        />

        <div className='flex flex-col h-full justify-center gap-8'>
          {/* Eyebrow */}
          <div ref={eyebrowRef} className='flex items-center gap-4'>
            <div className='w-10 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Established Excellence
            </span>
          </div>

          {/* Headline */}
          <h1
            ref={headlineRef}
            className='font-serif text-[clamp(2.8rem,5.5vw,4.2rem)] font-light leading-[1.04] text-white overflow-hidden'
          >
            <span className='block'>A Legacy of</span>
            <span
              className='block italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.3)',
              }}
            >
              Integrity
            </span>
          </h1>

          {/* Descriptor */}
          <p
            ref={descriptorRef}
            className='max-w-sm text-sm leading-relaxed text-white/45 font-light'
          >
            Crafting landmarks that stand as a testament to architectural
            precision and unwavering commitment in the heart of Bangladesh.
          </p>

          {/* Quote */}
          <div
            ref={quoteRef}
            className='flex items-start gap-5 border-l border-custom/30 pl-5'
          >
            <p className='max-w-sm text-sm italic leading-relaxed text-white/55 font-light'>
              &ldquo;We don&apos;t just build structures; we cultivate trust
              through every brick laid and every promise kept.&rdquo;
            </p>
          </div>

          {/* Inline stats — adds substance below the quote */}
          <div className='flex items-center gap-8 pt-2'>
            {[
              { num: '2008', label: 'Founded' },
              { num: '48+', label: 'Projects' },
              { num: '500+', label: 'Families' },
            ].map((s, i) => (
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

      {/* ── RIGHT PANEL ── */}
      <div className='relative h-[48vh] md:h-full overflow-hidden order-1 md:order-2'>
        {/* Image */}
        <div ref={imageWrapRef} className='w-full h-full'>
          <Image
            src={HERO_IMAGE}
            alt='Shaon Landmarks — architectural excellence since 2008'
            layout='fullWidth'
            height={1000}
            className='h-full w-full object-cover object-center'
          />
        </div>

        {/* Particles */}
        <div
          ref={particlesRef}
          className='absolute inset-0 pointer-events-none overflow-hidden'
        >
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className='absolute rounded-full'
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: 'rgba(166,124,82,0.2)',
                animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Gradients */}
        <div className='absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent' />
        <div className='absolute inset-0 bg-linear-to-r from-black/40 to-transparent hidden md:block' />

        {/* Border overlay */}
        <div className='absolute inset-0 border border-white/5' />

        {/* Year tag — vertical */}
        <div className='absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-3'>
          <span
            className='text-[10px] font-medium tracking-[0.2em] text-white/25 uppercase'
            style={{ writingMode: 'vertical-rl' }}
          >
            Est. 2008
          </span>
          <div className='w-px h-10 bg-linear-to-b from-custom/50 to-transparent' />
        </div>

        {/* Bottom-left location badge */}
        <div className='absolute bottom-6 left-6 z-10'>
          <div
            className='flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm border border-white/8'
            style={{
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div className='w-1.5 h-1.5 rounded-full bg-custom animate-pulse' />
            <span className='text-[10px] tracking-[0.12em] uppercase text-white/55 font-medium'>
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
