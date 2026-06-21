import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import HERO_IMG from '@/assets/images/services/hero.webp';

export function ServicesHero() {
  return (
    <section className='relative overflow-hidden bg-surface py-24 md:py-32'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-6 md:grid-cols-12'>
          <div className='md:col-span-7'>
            <span className='mb-6 block text-label font-medium tracking-[0.2em] text-secondary uppercase'>
              Our Expertise
            </span>
            <h1 className='heading-hero mb-8 text-primary'>
              Crafting Excellence Across Every Dimension
            </h1>
            <p className='mb-12 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg'>
              From strategic land acquisition to the final touch of interior
              elegance, Shaon Landmarks delivers architectural integrity through
              a multidisciplinary approach.
            </p>
            <Link
              to='/portfolio'
              search={{ status: '', location: '', search: '' }}
              className='inline-block rounded-sm bg-primary px-8 py-4 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
            >
              View Our Portfolio
            </Link>
          </div>

          <div className='relative mt-12 md:col-span-5 md:mt-0'>
            <div className='aspect-4/5 overflow-hidden bg-surface-container'>
              <div className='h-full w-full'>
                <Image
                  src={HERO_IMG}
                  alt='Shaon Landmark services overview'
                  layout='fullWidth'
                  height={750}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div className='absolute -bottom-6 -left-6 hidden bg-secondary p-8 md:block'>
              <p className='text-lg italic font-serif text-on-primary leading-snug'>
                &ldquo;Permanent Quality&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
