'use client';

import { type ReactNode, useEffect, useRef } from 'react';

interface LenisScrollProviderProps {
  children: ReactNode;
}

export function LenisScrollProvider({ children }: LenisScrollProviderProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: ReturnType<
      typeof import('lenis').default extends { new (...args: infer P): infer R }
        ? (...args: P) => R
        : never
    > | null = null;
    let cleanup: (() => void) | null = null;

    async function init() {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReduced) return;

      const Lenis = (await import('lenis')).default;
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        smoothWheel: true,
        touchMultiplier: 1,
      });

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      cleanup = () => {
        lenis?.destroy();
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
