import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';

const steps = [
  {
    step: '01',
    title: 'Planning',
    desc: 'Strategic feasibility studies, land acquisition, and environmental impact assessments to ensure longevity.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Collaborative architectural conceptualization and interior planning utilizing 3D BIM technology.',
  },
  {
    step: '03',
    title: 'Construction',
    desc: 'Meticulous execution by master craftsmen with strict adherence to safety and material quality standards.',
  },
  {
    step: '04',
    title: 'Handover',
    desc: 'Final inspections, legal compliance certification, and the key delivery of your new landmark.',
  },
];

export function ServicesStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className='relative bg-surface-brand py-20 md:py-28 border-t border-white/6'
    >
      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
        <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
      </div>
      <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
      </div>

      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Our Process'
          heading='The Shaon'
          highlight='Standard'
          highlightStyle='stroke'
          align='center'
          className='mb-20'
          headingClassName='text-white'
        />

        <p className='mx-auto -mt-14 mb-16 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
          A systematic approach to perfection. We guide every project through a
          rigorous four-phase lifecycle.
        </p>

        <div ref={gridRef} className='grid grid-cols-1 md:grid-cols-4'>
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`group relative p-8 transition-colors duration-300 hover:border-custom/40 ${
                i > 0 ? 'border-l border-white/10' : ''
              }`}
            >
              {/* Step number */}
              <span className='mb-6 block font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white/20 transition-colors duration-300 group-hover:text-custom/60'>
                {s.step}
              </span>
              {/* Expanding rule */}
              <div className='mb-5 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
              <h4 className='mb-4 font-serif text-base font-light text-white'>
                {s.title}
              </h4>
              <p className='text-sm leading-relaxed text-white/55'>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
