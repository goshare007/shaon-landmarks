import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power2.out', duration: 0.6 });
ScrollTrigger.config({ ignoreMobileResize: true });

const MOTION =
  typeof window !== 'undefined'
    ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : true;

export { gsap, MOTION, ScrollTrigger };
