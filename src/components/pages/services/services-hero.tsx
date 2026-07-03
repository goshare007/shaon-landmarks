import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import HERO_IMG from '@/assets/images/services/hero.webp';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const HERO_STATS = [
  { num: '48+', label: 'Completed Projects' },
  { num: '16+', label: 'Years of Expertise' },
  { num: '100%', label: 'RAJUK Compliant' },
];

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imagePanelRef = useRef<HTMLDivElement>(null);
  const quoteCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(
        imagePanelRef.current,
        { scale: 1.06, opacity: 0, duration: 1.1 },
        0,
      )
        .from(
          cornersRef.current ? Array.from(cornersRef.current.children) : [],
          { opacity: 0, scale: 0.6, duration: 0.5, stagger: 0.04 },
          0.1,
        )
        .from(headingRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.25)
        .from(paraRef.current, { y: 14, opacity: 0, duration: 0.6 }, 0.5)
        .from(
          statsRef.current ? Array.from(statsRef.current.children) : [],
          { y: 14, opacity: 0, duration: 0.5, stagger: 0.1 },
          0.65,
        )
        .from(ctaRef.current, { y: 10, opacity: 0, duration: 0.5 }, 0.85)
        .from(quoteCardRef.current, { y: 16, opacity: 0, duration: 0.6 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden border-b border-white/6'
    >
      <div className='grid md:grid-cols-12'>
        {/* Left panel — dark brand */}
        <div className='relative dark-section bg-background md:col-span-7 py-24 md:py-32'>
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

          <div className='site-wrapper'>
            <SectionHeading
              ref={headingRef}
              eyebrow='Our Expertise'
              heading='Crafting Excellence'
              highlight='Across Every Dimension'
              as='h1'
              headingClassName='text-[clamp(2.5rem,5vw,4rem)] leading-tight text-white'
            />
            <p
              ref={paraRef}
              className='mb-8 max-w-xl text-sm leading-relaxed text-white/55 md:text-base'
            >
              From strategic land acquisition to the final touch of interior
              elegance, Shaon Landmarks delivers architectural integrity through
              a multidisciplinary approach.
            </p>

            {/* Stats */}
            <div ref={statsRef} className='flex flex-wrap gap-4 mb-8'>
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className='flex items-center gap-3 border-l border-brand/40 pl-4 py-2'
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div>
                    <span className='font-serif text-xl md:text-2xl text-white leading-none'>
                      {stat.num}
                    </span>
                    <span className='block text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium'>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              ref={ctaRef}
              to='/portfolio'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-brand px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-brand/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3 text-black'>
                View Our Portfolio
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
          </div>
        </div>

        {/* Right panel — image */}
        <div
          ref={imagePanelRef}
          className='relative min-h-[50vh] md:col-span-5 md:min-h-0'
        >
          <div className='md:absolute md:inset-0'>
            <Image
              src={HERO_IMG}
              alt='Shaon Landmark services overview'
              layout='fullWidth'
              decoding='async'
              height={900}
              className='h-full w-full object-cover'
            />
          </div>
          <div className='absolute inset-0 bg-linear-to-l from-black/30 to-transparent pointer-events-none' />

          {/* Quote card — glass blur */}
          <div
            ref={quoteCardRef}
            className='absolute bottom-8 left-8 border border-brand/30 rounded-sm'
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className='px-8 py-7'>
              <p className='font-serif text-lg italic leading-snug text-white/80'>
                &ldquo;Permanent Quality&rdquo;
              </p>
            </div>
            <div className='absolute top-0 left-0 w-6 h-px bg-brand/50' />
            <div className='absolute top-0 left-0 w-px h-6 bg-brand/50' />
          </div>
        </div>
      </div>
    </section>
  );
}
