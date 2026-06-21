import { Link } from '@tanstack/react-router';

export function SustainabilityCta() {
  return (
    <section className='bg-tertiary py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <div>
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Build a Greener Future
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              Discover how Shaon Landmarks can bring sustainable luxury to your
              next development.
            </p>
          </div>
          <Link
            to='/contact'
            className='mt-8 inline-block rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary no-underline uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]'
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
