import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function CareerCta() {
  return (
    <section className='bg-tertiary py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mx-auto max-w-2xl text-center'>
          <div>
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Don&apos;t See the Right Role?
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              We are always on the lookout for exceptional talent. Send us your
              CV and we will keep you in mind for future opportunities.
            </p>
          </div>
          <Link
            to='/contact'
            className='mt-8 inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary no-underline uppercase transition-all hover:opacity-90'
          >
            Get in Touch
            <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
