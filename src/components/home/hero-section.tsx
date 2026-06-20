'use client';

import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useRef } from 'react';
import { HERO_CONTENT } from '@/data/home';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 137.5 + 42) % 100,
  y: (i * 89.3 + 17) % 100,
  size: (i % 3) + 1,
  delay: i % 6,
  duration: (i % 4) + 5,
}));

export function HeroSection() {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGsapAnimation((gsap, ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const rightPanel = rightPanelRef.current;
    const headline = headlineRef.current;
    if (headline) {
      gsap.set(headline, { opacity: 1 });

      const lines = headline.children;
      for (const line of lines) {
        const text = line.textContent || '';
        line.textContent = '';
        for (const char of text) {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.className = 'char';
          if (line.classList.contains('headline-stroke')) {
            span.style.color = 'transparent';
            span.style.webkitTextStroke = '1px rgba(255,255,255,0.35)';
          }
          line.appendChild(span);
        }
      }
    }

    const $ = (sel: string) => section.querySelector(sel);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      $('[data-e="eyebrow"]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
    );

    if (headline) {
      tl.fromTo(
        headline.querySelectorAll('.char'),
        { opacity: 0, y: 40, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.5,
          stagger: 0.025,
        },
        '-=0.3',
      );
    }

    tl.fromTo(
      $('[data-e="descriptor"]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2',
    );

    tl.fromTo(
      $('[data-e="stats"]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.1',
    );

    tl.fromTo(
      $('[data-e="cta"]'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.1',
    );

    tl.to('.scroll-indicator', { opacity: 1, duration: 0.5 }, '-=0.3');

    tl.fromTo(
      $('[data-e="location-badge"]'),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
      '+=0.5',
    );

    tl.fromTo(
      $('[data-e="year-label"]'),
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.6',
    );

    const updateParallax = () => {
      const img = imageRef.current;
      if (!img) return;
      mouseCurrent.current.x +=
        (mouseTarget.current.x - mouseCurrent.current.x) * 0.1;
      mouseCurrent.current.y +=
        (mouseTarget.current.y - mouseCurrent.current.y) * 0.1;
      gsap.set(img, {
        x: `${mouseCurrent.current.x}%`,
        y: `${mouseCurrent.current.y}%`,
      });
    };

    let tickerActive = false;
    let idleTimeout: ReturnType<typeof setTimeout>;

    const addTicker = () => {
      if (!tickerActive) {
        gsap.ticker.add(updateParallax);
        tickerActive = true;
      }
    };

    const removeTicker = () => {
      if (tickerActive) {
        gsap.ticker.remove(updateParallax);
        tickerActive = false;
      }
    };

    const scheduleRemove = (delay: number) => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(removeTicker, delay);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!rightPanel) return;
      const rect = rightPanel.getBoundingClientRect();
      mouseTarget.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      mouseTarget.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
      addTicker();
      scheduleRemove(100);
    };

    const onMouseLeave = () => {
      mouseTarget.current.x = 0;
      mouseTarget.current.y = 0;
      scheduleRemove(200);
    };

    rightPanel?.addEventListener('mousemove', onMouseMove);
    rightPanel?.addEventListener('mouseleave', onMouseLeave);

    const handleVisibility = () => {
      if (document.hidden) {
        clearTimeout(idleTimeout);
        removeTicker();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const imgEl = imageRef.current;
    const st = imgEl
      ? ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
          onUpdate: (self) => {
            const pct = self.progress;
            gsap.set(imgEl, { y: `${pct * 10}%` });
          },
        })
      : null;

    return [
      () => {
        clearTimeout(idleTimeout);
        removeTicker();
        document.removeEventListener('visibilitychange', handleVisibility);
        if (rightPanel) {
          rightPanel.removeEventListener('mousemove', onMouseMove);
          rightPanel.removeEventListener('mouseleave', onMouseLeave);
        }
      },
      () => tl.kill(),
      ...(st ? [() => st.kill()] : []),
    ];
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative min-h-screen md:h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2'
    >
      {/* LEFT PANEL */}
      <div className='relative z-10 bg-[#0a0a0a] flex flex-col justify-between px-6 py-10 md:px-14 md:py-12 overflow-hidden order-2 md:order-1'>
        <div className='hidden md:block absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-secondary to-transparent opacity-60' />

        <div
          ref={contentRef}
          className='flex flex-col h-full justify-between gap-12 md:gap-0'
        >
          <div className='flex-1 flex flex-col justify-center py-4 md:py-8'>
            <div
              data-e='eyebrow'
              className='flex items-center gap-4 mb-6 md:mb-9 opacity-0'
            >
              <div className='w-10 h-px bg-secondary' />
              <span className='text-caption md:text-caption font-medium tracking-[0.2em] uppercase text-secondary-fixed-dim'>
                {HERO_CONTENT.eyebrow}
              </span>
            </div>

            <h1
              ref={headlineRef}
              className='heading-hero text-white overflow-hidden opacity-0'
            >
              <span className='block'>{HERO_CONTENT.headline.first}</span>
              <span
                className='block italic headline-stroke'
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.35)',
                }}
              >
                {HERO_CONTENT.headline.second}
              </span>
            </h1>

            <div
              data-e='descriptor'
              className='flex items-start gap-5 mt-6 md:mt-9 opacity-0'
            >
              <div className='w-0.5 min-h-14 bg-secondary shrink-0 mt-0.5' />
              <p className='text-xs md:text-sm leading-relaxed text-white/50 max-w-xs font-light'>
                {HERO_CONTENT.descriptor}
              </p>
            </div>

            <div
              data-e='stats'
              className='flex flex-wrap items-center gap-6 md:gap-8 mt-8 md:mt-11 opacity-0'
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
                    <span className='text-[8px] md:text-caption tracking-[0.18em] uppercase text-white/35 font-medium'>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            data-e='cta'
            className='flex justify-between items-end mt-4 md:mt-0 opacity-0'
          >
            <div className='flex flex-col gap-4'>
              <Link
                to='/portfolio'
                className='relative overflow-hidden group inline-flex items-center gap-4 bg-primary text-on-secondary px-6 py-3 md:px-7 md:py-3.5 text-caption font-semibold tracking-[0.15em] uppercase no-underline rounded-sm w-fit hover:bg-[#8f6438] transition-colors duration-200'
              >
                <div className='absolute inset-0 -skew-12 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10'>Explore Portfolio</span>
                <svg
                  className='relative z-10 w-4 h-4'
                  viewBox='0 0 16 16'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  aria-hidden='true'
                >
                  <path d='M2 8h12M9 3l5 5-5 5' />
                </svg>
              </Link>
            </div>

            <div className='hidden md:flex flex-col items-center gap-2 scroll-indicator opacity-0'>
              <span
                className='text-caption tracking-[0.2em] uppercase text-white/25'
                style={{ writingMode: 'vertical-rl' }}
              >
                Scroll
              </span>
              <div className='w-px h-10 bg-linear-to-b from-white/20 to-transparent animate-pulse-line' />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        ref={rightPanelRef}
        className='relative h-[45vh] md:h-full overflow-hidden order-1 md:order-2'
      >
        <div
          ref={imageRef}
          className='w-full h-full will-change-transform scale-[1.15]'
        >
          <Image
            src={HERO_CONTENT.image}
            alt='Architectural landmark'
            layout='fullWidth'
            width={1440}
            height={800}
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          {PARTICLES.map((p) => (
            <div
              key={p.id}
              className='absolute rounded-full'
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: 'rgba(238,189,142,0.25)',
                animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        <div className='absolute inset-0 bg-linear-to-r from-black/40 to-transparent pointer-events-none' />
        <div className='absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none' />

        <div
          data-e='location-badge'
          className='absolute bottom-6 left-6 md:bottom-12 md:left-9 z-10'
        >
          <div
            className='flex items-center gap-3 px-4 py-3 rounded-sm border border-secondary/40'
            style={{
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className='w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim shrink-0 animate-pulse-dot' />
            <span className='text-caption tracking-[0.12em] uppercase text-white/70 font-medium'>
              {HERO_CONTENT.location}
            </span>
          </div>
        </div>

        <div
          data-e='year-label'
          className='absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4'
        >
          <span
            className='text-caption font-medium tracking-[0.2em] text-white/50 uppercase'
            style={{ writingMode: 'vertical-rl' }}
          >
            {new Date().getFullYear()}
          </span>
          <div className='w-px h-12 bg-linear-to-b from-secondary to-transparent' />
        </div>
      </div>
    </section>
  );
}
