import HERO_IMAGE from '@/assets/images/career/hero.webp';

export function CareerHero() {
  return (
    <section className='relative h-[50vh] min-h-96 overflow-hidden bg-tertiary'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
      <div className='relative z-10 flex h-full items-center'>
        <div className='mx-auto w-full max-w-360 px-4 md:px-16'>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Join the Team
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>
            Building Careers
          </h1>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
            Build your future with Shaon Landmarks. We are always looking for
            talent that shares our commitment to architectural integrity.
          </p>
        </div>
      </div>
    </section>
  );
}
