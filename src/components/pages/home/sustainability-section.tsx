import { Image } from '@unpic/react';
import energyEfficiency from '@/assets/images/sustainability/energy-efficiency.webp';
import greenSpaces from '@/assets/images/sustainability/green-spaces.webp';
import sustainableMaterials from '@/assets/images/sustainability/sustainable-materials.webp';

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
  return (
    <section className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-12 max-w-2xl'>
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
              className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'
            >
              <div className='absolute inset-0 overflow-hidden transition-transform duration-700 group-hover:scale-110'>
                <Image
                  src={item.image}
                  alt=''
                  layout='fullWidth'
                  height={400}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <h3 className='text-lg font-serif text-white'>{item.title}</h3>
                <p className='mt-2 text-sm text-white/70'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
