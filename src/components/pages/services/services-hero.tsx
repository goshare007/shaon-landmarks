import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import HERO_IMG from '@/assets/images/services/hero.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const HERO_STATS = [
  { num: '48+', label: 'Completed Projects' },
  { num: '16+', label: 'Years of Expertise' },
  { num: '100%', label: 'RAJUK Compliant' },
];

export function ServicesHero() {
  return (
    <section className='relative overflow-hidden border-b border-white/6'>
      <div className='grid md:grid-cols-12'>
        {/* Left panel — dark brand */}
        <div className='relative bg-surface-brand md:col-span-7 py-24 md:py-32'>
          {/* Corner accents */}
          <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
          <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
          <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
          <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
          <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
          <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
          <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
          <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />

          <div className='site-wrapper'>
            <SectionHeading
              eyebrow='Our Expertise'
              heading='Crafting Excellence'
              highlight='Across Every Dimension'
              as='h1'
              headingClassName='text-[clamp(2.5rem,5vw,4rem)] leading-tight text-white'
            />
            <p className='mb-8 max-w-xl text-sm leading-relaxed text-white/55 md:text-base'>
              From strategic land acquisition to the final touch of interior
              elegance, Shaon Landmarks delivers architectural integrity through
              a multidisciplinary approach.
            </p>

            {/* Stats */}
            <div className='flex flex-wrap gap-4 mb-8'>
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className='flex items-center gap-3 border-l border-custom/40 pl-4 py-2'
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div>
                    <span className='font-serif text-xl md:text-2xl text-white leading-none'>
                      {stat.num}
                    </span>
                    <span className='block text-[8px] md:text-[10px] tracking-[0.18em] uppercase text-white/55 font-medium'>
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to='/portfolio'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3'>
                View Our Portfolio
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
          </div>
        </div>

        {/* Right panel — image */}
        <div className='relative min-h-[50vh] md:col-span-5 md:min-h-0'>
          <div className='md:absolute md:inset-0'>
            <Image
              src={HERO_IMG}
              alt='Shaon Landmark services overview'
              layout='fullWidth'
              decoding='async'
              height={900}
              className='h-full w-full object-cover'
            />
          </div>
          <div className='absolute inset-0 bg-linear-to-l from-black/30 to-transparent pointer-events-none' />

          {/* Quote card — glass blur */}
          <div
            className='absolute bottom-8 left-8 border border-custom/30 rounded-sm'
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className='px-8 py-7'>
              <p className='font-serif text-lg italic leading-snug text-white/80'>
                &ldquo;Permanent Quality&rdquo;
              </p>
            </div>
            <div className='absolute top-0 left-0 w-6 h-px bg-custom/50' />
            <div className='absolute top-0 left-0 w-px h-6 bg-custom/50' />
          </div>
        </div>
      </div>
    </section>
  );
}
