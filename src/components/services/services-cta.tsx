import { Link } from '@tanstack/react-router';

export function ServicesCta() {
  return (
    <section className='relative overflow-hidden bg-surface py-32'>
      <div className='absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/20' />
      <div className='absolute left-1/2 top-1/2 h-300 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/10' />

      <div className='relative z-10 mx-auto max-w-360 px-4 text-center md:px-16'>
        <h2 className='mb-8 text-4xl leading-[1.2] font-serif md:text-5xl'>
          Begin Your Legacy With Us
        </h2>
        <p className='mx-auto mb-12 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg'>
          Whether you are a landowner looking for development or an investor
          seeking premium real estate, our experts are ready to consult.
        </p>
        <div className='flex flex-col justify-center gap-6 md:flex-row'>
          <Link
            to='/contact'
            className='inline-block rounded-sm bg-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-on-primary uppercase transition-all hover:opacity-90'
          >
            Partner with Us
          </Link>
          <Link
            to='/contact'
            className='inline-block rounded-sm border-2 border-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-primary uppercase transition-all hover:bg-primary hover:text-on-primary'
          >
            Consult our Experts
          </Link>
        </div>
      </div>
    </section>
  );
}
