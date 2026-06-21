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
  return (
    <section className='bg-tertiary py-24 text-on-tertiary'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-20 text-center'>
          <h2 className='mb-4 text-4xl leading-[1.2] font-serif md:text-5xl'>
            The Shaon Standard
          </h2>
          <p className='mx-auto max-w-2xl text-sm leading-relaxed text-on-tertiary-container md:text-base'>
            A systematic approach to perfection. We guide every project through
            a rigorous four-phase lifecycle.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4'>
          {steps.map((s) => (
            <div
              key={s.step}
              className='group relative border-l border-outline-variant/30 p-8'
            >
              <span className='mb-6 block text-3xl font-serif text-secondary opacity-50 transition-opacity group-hover:opacity-100 md:text-4xl'>
                {s.step}
              </span>
              <h4 className='mb-4 text-2xl font-serif'>{s.title}</h4>
              <p className='text-sm leading-relaxed text-on-tertiary-container'>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
