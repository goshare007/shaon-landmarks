import { Image } from '@unpic/react';
import { useRef } from 'react';
import CTG_IMG from '@/assets/images/contact/ctg-office.webp';
import DHAKA_IMG from '@/assets/images/contact/dhaka-office.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const OFFICES = [
  {
    tag: 'Corporate Headquarters',
    title: 'Dhaka Executive Studio',
    address: 'Level 24, Landmark Tower',
    area: 'Gulshan Avenue, Dhaka 1212',
    phone: '+880 2 987 6543',
    img: DHAKA_IMG,
  },
  {
    tag: 'Regional Studio',
    title: 'Port City Atelier',
    address: '42 Bay View Plaza',
    area: 'Agrabad C/A, Chittagong 4100',
    phone: '+880 31 123 4567',
    img: CTG_IMG,
  },
];

export function ContactLocations() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-raised py-20 md:py-28 border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Our Presence'
          heading='Global'
          highlight='Footprint'
          align='center'
          className='mb-16'
        />

        <div ref={cardsRef} className='grid gap-12 md:grid-cols-2'>
          {OFFICES.map((office) => (
            <div key={office.title} className='group cursor-pointer'>
              {/* Image */}
              <div className='relative mb-6 h-80 overflow-hidden rounded-sm border border-border transition-colors duration-500 group-hover:border-custom/25'>
                <div className='absolute top-0 left-0 right-0 z-10 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
                <Image
                  src={office.img}
                  alt={office.title}
                  layout='fullWidth'
                  height={600}
                  className='h-full w-full object-cover grayscale transition-all duration-900 ease-out group-hover:grayscale-0 group-hover:scale-[1.03]'
                />
              </div>

              {/* Content */}
              <div className='translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
                <div className='mb-3 flex items-center gap-3'>
                  <div className='w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
                  <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
                    {office.tag}
                  </span>
                </div>
                <h3 className='mb-4 font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light text-foreground'>
                  {office.title}
                </h3>
                <p className='max-w-sm text-sm leading-relaxed text-muted-foreground'>
                  {office.address}
                  <br />
                  {office.area}
                  <br />
                  {office.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
