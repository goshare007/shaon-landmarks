import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailSpecs({
  specs,
}: {
  specs: ProjectDetail['specs'];
}) {
  const items = [
    { label: 'Total Area', value: specs.totalArea },
    { label: 'Units', value: specs.units },
    { label: 'Floor Count', value: specs.floorCount },
    { label: 'Completion', value: specs.completion },
  ];

  return (
    <section className='border-b border-outline-variant bg-surface py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid grid-cols-2 gap-12 md:grid-cols-4'>
          {items.map((item) => (
            <div key={item.label}>
              <p className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                {item.label}
              </p>
              <p className='mt-2 text-xl font-serif text-primary md:text-2xl'>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
