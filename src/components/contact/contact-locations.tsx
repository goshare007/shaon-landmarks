import { Image } from '@unpic/react';
import CTG_IMG from '@/assets/images/contact/ctg-office.webp';
import DHAKA_IMG from '@/assets/images/contact/dhaka-office.webp';

const OFFICES = [
  {
    tag: 'Corporate Headquarters',
    title: 'Dhaka Executive Studio',
    address: 'Level 24, Landmark Tower',
    area: 'Gulshan Avenue, Dhaka 1212',
    phone: '+880 2 987 6543',
    img: DHAKA_IMG,
    side: 'left',
  },
  {
    tag: 'Regional Studio',
    title: 'Port City Atelier',
    address: '42 Bay View Plaza',
    area: 'Agrabad C/A, Chittagong 4100',
    phone: '+880 31 123 4567',
    img: CTG_IMG,
    side: 'right',
  },
];

export function ContactLocations() {
  return (
    <section className='bg-surface-container'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <h2 className='mb-16 text-center text-4xl leading-[1.2] font-serif md:text-5xl'>
          Global Presence
        </h2>
        <div className='grid gap-12 pb-16 md:grid-cols-2'>
          {OFFICES.map((office) => (
            <div key={office.title} className='group cursor-pointer space-y-6'>
              <div className='h-100 overflow-hidden border border-outline-variant bg-surface-dim'>
                <Image
                  src={office.img}
                  alt={office.title}
                  layout='fullWidth'
                  height={600}
                  className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                />
              </div>
              <div>
                <span className='mb-2 block text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                  {office.tag}
                </span>
                <h3 className='mb-4 text-2xl font-serif'>{office.title}</h3>
                <p className='max-w-sm text-sm leading-relaxed text-on-surface-variant'>
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
