import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

const openPositions = [
  {
    title: 'Senior Architect',
    type: 'Full-time',
    location: 'Gulshan, Dhaka',
    description:
      'We are looking for an experienced architect with 8+ years in residential and commercial design to lead our design team.',
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    location: 'Gulshan, Dhaka',
    description:
      'Seeking a seasoned project manager to oversee large-scale development projects from conception through handover.',
  },
  {
    title: 'Junior Architect',
    type: 'Full-time',
    location: 'Agrabad, Chattogram',
    description:
      'An exciting opportunity for a recent architecture graduate to work on landmark projects across Bangladesh.',
  },
  {
    title: 'Interior Designer',
    type: 'Contract',
    location: 'Gulshan, Dhaka',
    description:
      'Join our interiors team to create bespoke luxury living spaces for our high-end residential projects.',
  },
];

export function CareerPositions() {
  return (
    <section className='bg-surface-container-low py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-16'>
          <h2 className='text-3xl font-serif text-on-surface sm:text-4xl'>
            Open Positions
          </h2>
          <div className='mt-4 h-px w-24 bg-secondary' />
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {openPositions.map((position) => (
            <div
              key={position.title}
              className='border border-outline-variant bg-white p-8 transition-transform duration-300 hover:-translate-y-1'
            >
              <div className='mb-4 flex items-center gap-3'>
                <span className='rounded-sm border border-secondary bg-secondary/10 px-2.5 py-1 text-caption font-medium tracking-widest text-secondary uppercase'>
                  {position.type}
                </span>
                <span className='text-label font-medium text-on-surface-variant'>
                  {position.location}
                </span>
              </div>
              <h3 className='mb-3 text-xl font-serif text-on-surface'>
                {position.title}
              </h3>
              <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
                {position.description}
              </p>
              <Link
                to='/contact'
                className='inline-flex items-center gap-2 text-label font-medium tracking-widest text-secondary uppercase transition-colors hover:gap-4'
              >
                Apply Now
                <ArrowRight size={16} aria-hidden='true' />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
