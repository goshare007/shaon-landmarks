'use client';

type Gsap = typeof import('gsap')['gsap'];
type ScrollTrigger = typeof import('gsap/ScrollTrigger')['ScrollTrigger'];

let loadPromise: Promise<{ gsap: Gsap; ScrollTrigger: ScrollTrigger }> | null =
  null;

/**
 * Singleton GSAP + ScrollTrigger loader.
 * All animated components share one preload/register cycle.
 */
export function loadGsap(): Promise<{
  gsap: Gsap;
  ScrollTrigger: ScrollTrigger;
}> {
  if (!loadPromise) {
    loadPromise = Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    });
  }
  return loadPromise;
}
