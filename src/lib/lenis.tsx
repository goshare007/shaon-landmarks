import Lenis from 'lenis';
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ScrollTrigger } from '@/lib/gsap';

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    });

    lenisInstance.on('scroll', ScrollTrigger.update);

    let rafId: number;

    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    setLenis(lenisInstance);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  const value = useMemo(() => ({ lenis }), [lenis]);

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}
