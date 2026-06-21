import { Image } from '@unpic/react';
import HERO_IMG from '@/assets/images/contact/hero.webp';

export function ContactHero() {
  return (
    <section className='relative flex h-[90vh] items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Image
          src={HERO_IMG}
          alt=''
          layout='fullWidth'
          height={800}
          className='h-full w-full object-cover brightness-40'
        />
      </div>
      <div className='relative z-10 max-w-4xl px-4 text-center md:px-16'>
        <span className='mb-6 block text-label font-medium tracking-[0.4em] text-secondary-fixed-dim uppercase'>
          Personalized Service
        </span>
        <h1 className='heading-hero mb-8 text-on-tertiary'>
          Connect with our Consultants
        </h1>
        <p className='mx-auto max-w-2xl text-base leading-relaxed text-on-tertiary/80 md:text-lg'>
          At Shaon Landmarks, we believe that exceptional architecture begins
          with a shared vision. Our consultants are prepared to guide you
          through a bespoke development journey tailored to your specific
          requirements.
        </p>
      </div>
    </section>
  );
}
