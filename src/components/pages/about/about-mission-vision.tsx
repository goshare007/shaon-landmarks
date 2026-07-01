import {
  IconDiamond,
  IconHourglass,
  IconShieldCheck,
} from '@tabler/icons-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { pillars } from '@/content/pillars';

const ICONS: Record<string, React.ReactNode> = {
  shield: <IconShieldCheck size={24} stroke={1.5} />,
  architecture: <IconDiamond size={24} stroke={1.5} />,
  history_edu: <IconHourglass size={24} stroke={1.5} />,
};

export function AboutMissionVision() {
  return (
    <section className='relative overflow-hidden bg-surface-brand py-24 border-t border-white/6'>
      <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
        <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
      </div>
      <div className='absolute top-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 right-0 w-full h-px bg-custom/30' />
        <div className='absolute top-0 right-0 h-full w-px bg-custom/30' />
      </div>
      <div className='absolute bottom-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 left-0 w-full h-px bg-custom/30' />
        <div className='absolute bottom-0 left-0 h-full w-px bg-custom/30' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
      </div>

      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='What We Stand For'
          heading='Three'
          highlight='Pillars'
          headingClassName='max-w-sm text-white'
          className='mb-14'
        />

        <div className='grid md:grid-cols-3 gap-px bg-white/10'>
          {pillars.map((p) => (
            <div
              key={p.id}
              className='bg-surface-brand p-10 md:p-12 transition-colors duration-300'
            >
              <div className='flex items-center justify-center w-12 h-12 rounded-md border border-white/10 text-custom mb-7 transition-all duration-300'>
                {ICONS[p.icon]}
              </div>

              <h3 className='font-serif text-2xl font-light text-white mb-4'>
                {p.title}
              </h3>
              <div className='w-8 h-px bg-custom/40 mb-5 transition-all duration-300' />
              <p className='text-sm leading-relaxed text-white/55'>
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
