import { Image } from '@unpic/react';
import CAREER_TEAM from '@/assets/images/career/team.webp';

const benefits = [
  'Work on iconic projects across Bangladesh',
  'Collaborate with industry-leading architects and engineers',
  'Competitive compensation and growth opportunities',
  'Culture of innovation and continuous learning',
];

export function CareerWhy() {
  return (
    <section className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Why Shaon Landmarks
            </span>
            <h2 className='mt-3 text-3xl leading-tight font-serif text-on-surface sm:text-4xl'>
              Shape the Skyline of Tomorrow
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base'>
              At Shaon Landmarks, we believe that great architecture is built by
              great people. We offer a collaborative environment where
              creativity meets precision, and every team member contributes to
              landmarks that define generations.
            </p>
            <div className='mt-8 space-y-4'>
              {benefits.map((item) => (
                <div key={item} className='flex items-start gap-3'>
                  <span className='mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary' />
                  <span className='text-sm text-on-surface-variant'>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className='aspect-4/3 overflow-hidden border border-outline-variant bg-surface-container-low'>
            <Image
              src={CAREER_TEAM}
              alt='Team collaboration'
              layout='fullWidth'
              height={450}
              className='h-full w-full object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
