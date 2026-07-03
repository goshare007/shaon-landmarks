import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import { HERO_CONTENT } from '@/content/home';
import { gsap, MOTION } from '@/lib/gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const locationBadgeRef = useRef<HTMLDivElement>(null);
  const yearTagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(
        imageWrapRef.current,
        { scale: 1.06, opacity: 0, duration: 1.1 },
        0,
      )
        .from(
          dividerRef.current,
          { scaleY: 0, transformOrigin: 'top center', duration: 0.8 },
          0.2,
        )
        .from(eyebrowRef.current, { y: 16, opacity: 0, duration: 0.6 }, 0.4)
        .from(
          headlineRef.current ? Array.from(headlineRef.current.children) : [],
          { y: 40, opacity: 0, stagger: 0.12, duration: 0.7 },
          0.55,
        )
        .from(descriptorRef.current, { y: 14, opacity: 0, duration: 0.6 }, 0.85)
        .from(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { y: 12, opacity: 0, stagger: 0.1, duration: 0.5 },
          1.0,
        )
        .from(ctaRowRef.current, { y: 10, opacity: 0, duration: 0.5 }, 1.2)
        .from(scrollIndicatorRef.current, { opacity: 0, duration: 0.5 }, 1.4)
        .from(
          [locationBadgeRef.current, yearTagRef.current],
          { y: 10, opacity: 0, stagger: 0.1, duration: 0.5 },
          1.1,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen md:h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2'
    >
      {/* ── LEFT PANEL ─────────────────────────────────────────────────────── */}
      <div className='relative z-10 bg-surface-brand flex flex-col justify-between px-6 py-10 md:px-14 md:py-12 overflow-hidden order-2 md:order-1'>
        {/* Vertical divider between panels */}
        <div
          ref={dividerRef}
          className='hidden md:block absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-custom to-transparent opacity-30'
        />

        <div className='flex flex-col h-full justify-between gap-12 md:gap-0'>
          {/* Content block */}
          <div className='flex-1 flex flex-col justify-center py-4 md:py-8'>
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className='flex items-center gap-4 mb-6 md:mb-9'
            >
              <div className='w-10 h-px bg-custom' />
              <span className='text-xs font-medium  uppercase text-custom/80'>
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h1
              ref={headlineRef}
              className='font-serif text-5xl md:text-7xl   text-white overflow-hidden'
            >
              <span className='block'>{HERO_CONTENT.headline.first}</span>
              <span className='block italic text-custom font-bold pt-2'>
                {HERO_CONTENT.headline.second}
              </span>
            </h1>

            {/* Descriptor */}
            <div
              ref={descriptorRef}
              className='flex items-start gap-5 mt-6 md:mt-9'
            >
              <div className='w-0.5 min-h-14 bg-custom/40 shrink-0 mt-0.5' />
              <p className='text-sm md:text-sm leading-relaxed text-white/70 max-w-xs font-light'>
                {HERO_CONTENT.descriptor}
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className='flex flex-wrap items-center gap-6 md:gap-8 mt-8 md:mt-11'
            >
              {HERO_CONTENT.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className='flex items-center gap-6 md:gap-8'
                >
                  {i > 0 && <div className='w-px h-8 bg-white/10' />}
                  <div className='flex flex-col gap-1'>
                    <span className='font-serif text-[22px] md:text-[26px] text-white leading-none'>
                      {stat.num}
                    </span>
                    <span className='text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium'>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row: CTA + scroll hint */}
          <div className='flex justify-between items-end mt-4 md:mt-0'>
            <div ref={ctaRowRef}>
              <Link
                to='/portfolio'
                search={{ status: '', location: '', search: '' }}
                className='relative overflow-hidden group inline-flex items-center gap-4 bg-custom text-white px-6 py-3 md:px-7 md:py-3.5 text-[11px] font-semibold tracking-[0.15em] uppercase no-underline rounded-sm w-fit hover:bg-custom/90 transition-colors duration-200'
              >
                {/* Shimmer on hover */}
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10'>Explore Portfolio</span>
                <IconArrowRight
                  className='relative z-10 w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5'
                  aria-hidden='true'
                />
              </Link>
            </div>

            {/* Scroll indicator */}
            <div
              ref={scrollIndicatorRef}
              className='hidden md:flex flex-col items-center gap-2'
            >
              <span
                className='text-[10px] tracking-[0.2em] uppercase text-white/45'
                style={{ writingMode: 'vertical-rl' }}
              >
                Scroll
              </span>
              <div className='w-px h-10 bg-linear-to-b from-white/20 to-transparent animate-pulse' />
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────────────── */}
      <div className='relative h-[50vh] md:h-full overflow-hidden order-1 md:order-2'>
        {/* Image with entrance ref */}
        <div ref={imageWrapRef} className='w-full h-full'>
          <Image
            src={HERO_CONTENT.image}
            alt='Architectural landmark'
            layout='fullWidth'
            decoding='async'
            height={800}
            className='h-full w-full object-cover object-center'
          />
        </div>

        {/* Overlay vignettes */}
        <div className='absolute inset-0 bg-linear-to-r from-black/50 to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none' />

        {/* Location badge */}
        <div
          ref={locationBadgeRef}
          className='absolute bottom-6 left-6 md:bottom-12 md:left-9 z-10'
        >
          <div
            className='flex items-center gap-3 px-4 py-3 rounded-sm border border-custom/30'
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
              willChange: 'transform',
            }}
          >
            <div className='w-1.5 h-1.5 rounded-full bg-custom shrink-0 animate-pulse' />
            <span className='text-[10px] tracking-[0.12em] uppercase text-white/65 font-medium'>
              {HERO_CONTENT.location}
            </span>
          </div>
        </div>

        {/* Year tag */}
        <div
          ref={yearTagRef}
          className='absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4'
        >
          <span
            className='text-[10px] font-medium tracking-[0.2em] text-white/55 uppercase'
            style={{ writingMode: 'vertical-rl' }}
          >
            {new Date().getFullYear()}
          </span>
          <div className='w-px h-12 bg-linear-to-b from-custom/60 to-transparent' />
        </div>
      </div>
    </section>
  );
}
