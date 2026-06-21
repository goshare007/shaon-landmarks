import { pillars } from '@/data/pillars';
import { DynamicIcon } from '@/lib/icon-map';

export function PillarsSection() {
  return (
    <section className='bg-surface-container-low py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-12 md:grid-cols-3'>
          {pillars.map((pillar) => (
            <div key={pillar.id} className='group'>
              <span className='inline-flex items-center justify-center text-2xl text-secondary'>
                <DynamicIcon name={pillar.icon} size={28} />
              </span>
              <h3 className='mb-3 mt-4 text-lg font-serif text-on-surface'>
                {pillar.title}
              </h3>
              <div className='mb-4 h-px bg-secondary' />
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
