import { Image } from '@unpic/react';
import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const stats = [
  { value: '40%', label: 'Energy Reduction' },
  { value: '200+', label: 'Green-Certified Units' },
  { value: 'Zero', label: 'Net Carbon Committed' },
];

export function SustainabilityPhilosophy() {
  return (
    <section className='py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <SectionHeading
              eyebrow='Our Philosophy'
              heading='Designing for'
              highlight='Generations'
            />
            <p className='mt-5 text-sm leading-relaxed text-muted-foreground'>
              At Shaon Landmarks, sustainability is not an afterthought — it is
              the foundation. Every project begins with a commitment to
              environmental stewardship, community well-being, and enduring
              value. We believe luxury and responsibility are not mutually
              exclusive.
            </p>

            <div className='mt-10 grid grid-cols-3 gap-6'>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className='font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light text-foreground'>
                    {s.value}
                  </div>
                  <div className='mt-2 w-5 h-px bg-custom/40' />
                  <div className='mt-2 text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase'>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='overflow-hidden rounded-sm'>
            <Image
              src={SustainabilityImg}
              alt='Sustainable architecture design'
              layout='fullWidth'
              decoding='async'
              height={600}
              loading='lazy'
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
