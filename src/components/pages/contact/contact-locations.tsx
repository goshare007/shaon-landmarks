import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react';
import { Image } from '@unpic/react';
import CTG_IMG from '@/assets/images/contact/ctg-office.webp';
import DHAKA_IMG from '@/assets/images/contact/dhaka-office.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const OFFICES = [
  {
    title: 'Dhaka Executive Studio',
    address: 'Level 24, Landmark Tower, Gulshan Avenue',
    city: 'Dhaka 1212',
    phone: '+880 2 987 6543',
    email: 'dhaka@shaonlandmarks.com',
    img: DHAKA_IMG,
  },
  {
    title: 'Port City Atelier',
    address: '42 Bay View Plaza, Agrabad C/A',
    city: 'Chittagong 4100',
    phone: '+880 31 123 4567',
    email: 'chattogram@shaonlandmarks.com',
    img: CTG_IMG,
  },
];

export function ContactLocations() {
  return (
    <section className='py-20 md:py-24 border-t border-border'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Our Offices'
          heading='Visit or'
          highlight='Reach Out'
          align='center'
          className='mb-12'
        />

        <div className='grid gap-8 md:grid-cols-2'>
          {OFFICES.map((office) => (
            <div
              key={office.title}
              className='border border-border rounded-sm overflow-hidden'
            >
              <div className='aspect-[16/9] overflow-hidden'>
                <Image
                  src={office.img}
                  alt={office.title}
                  layout='fullWidth'
                  height={400}
                  className='h-full w-full object-cover'
                />
              </div>

              <div className='p-6 space-y-4'>
                <h3 className='font-serif text-lg font-light text-foreground leading-snug'>
                  {office.title}
                </h3>

                <div className='space-y-2.5'>
                  <div className='flex items-start gap-3'>
                    <IconMapPin
                      size={15}
                      className='text-custom shrink-0 mt-0.5'
                    />
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {office.address}
                      <br />
                      {office.city}
                    </p>
                  </div>
                  <div className='flex items-center gap-3'>
                    <IconPhone size={15} className='text-custom shrink-0' />
                    <a
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className='text-sm text-muted-foreground hover:text-custom transition-colors'
                    >
                      {office.phone}
                    </a>
                  </div>
                  <div className='flex items-center gap-3'>
                    <IconMail size={15} className='text-custom shrink-0' />
                    <a
                      href={`mailto:${office.email}`}
                      className='text-sm text-muted-foreground hover:text-custom transition-colors'
                    >
                      {office.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
