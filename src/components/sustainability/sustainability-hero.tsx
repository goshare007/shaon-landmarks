import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';

export function SustainabilityHero() {
  return (
    <section className='relative h-[50vh] min-h-120 overflow-hidden bg-tertiary'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${SustainabilityImg})` }}
      />
      <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
      <div className='relative z-10 flex h-full items-center'>
        <div className='mx-auto w-full max-w-360 px-4 md:px-16'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Building Responsibly
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Sustainability</h1>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
            Committed to a greener future through responsible architecture and
            innovative design.
          </p>
        </div>
      </div>
    </section>
  );
}
