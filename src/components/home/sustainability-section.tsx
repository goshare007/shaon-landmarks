'use client';

import { Image } from '@unpic/react';
import { useRef } from 'react';
import energyEfficiency from '@/assets/images/sustainability/energy-efficiency.webp';
import greenSpaces from '@/assets/images/sustainability/green-spaces.webp';
import sustainableMaterials from '@/assets/images/sustainability/sustainable-materials.webp';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const sustainabilityData = [
  {
    title: 'Sustainable Materials',
    description:
      'Sourcing eco-friendly materials that minimize environmental impact without compromising luxury.',
    image: sustainableMaterials,
  },
  {
    title: 'Green Spaces',
    description:
      'Integrating lush landscapes and vertical gardens into every development for healthier urban living.',
    image: greenSpaces,
  },
  {
    title: 'Energy Efficiency',
    description:
      'Smart building systems engineered to reduce energy consumption while maximizing comfort and air quality.',
    image: energyEfficiency,
  },
];

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap, ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const cleanups: (() => void)[] = [];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    tl.fromTo(
      section.querySelector('[data-sus-header]'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
    );

    const cards = section.querySelectorAll('[data-sus-card]');
    cards.forEach((card, i) => {
      const xFrom = i === 0 ? -40 : i === 2 ? 40 : 0;

      tl.fromTo(
        card,
        { opacity: 0, y: 40, x: xFrom },
        { opacity: 1, y: 0, x: 0, duration: 0.8 },
        '-=0.4',
      );

      const bg = card.querySelector('[data-sus-bg]');
      if (bg) {
        tl.fromTo(
          bg,
          { scale: 1 },
          {
            scale: 1.05,
            duration: 0.8,
            ease: 'none',
          },
          '-=0.8',
        );

        const sc = ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const pct = self.progress;
            gsap.set(bg, { y: `${pct * 8}%` });
          },
        });
        cleanups.push(() => sc.kill());
      }
    });

    const descriptions = section.querySelectorAll('[data-sus-text]');
    tl.fromTo(
      descriptions,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
      '-=0.3',
    );

    cleanups.push(() => tl.kill());

    return cleanups;
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-sus-header className='mb-12 max-w-2xl'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Sustainability & Innovation
          </span>
          <h2 className='mt-3 text-3xl leading-tight text-on-surface font-serif sm:text-4xl'>
            Building responsibly for a better tomorrow.
          </h2>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {sustainabilityData.map((item) => (
            <div
              key={item.title}
              data-sus-card
              className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'
            >
              <div
                data-sus-bg
                className='absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-110'
              >
                <Image
                  src={item.image}
                  alt=''
                  layout='fullWidth'
                  width={600}
                  height={400}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <h3 className='text-lg font-serif text-white'>{item.title}</h3>
                <p data-sus-text className='mt-2 text-sm text-white/70'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
