'use client';

import { useRouterState } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useRouterState({ select: (s) => s.location.href });
  const [cachedChildren, setCachedChildren] = useState(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevLocation = useRef(location);

  useEffect(() => {
    if (location === prevLocation.current) return;
    prevLocation.current = location;

    const el = containerRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReduced) {
      setCachedChildren(children);
      return;
    }

    document.body.style.overflow = 'hidden';

    loadGsap().then(({ gsap }) => {
      gsap.killTweensOf(el);

      const tl = gsap.timeline({
        onComplete: () => {
          setCachedChildren(children);
          requestAnimationFrame(() => {
            gsap.fromTo(
              el,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
                onComplete: () => {
                  document.body.style.overflow = '';
                },
              },
            );
          });
        },
      });

      tl.to(el, { opacity: 0, duration: 0.15, ease: 'power2.out' });
    });
  }, [location, children]);

  return <div ref={containerRef}>{cachedChildren}</div>;
}
