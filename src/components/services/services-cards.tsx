'use client';

import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import ARCH_IMG from '@/assets/images/services/architecture.webp';
import CONST_IMG from '@/assets/images/services/construction.webp';
import INTERIOR_IMG from '@/assets/images/services/interior.webp';
import LAND_IMG from '@/assets/images/services/land-development.webp';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';
import { DynamicIcon } from '@/lib/icon-map';

const SERVICES = [
  {
    title: 'Land Development',
    desc: 'Strategic location selection is our foundation. We identify and acquire prime real estate with high appreciation potential, ensuring a solid base for future masterpieces.',
    icon: 'landscape',
    img: LAND_IMG,
    link: { to: '/contact', label: 'Explore Strategies' },
    colSpan: 'lg:col-span-8',
    layout: 'row',
  },
  {
    title: 'Architectural Design',
    desc: 'Functional aesthetics that define modern living. Our designs balance structural rhythm with human-centric flow.',
    icon: 'architecture',
    img: ARCH_IMG,
    link: null,
    colSpan: 'lg:col-span-4',
    layout: 'col',
  },
  {
    title: 'Construction Management',
    desc: 'Uncompromising structural integrity. We manage every phase with rigorous safety protocols and precision engineering.',
    icon: 'engineering',
    img: CONST_IMG,
    link: null,
    colSpan: 'lg:col-span-4',
    layout: 'col',
  },
  {
    title: 'Interior Design',
    desc: 'Bespoke luxury for living spaces that reflect your identity. We combine the warmth of Metallic Bronze with Onyx sophisticated finishes to create a gallery-like home.',
    icon: 'format_paint',
    img: INTERIOR_IMG,
    link: { to: '/contact', label: 'View Interior Gallery' },
    colSpan: 'lg:col-span-8',
    layout: 'row-reverse',
  },
];

export function ServicesCards() {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapAnimation((gsap, _ScrollTrigger) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        section.querySelector('[data-cards-heading]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        section.querySelector('[data-cards-line]'),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, transformOrigin: 'left' },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelectorAll('[data-cards-item]'),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
        '-=0.3',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface-container-low py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-16'>
          <h2
            data-cards-heading
            className='mb-4 text-4xl leading-[1.2] font-serif md:text-5xl'
          >
            Core Services
          </h2>
          <div
            data-cards-line
            className='h-1 w-24 bg-secondary scale-x-0 origin-left'
          />
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12'>
          {SERVICES.map((service) => (
            <div
              key={service.title}
              data-cards-item
              className={`group relative overflow-hidden border border-outline-variant bg-white ${service.colSpan}`}
            >
              {service.layout === 'row' || service.layout === 'row-reverse' ? (
                <div
                  className={`flex h-full flex-col ${service.layout === 'row-reverse' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                >
                  <div className='flex flex-col justify-between p-10 md:w-1/2'>
                    <div>
                      <DynamicIcon
                        name={service.icon}
                        size={40}
                        className='mb-6 block text-secondary'
                      />
                      <h3 className='mb-4 text-3xl font-serif'>
                        {service.title}
                      </h3>
                      <p className='mb-6 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                        {service.desc}
                      </p>
                    </div>
                    {service.link && (
                      <Link
                        to={service.link.to}
                        className='flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase no-underline transition-all group-hover:gap-4'
                      >
                        {service.link.label}
                        <ArrowRight size={16} aria-hidden='true' />
                      </Link>
                    )}
                  </div>
                  <div className='aspect-square md:w-1/2 md:aspect-auto overflow-hidden'>
                    <Image
                      src={service.img}
                      alt={`${service.title} project overview`}
                      layout='fullWidth'
                      width={600}
                      height={600}
                      className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                    />
                  </div>
                </div>
              ) : (
                <div className='flex h-full flex-col'>
                  <div className='aspect-video overflow-hidden'>
                    <Image
                      src={service.img}
                      alt={`${service.title} rendering`}
                      layout='fullWidth'
                      width={600}
                      height={338}
                      className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                    />
                  </div>
                  <div className='p-8'>
                    <DynamicIcon
                      name={service.icon}
                      size={36}
                      className='mb-4 block text-secondary'
                    />
                    <h3 className='mb-3 text-2xl font-serif'>
                      {service.title}
                    </h3>
                    <p className='text-sm leading-relaxed text-on-surface-variant'>
                      {service.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
