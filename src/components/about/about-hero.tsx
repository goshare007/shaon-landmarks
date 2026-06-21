import { Image } from '@unpic/react';
import HERO_IMAGE from '@/assets/images/about/hero.webp';

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 6,
  duration: Math.random() * 4 + 5,
}));

export function AboutHero() {
  return (
    <section className='relative overflow-hidden bg-tertiary'>
      <div className='mx-auto grid min-h-179 max-w-360 md:grid-cols-2'>
        <div className='z-10 flex flex-col justify-center px-4 py-20 text-on-tertiary md:px-16'>
          <span className='mb-4 text-label font-medium tracking-[0.2em] text-secondary-fixed-dim uppercase'>
            Established Excellence
          </span>
          <h1 className='heading-hero'>
            <span className='block'>A Legacy of</span>
            <span className='block'>Integrity</span>
          </h1>
          <p className='mt-6 max-w-lg text-base leading-relaxed text-on-tertiary-fixed-variant md:text-lg'>
            Crafting landmarks that stand as a testament to architectural
            precision and unwavering commitment in the heart of Bangladesh.
          </p>
          <div className='mt-10 flex gap-4'>
            <div className='mt-2 h-px w-12 shrink-0 bg-secondary-fixed-dim' />
            <p className='max-w-sm text-sm italic leading-relaxed text-on-tertiary-container'>
              &ldquo;We don&apos;t just build structures; we cultivate trust
              through every brick laid and every promise kept.&rdquo;
            </p>
          </div>
        </div>

        <div className='relative h-100 overflow-hidden md:h-full'>
          <div className='h-full w-full'>
            <Image
              src={HERO_IMAGE}
              alt=''
              layout='fullWidth'
              height={1000}
              className='h-full w-full object-cover'
            />
          </div>

          <div className='absolute inset-0 pointer-events-none overflow-hidden'>
            {PARTICLES.map((p) => (
              <div
                key={p.id}
                className='absolute rounded-full'
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: 'rgba(238,189,142,0.2)',
                  animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
                }}
              />
            ))}
          </div>

          <div className='absolute inset-0 hidden bg-linear-to-r from-tertiary/60 to-transparent md:block' />
        </div>
      </div>
    </section>
  );
}
