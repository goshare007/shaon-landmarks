import { useEffect, useRef, useState } from 'react';

export function Preloader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (dismissedRef.current) return;
    try {
      if (sessionStorage.getItem('sl-preloader')) {
        dismissedRef.current = true;
        setShow(false);
        return;
      }
    } catch {
      /* noop */
    }

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;
      setShow(false);
      try {
        sessionStorage.setItem('sl-preloader', '1');
      } catch {
        /* noop */
      }
    };

    const timer = setTimeout(dismiss, 3500);

    return () => {
      clearTimeout(timer);
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
          x='0'
          y='0'
          width='100'
          height='100'
          fill='none'
          stroke='rgba(166,124,82,0.2)'
          strokeWidth='0.4'
          vectorEffect='non-scaling-stroke'
        />
      </svg>

      <div
        className='absolute inset-0'
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
        }}
      />

      <div className='relative z-10'>
        <h1 className='font-serif text-3xl tracking-wide text-white md:text-5xl'>
          Shaon Landmarks
        </h1>
      </div>

      <div className='relative z-10 mt-5 h-px w-2/5 bg-secondary' />

      <h2 className='relative z-10 mt-5 font-sans text-xs tracking-[0.3em] text-white/40 uppercase md:text-sm'>
        Architecting Tomorrow
      </h2>
    </div>
  );
}
