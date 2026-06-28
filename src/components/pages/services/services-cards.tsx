import {
  IconArrowRight,
  IconBuildingArch,
  IconHeart,
  IconMountain,
  IconPaint,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useRef } from 'react';
import ARCH_IMG from '@/assets/images/services/architecture.webp';
import CONST_IMG from '@/assets/images/services/construction.webp';
import INTERIOR_IMG from '@/assets/images/services/interior.webp';
import LAND_IMG from '@/assets/images/services/land-development.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const SERVICES = [
  {
    title: 'Land Development',
    desc: 'Strategic location selection is our foundation. We identify and acquire prime real estate with high appreciation potential, ensuring a solid base for future masterpieces.',
    icon: IconMountain,
    img: LAND_IMG,
    link: { to: '/contact', label: 'Explore Strategies' },
    colSpan: 'lg:col-span-8',
    layout: 'row',
  },
  {
    title: 'Architectural Design',
    desc: 'Functional aesthetics that define modern living. Our designs balance structural rhythm with human-centric flow.',
    icon: IconBuildingArch,
    img: ARCH_IMG,
    link: null,
    colSpan: 'lg:col-span-4',
    layout: 'col',
  },
  {
    title: 'Construction Management',
    desc: 'Uncompromising structural integrity. We manage every phase with rigorous safety protocols and precision engineering.',
    icon: IconHeart,
    img: CONST_IMG,
    link: null,
    colSpan: 'lg:col-span-4',
    layout: 'col',
  },
  {
    title: 'Interior Design',
    desc: 'Bespoke luxury for living spaces that reflect your identity. We combine warmth of Metallic Bronze with sophisticated Onyx finishes to create a gallery-like home.',
    icon: IconPaint,
    img: INTERIOR_IMG,
    link: { to: '/contact', label: 'View Interior Gallery' },
    colSpan: 'lg:col-span-8',
    layout: 'row-reverse',
  },
] as const;

export function ServicesCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-raised py-20 md:py-28 border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='What We Do'
          heading='Core'
          highlight='Services'
          className='mb-16'
        />

        <div
          ref={gridRef}
          className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12'
        >
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative overflow-hidden border border-border bg-card transition-colors duration-500 hover:border-custom/25 ${service.colSpan}`}
              >
                {/* Top accent draw */}
                <div className='absolute top-0 left-0 right-0 z-10 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />

                {service.layout === 'row' ||
                service.layout === 'row-reverse' ? (
                  <div
                    className={`flex h-full flex-col ${
                      service.layout === 'row-reverse'
                        ? 'md:flex-row-reverse'
                        : 'md:flex-row'
                    }`}
                  >
                    {/* Copy */}
                    <div className='flex flex-col justify-between p-8 md:w-1/2 md:p-10'>
                      <div>
                        <Icon
                          size={20}
                          stroke={1.5}
                          className='mb-6 text-custom'
                          aria-hidden='true'
                        />
                        <h3 className='mb-4 font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light text-foreground'>
                          {service.title}
                        </h3>
                        <p className='mb-8 text-sm leading-relaxed text-muted-foreground'>
                          {service.desc}
                        </p>
                      </div>
                      {service.link && (
                        <Link
                          to={service.link.to}
                          className='group/link inline-flex items-center gap-2 text-[10px] font-medium tracking-[0.18em] text-custom uppercase transition-all duration-200'
                        >
                          <span className='opacity-0 -translate-x-2 transition-all duration-200 group-hover/link:opacity-100 group-hover/link:translate-x-0'>
                            <IconArrowRight size={14} aria-hidden='true' />
                          </span>
                          {service.link.label}
                          <IconArrowRight
                            size={14}
                            className='transition-transform duration-200 group-hover/link:translate-x-0.5'
                            aria-hidden='true'
                          />
                        </Link>
                      )}
                    </div>
                    {/* Image — aspect-4/5 on mobile, full height on desktop */}
                    <div className='aspect-4/5 overflow-hidden md:aspect-auto md:w-1/2'>
                      <Image
                        src={service.img}
                        alt={`${service.title} project overview`}
                        layout='fullWidth'
                        height={600}
                        className='h-full w-full object-cover grayscale transition-all duration-900 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]'
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex h-full flex-col'>
                    {/* Image */}
                    <div className='aspect-4/5 overflow-hidden md:aspect-video'>
                      <Image
                        src={service.img}
                        alt={`${service.title} rendering`}
                        layout='fullWidth'
                        height={338}
                        className='h-full w-full object-cover grayscale transition-all duration-900 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]'
                      />
                    </div>
                    {/* Copy */}
                    <div className='p-8 translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
                      <Icon
                        size={20}
                        stroke={1.5}
                        className='mb-4 text-custom'
                        aria-hidden='true'
                      />
                      <h3 className='mb-3 font-serif text-base font-light text-foreground'>
                        {service.title}
                      </h3>
                      <p className='text-sm leading-relaxed text-muted-foreground'>
                        {service.desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
