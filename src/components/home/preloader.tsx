'use client';

import { useEffect, useRef, useState } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

export function Preloader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<SVGRectElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const dismissed = (() => {
      try {
        return sessionStorage.getItem('sl-preloader');
      } catch {
        return null;
      }
    })();

    if (dismissed) {
      setShow(false);
      return;
    }

    let killed = false;
    const cleanupRef: { current: (() => void) | null } = { current: null };

    loadGsap().then(({ gsap }) => {
      if (killed) return;
      const el = containerRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => {
            gsap.to(el, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut',
              onComplete: () => {
                setShow(false);
                try {
                  sessionStorage.setItem('sl-preloader', '1');
                } catch {
                  /* noop */
                }
              },
            });
          },
        });

        tl.fromTo(
          frameRef.current,
          { strokeDashoffset: 2500 },
          { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
        );

        tl.to(gridRef.current, { opacity: 1, duration: 0.8 }, '-=0.8');

        tl.fromTo(
          logoRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4',
        );

        tl.fromTo(
          accentRef.current,
          { width: '0%' },
          { width: '40%', duration: 0.6, ease: 'power3.out' },
          '-=0.3',
        );

        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2',
        );

        tl.to({}, { duration: 0.8 });
      }, el);

      cleanupRef.current = () => ctx.revert();
    });

    return () => {
      killed = true;
      cleanupRef.current?.();
    };
  }, []);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className='fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] pointer-events-none'
    >
      <svg
        className='absolute inset-[8%] h-auto w-auto md:inset-[10%]'
        viewBox='0 0 100 100'
        preserveAspectRatio='none'
        aria-hidden='true'
      >
        <rect
          ref={frameRef}
          x='0'
          y='0'
          width='100'
          height='100'
          fill='none'
          stroke='rgba(166,124,82,0.2)'
          strokeWidth='0.4'
          strokeDasharray='2500'
          strokeDashoffset='2500'
          vectorEffect='non-scaling-stroke'
        />
      </svg>

      <div
        ref={gridRef}
        className='absolute inset-0 opacity-0'
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
        }}
      />

      <div ref={logoRef} className='relative z-10 opacity-0'>
        <h1 className='font-serif text-3xl tracking-wide text-white md:text-5xl'>
          Shaon Landmarks
        </h1>
      </div>

      <div
        ref={accentRef}
        className='relative z-10 mt-5 h-px bg-secondary'
        style={{ width: 0 }}
      />

      <h2
        ref={taglineRef}
        className='relative z-10 mt-5 font-sans text-xs tracking-[0.3em] text-white/40 opacity-0 uppercase md:text-sm'
      >
        Architecting Tomorrow
      </h2>
    </div>
  );
}
