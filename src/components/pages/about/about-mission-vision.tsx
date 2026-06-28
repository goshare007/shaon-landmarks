import {
  IconBuildingSkyscraper,
  IconChecks,
  IconEye,
} from '@tabler/icons-react';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

// ─────────────────────────────────────────────────────────────────────────────
const MISSION_LIST = [
  '100% Timely Handover',
  'Premium Raw Materials',
  'Transparent Contracts',
];

export function AboutMissionVision() {
  const sectionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-raised py-24 border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          eyebrow='Purpose & Direction'
          heading='Mission &'
          highlight='Vision'
          headingClassName='max-w-sm'
          className='mb-14'
        />

        <div className='grid gap-6 md:grid-cols-2'>
          {/* Mission — light card */}
          <div
            ref={missionRef}
            className='group relative flex flex-col justify-between border border-border bg-white p-10 md:p-12 rounded-sm overflow-hidden transition-shadow duration-300 hover:shadow-md'
          >
            <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
            <div>
              <div className='flex items-center justify-center w-11 h-11 rounded-md border border-border bg-surface-raised text-custom mb-8 transition-all duration-300 group-hover:border-custom/30'>
                <IconBuildingSkyscraper size={20} stroke={1.5} />
              </div>
              <h3 className='font-serif text-2xl font-light text-foreground mb-5'>
                Mission
              </h3>
              <div className='w-8 h-px bg-custom/40 mb-6' />
              <p className='text-sm leading-relaxed text-muted-foreground'>
                To deliver world-class living spaces that harmonize luxury with
                functionality, ensuring every client experiences the peace of
                mind that comes with timely handover and uncompromising build
                quality.
              </p>
            </div>
            <ul className='mt-8 space-y-3 pt-8 border-t border-border'>
              {MISSION_LIST.map((item) => (
                <li key={item} className='flex items-center gap-3'>
                  <IconChecks
                    size={14}
                    stroke={1.5}
                    className='text-custom shrink-0'
                  />
                  <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-foreground'>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision — dark card */}
          <div
            ref={visionRef}
            className='group relative flex flex-col justify-between bg-surface-overlay p-10 md:p-12 rounded-sm overflow-hidden md:mt-10 border border-white/6'
          >
            {/* Corner accents */}
            <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
              <div className='absolute top-0 left-0 w-full h-px bg-custom/40' />
              <div className='absolute top-0 left-0 h-full w-px bg-custom/40' />
            </div>
            <div>
              <div className='flex items-center justify-center w-11 h-11 rounded-md border border-white/10 bg-white/4 text-custom mb-8'>
                <IconEye size={20} stroke={1.5} />
              </div>
              <h3 className='font-serif text-2xl font-light text-white mb-5'>
                Vision
              </h3>
              <div className='w-8 h-px bg-custom/40 mb-6' />
              <p className='text-sm leading-relaxed text-white/50'>
                To become the most trusted real estate partner in the region,
                recognized for setting the gold standard in architectural
                integrity and customer-centric property management.
              </p>
            </div>
            <div className='mt-8 border-t border-white/6 pt-8'>
              <p className='font-serif text-xl italic font-light leading-snug text-white/70'>
                &ldquo;Building the Future, Preserving the Legacy.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
