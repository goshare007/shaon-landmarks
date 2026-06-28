import { Image } from '@unpic/react';
import ENERGY_EFFICIENCY from '@/assets/images/sustainability/energy-efficiency.webp';
import GREEN_SPACES from '@/assets/images/sustainability/green-spaces.webp';
import SUSTAINABLE_MATERIALS from '@/assets/images/sustainability/sustainable-materials.webp';
import { SectionHeading } from '@/components/ui/section-heading';

const pillars = [
  {
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
    image: SUSTAINABLE_MATERIALS,
    alt: 'Eco-friendly building materials',
  },
  {
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
    image: GREEN_SPACES,
    alt: 'Lush green landscape design',
  },
  {
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
    image: ENERGY_EFFICIENCY,
    alt: 'Energy efficient building design',
  },
];

export function SustainabilityPillars() {
  return (
    <section className='bg-surface-raised py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Our Initiatives'
          heading='Three Pillars of'
          highlight='Sustainability'
          align='center'
          className='mb-12'
        />

        <div className='grid gap-6 md:grid-cols-3'>
          {pillars.map((p) => (
            <div
              key={p.title}
              className='group border border-border bg-card overflow-hidden rounded-sm transition-colors duration-500 hover:border-custom/25'
            >
              <div className='aspect-[16/9] overflow-hidden'>
                <Image
                  src={p.image}
                  alt={p.alt}
                  layout='fullWidth'
                  height={400}
                  className='h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]'
                />
              </div>

              <div className='p-6 md:p-8'>
                <h3 className='font-serif text-base font-light text-foreground'>
                  {p.title}
                </h3>
                <div className='my-3 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
