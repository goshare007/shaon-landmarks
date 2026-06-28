import {
  IconDiamond,
  IconHourglass,
  IconShieldCheck,
} from '@tabler/icons-react';
import { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { pillars } from '@/content/pillars';

// Map pillar icon string → Tabler React icon component
const ICONS: Record<string, React.ReactNode> = {
  shield: <IconShieldCheck size={20} stroke={1.5} />,
  architecture: <IconDiamond size={20} stroke={1.5} />,
  history_edu: <IconHourglass size={20} stroke={1.5} />,
};

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='py-20 md:py-28 site-wrapper border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='What We Stand For'
          heading='Built on three'
          highlight='immovable pillars'
          className='mb-16 md:mb-20'
        />

        {/* Cards grid */}
        <div ref={cardsRef} className='grid md:grid-cols-3 gap-6'>
          {pillars.map((pillar) => (
            <Card
              key={pillar.id}
              className='group relative overflow-hidden rounded-sm border-border bg-card shadow-none transition-shadow duration-300 hover:shadow-md'
            >
              {/* Top accent line — draws in on hover */}
              <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />

              <CardContent className='flex flex-col gap-5 p-8 md:p-10'>
                {/* Icon container */}
                <div className='flex items-center justify-center w-11 h-11 rounded-md border border-border bg-background text-custom transition-all duration-300 group-hover:border-custom/30 group-hover:shadow-sm'>
                  {ICONS[pillar.icon]}
                </div>

                {/* Title + rule + description */}
                <div className='flex flex-col gap-3 flex-1'>
                  <h3 className='font-serif text-xl font-light text-foreground tracking-wide'>
                    {pillar.title}
                  </h3>
                  <div className='w-8 h-px bg-custom/40 transition-all duration-300 group-hover:w-14 group-hover:bg-custom' />
                  <p className='text-sm leading-relaxed text-muted-foreground mt-1'>
                    {pillar.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
