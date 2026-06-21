import { DynamicIcon } from '@/lib/icon-map';

const MISSION_LIST = [
  '100% Timely Handover',
  'Premium Raw Materials',
  'Transparent Contracts',
];

export function AboutMissionVision() {
  return (
    <section className='bg-surface-container-low py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-12 md:grid-cols-2'>
          <div className='flex flex-col justify-between border border-outline-variant bg-white p-12 transition-all duration-300 hover:-translate-y-1'>
            <div>
              <DynamicIcon
                name='track_changes'
                size={36}
                className='mb-8 inline-block text-secondary'
              />
              <h3 className='mb-6 text-3xl font-serif'>Mission</h3>
              <p className='mb-8 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                To deliver world-class living spaces that harmonize luxury with
                functionality, ensuring every client experiences the peace of
                mind that comes with timely handover and uncompromising build
                quality.
              </p>
            </div>
            <ul className='space-y-4 text-label font-medium tracking-widest text-on-surface uppercase'>
              {MISSION_LIST.map((item) => (
                <li key={item} className='flex items-center gap-3'>
                  <span className='h-1.5 w-1.5 shrink-0 bg-secondary' />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className='flex flex-col justify-between bg-tertiary p-12 text-on-tertiary transition-all duration-300 hover:-translate-y-1 md:mt-16'>
            <div>
              <DynamicIcon
                name='visibility'
                size={36}
                className='mb-8 inline-block text-secondary-fixed-dim'
              />
              <h3 className='mb-6 text-3xl font-serif'>Vision</h3>
              <p className='mb-8 text-sm leading-relaxed text-tertiary-fixed-dim md:text-base'>
                To become the most trusted real estate partner in the region,
                recognized for setting the gold standard in architectural
                integrity and customer-centric property management.
              </p>
            </div>
            <div className='border-t border-on-tertiary-container pt-8'>
              <p className='text-2xl italic font-serif leading-snug'>
                &ldquo;Building the Future, Preserving the Legacy.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
