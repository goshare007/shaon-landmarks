import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function AboutStory() {
  return (
    <section className='bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-6 md:grid-cols-12'>
          <div className='mb-12 md:col-span-4 md:mb-0'>
            <h2 className='sticky top-32 text-4xl leading-[1.2] font-serif md:text-5xl'>
              Our Story
            </h2>
          </div>
          <div className='md:col-span-8'>
            <p className='text-base leading-relaxed text-on-surface-variant md:text-lg'>
              Founded on the principles of transparency and architectural
              innovation, Shaon Landmarks & Housing began its journey with a
              single vision: to redefine the real estate landscape of
              Bangladesh. For over a decade, we have navigated the complexities
              of urban development with a focus on sustainable growth and
              aesthetic excellence.
            </p>
            <div className='my-12 grid grid-cols-2 gap-8 border-y border-outline-variant py-8'>
              <div>
                <span className='block text-3xl font-serif text-secondary md:text-4xl'>
                  15+
                </span>
                <span className='text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                  Years of Expertise
                </span>
              </div>
              <div>
                <span className='block text-3xl font-serif text-secondary md:text-4xl'>
                  40+
                </span>
                <span className='text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                  Completed Projects
                </span>
              </div>
            </div>
            <p className='text-sm leading-relaxed text-on-surface-variant md:text-base'>
              Our commitment goes beyond construction. We meticulously select
              locations that offer the perfect balance of serenity and
              connectivity. Every project is a collaborative masterpiece,
              involving the country&apos;s finest architects and engineers to
              ensure that &ldquo;Shaon Landmarks&rdquo; remains synonymous with
              prestige.
            </p>
            <Link
              to='/portfolio'
              search={{ status: '', location: '', search: '' }}
              className='mt-8 flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase transition-colors hover:text-secondary group'
            >
              View Our Portfolio
              <ArrowRight
                size={16}
                className='transition-transform group-hover:translate-x-1'
                aria-hidden='true'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
