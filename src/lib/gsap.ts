import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power2.out',
  duration: 0.6,
});

ScrollTrigger.config({
  ignoreMobileResize: true,
});

// Whether the user has requested reduced motion.
// Import this in components to skip animations gracefully.
export const MOTION =
  typeof window !== 'undefined'
    ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export { gsap, ScrollTrigger };
