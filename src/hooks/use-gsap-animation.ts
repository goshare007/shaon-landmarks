'use client';

import { useEffect, useRef } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

type Gsap = typeof import('gsap')['gsap'];
type ScrollTrigger = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];

export function useGsapAnimation(
  setup: (gsap: Gsap, ScrollTrigger: ScrollTrigger) => (() => void)[],
  deps: React.DependencyList = [],
) {
  const cleanupRef = useRef<(() => void)[]>([]);

  useEffect(() => {
    cleanupRef.current = [];
    let mounted = true;

    loadGsap().then(({ gsap, ScrollTrigger }) => {
      if (!mounted) return;
      cleanupRef.current = setup(gsap, ScrollTrigger);
    });

    return () => {
      mounted = false;
      for (const fn of cleanupRef.current) fn();
      cleanupRef.current = [];
    };
    // biome-ignore lint/correctness/useExhaustiveDependencies: dynamic deps passed by callers
  }, deps);
}
