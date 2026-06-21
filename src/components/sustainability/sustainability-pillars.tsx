import { DynamicIcon } from '@/lib/icon-map';

const pillars = [
  {
    icon: 'ecology',
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
  },
  {
    icon: 'forest',
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
  },
  {
    icon: 'energy_savings_leaf',
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
  },
];

export function SustainabilityPillars() {
  return (
    <section className='bg-surface-container-low py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-12 text-center'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Our Initiatives
          </span>
          <h2 className='mt-3 text-3xl font-serif text-on-surface sm:text-4xl'>
            Three Pillars of Sustainability
          </h2>
        </div>
        <div className='grid gap-8 md:grid-cols-3'>
          {pillars.map((p) => (
            <div
              key={p.title}
              className='rounded-sm bg-white p-8 transition-transform duration-300 hover:-translate-y-1'
            >
              <DynamicIcon name={p.icon} size={28} className='text-secondary' />
              <h3 className='mb-3 mt-4 text-lg font-serif text-on-surface'>
                {p.title}
              </h3>
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
