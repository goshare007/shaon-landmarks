import { Lenis } from 'lenis/react';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Lenis
      root
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </Lenis>
  );
}
