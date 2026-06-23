import type { ProjectDetail } from '@/content/projects';
import { DynamicIcon } from '@/lib/icon-map';

export function PortfolioDetailAmenities({
  amenities,
}: {
  amenities: ProjectDetail['amenities'];
}) {
  return (
    <section className='bg-primary py-32 text-on-primary'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-24 max-w-2xl'>
          <h2 className='mb-6 text-3xl font-serif md:text-4xl lg:text-5xl'>
            Elevating the <br />
            Daily Experience
          </h2>
          <p className='text-base leading-relaxed text-on-primary-container md:text-lg'>
            We have curated a selection of amenities that mirror the needs of a
            global citizen, focusing on wellness, security, and effortless
            service.
          </p>
        </div>
        <div className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'>
          {amenities.map((a) => (
            <div
              key={a.title}
              className='border-l border-outline-variant py-4 pl-8'
            >
              <DynamicIcon
                name={a.icon}
                size={36}
                className='mb-6 text-secondary'
              />
              <h3 className='mb-4 font-serif text-xl md:text-2xl'>{a.title}</h3>
              <p className='text-sm leading-relaxed text-on-primary-container md:text-base'>
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
