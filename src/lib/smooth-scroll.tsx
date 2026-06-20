'use client';

import { type ReactNode, useEffect } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

interface LenisScrollProviderProps {
  children: ReactNode;
}

export function LenisScrollProvider({ children }: LenisScrollProviderProps) {
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
      const { ScrollTrigger } = await loadGsap();

      lenis = new Lenis({
        lerp: 0.08,
        wheelMultiplier: 1,
        smoothWheel: true,
        touchMultiplier: 1,
      });

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      let rafId: number;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
      };
    }

    init();

    return () => {
      cleanup?.();
    };
  }, []);

  return <div>{children}</div>;
}
