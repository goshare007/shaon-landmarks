const stats = [
  { value: '40%', label: 'Energy Reduction' },
  { value: '200+', label: 'Green-Certified Units' },
  { value: 'Zero', label: 'Net Carbon Committed' },
];

export function SustainabilityPhilosophy() {
  return (
    <section className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Our Philosophy
            </span>
            <h2 className='mt-3 text-3xl font-serif text-on-surface sm:text-4xl'>
              Designing for Generations
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-on-surface-variant'>
              At Shaon Landmarks, sustainability is not an afterthought — it is
              the foundation. Every project begins with a commitment to
              environmental stewardship, community well-being, and enduring
              value. We believe luxury and responsibility are not mutually
              exclusive.
            </p>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {stats.map((s) => (
              <div key={s.label} className='text-center'>
                <div className='text-3xl font-serif text-secondary sm:text-4xl'>
                  {s.value}
                </div>
                <div className='mt-1 text-caption font-medium tracking-widest text-on-surface-variant uppercase'>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
