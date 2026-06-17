'use client';

import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useRef } from 'react';
import HERO_IMG from '@/assets/images/services/hero.webp';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function ServicesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapAnimation((gsap, _ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        section.querySelector('[data-hero-left]'),
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
      );

      tl.fromTo(
        section.querySelector('[data-hero-eyebrow]'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.5',
      );

      tl.fromTo(
        section.querySelector('[data-hero-heading]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.35',
      );

      tl.fromTo(
        section.querySelector('[data-hero-desc]'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.35',
      );

      tl.fromTo(
        section.querySelector('[data-hero-cta]'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelector('[data-hero-image]'),
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1 },
        '-=0.8',
      );

      gsap.to(section.querySelector('[data-hero-image]'), {
        scale: 1.08,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'easeInOut',
      });

      tl.fromTo(
        section.querySelector('[data-hero-quote]'),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.4',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative overflow-hidden bg-surface py-24 md:py-32'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-6 md:grid-cols-12'>
          <div data-hero-left className='md:col-span-7'>
            <span
              data-hero-eyebrow
              className='mb-6 block text-label font-medium tracking-[0.2em] text-secondary uppercase'
            >
              Our Expertise
            </span>
            <h1 data-hero-heading className='heading-hero mb-8 text-primary'>
              Crafting Excellence Across Every Dimension
            </h1>
            <p
              data-hero-desc
              className='mb-12 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg'
            >
              From strategic land acquisition to the final touch of interior
              elegance, Shaon Landmarks delivers architectural integrity through
              a multidisciplinary approach.
            </p>
            <Link
              data-hero-cta
              to='/portfolio'
              className='inline-block rounded-sm bg-primary px-8 py-4 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
            >
              View Our Portfolio
            </Link>
          </div>

          <div className='relative mt-12 md:col-span-5 md:mt-0'>
            <div className='aspect-4/5 overflow-hidden bg-surface-container'>
              <div data-hero-image className='h-full w-full'>
                <Image
                  src={HERO_IMG}
                  alt='Shaon Landmark services overview'
                  layout='fullWidth'
                  width={600}
                  height={750}
                  className='h-full w-full object-cover'
                />
              </div>
            </div>
            <div
              data-hero-quote
              className='absolute -bottom-6 -left-6 hidden bg-secondary p-8 md:block'
            >
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
