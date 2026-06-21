const certifications = [
  'RAJUK Certified',
  'REHAB Member',
  'ISO 14001',
  'Green Building Council',
];

export function SustainabilityCertifications() {
  return (
    <section className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-3xl font-serif text-on-surface sm:text-4xl'>
            Certifications & Recognition
          </h2>
          <p className='mt-4 text-sm leading-relaxed text-on-surface-variant'>
            Our sustainable practices are recognized by leading industry bodies
            and regulatory authorities.
          </p>
        </div>
        <div className='mt-10 flex flex-wrap justify-center gap-6'>
          {certifications.map((cert) => (
            <div
              key={cert}
              className='rounded-sm border border-outline-variant bg-white px-6 py-4 transition-transform duration-300 hover:scale-105'
            >
              <span className='text-label font-medium tracking-widest text-on-surface uppercase'>
                {cert}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
