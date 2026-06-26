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
  const contentRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (contentRef.current) {
        tl.from(
          Array.from(contentRef.current.children),
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
            stagger: 0.1,
          },
          0,
        );
      }

      tl.from(
        imageWrapRef.current,
        { scale: 1.04, opacity: 0, duration: 1, ease: 'power2.out' },
        0.15,
      );
      tl.from(quoteRef.current, { x: -20, opacity: 0, duration: 0.6 }, 0.5);

      if (statsRef.current) {
        tl.from(
          Array.from(statsRef.current.children),
          {
            y: 12,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
          },
          0.7,
        );
      }

      tl.from(ctaRef.current, { y: 10, opacity: 0, duration: 0.4 }, 0.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden py-24 md:py-32 border-b border-border bg-linear-to-b from-surface-raised to-transparent'
    >
      <div className='container'>
        <div className='grid items-center gap-12 md:grid-cols-12'>
          {/* Left copy */}
          <div className='md:col-span-7'>
            <div ref={contentRef}>
              <SectionHeading
                eyebrow='Our Expertise'
                heading='Crafting Excellence'
                highlight='Across Every Dimension'
                as='h1'
                headingClassName='text-[clamp(2.5rem,5vw,4rem)] leading-tight'
              />
              <p className='mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base'>
                From strategic land acquisition to the final touch of interior
                elegance, Shaon Landmarks delivers architectural integrity
                through a multidisciplinary approach.
              </p>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className='flex flex-wrap items-center gap-6 md:gap-8 mb-8'
            >
              {HERO_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className='flex items-center gap-6 md:gap-8'
                >
                  {i > 0 && <div className='w-px h-8 bg-border' />}
                  <div className='flex flex-col gap-0.5'>
                    <span className='font-serif text-xl md:text-2xl text-foreground leading-none'>
                      {stat.num}
                    </span>
                    <span className='text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-medium'>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div ref={ctaRef}>
              <Link
                to='/portfolio'
                search={{ status: '', location: '', search: '' }}
                className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
              >
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10 inline-flex items-center gap-3'>
                  View Our Portfolio
                  <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </span>
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className='relative mt-8 md:col-span-5 md:mt-0'>
            <div
              ref={imageWrapRef}
              className='aspect-4/5 overflow-hidden rounded-sm border border-border'
            >
              <Image
                src={HERO_IMG}
                alt='Shaon Landmark services overview'
                layout='fullWidth'
                height={750}
                className='h-full w-full object-cover transition-transform duration-900 ease-out hover:scale-[1.03]'
              />
            </div>

            {/* Quote accent — glass-blur style */}
            <div
              ref={quoteRef}
              className='absolute -bottom-6 -left-6 hidden border border-custom/30 rounded-sm md:block'
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
              <div className='absolute top-0 left-0 w-6 h-px bg-custom/50' />
              <div className='absolute top-0 left-0 w-px h-6 bg-custom/50' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
