import { Image } from '@unpic/react';
import HERO_IMAGE from '@/assets/images/about/hero.webp';

const HERO_STATS = [
  { num: '2008', label: 'Founded' },
  { num: '48+', label: 'Projects' },
  { num: '500+', label: 'Families' },
];

export function AboutHero() {
  return (
    <section className='relative h-[80vh] min-h-160 overflow-hidden'>
      <div className='absolute inset-0'>
        <Image
          src={HERO_IMAGE}
          alt='Shaon Landmarks — architectural excellence since 2008'
          layout='fullWidth'
          height={1000}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='absolute inset-0 bg-linear-to-r from-surface-brand/85 via-surface-brand/50 to-transparent' />
      <div className='absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent' />

      <div className='relative z-10 flex h-full items-center'>
        <div className='site-wrapper w-full'>
          <div className='max-w-lg'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-10 h-px bg-custom' />
              <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
                Since 2008
              </span>
            </div>

            <h1 className='font-serif text-[clamp(2.8rem,5.5vw,4.2rem)] font-light leading-[1.04] text-white'>
              A Legacy of{' '}
              <span
                className='italic'
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                }}
              >
                Integrity
              </span>
            </h1>

            <p className='mt-5 max-w-md text-sm leading-relaxed text-white/55'>
              Crafting landmarks that stand as a testament to architectural
              precision and unwavering commitment in the heart of Bangladesh.
            </p>

            <div className='flex items-center gap-8 mt-10 pt-8 border-t border-white/10'>
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className='flex items-center gap-8'>
                  {i > 0 && <div className='w-px h-7 bg-white/10' />}
                  <div className='flex flex-col gap-1'>
                    <span className='font-serif text-[22px] md:text-[26px] text-white leading-none'>
                      {s.num}
                    </span>
                    <span className='text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium'>
                      {s.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-6 right-6 z-10'>
        <div
          className='flex items-center gap-2.5 px-3.5 py-2.5 rounded-sm border border-white/8'
          style={{
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className='w-1.5 h-1.5 rounded-full bg-custom animate-pulse' />
          <span className='text-[10px] tracking-[0.12em] uppercase text-white/55 font-medium'>
            Dhaka, Bangladesh
          </span>
        </div>
      </div>
    </section>
  );
}
