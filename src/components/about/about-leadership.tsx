import { Image } from '@unpic/react';
import LEADER_1 from '@/assets/images/about/leader-1.webp';
import LEADER_2 from '@/assets/images/about/leader-2.webp';

const LEADERS = [
  {
    name: 'Engr. Mahfuzur Rahman',
    role: 'Chairman',
    bio: 'With over 25 years in civil engineering, Engr. Rahman provides the technical oversight and strategic direction that anchors our commitment to structural safety and architectural innovation.',
    image: LEADER_1,
    alt: 'Engr. Mahfuzur Rahman',
  },
  {
    name: 'Md. Shaon Ahmed',
    role: 'Managing Director',
    bio: "A visionary in real estate marketing and development, Mr. Ahmed leads the company's expansion and ensures that every project aligns with the lifestyle aspirations of our elite clientele.",
    image: LEADER_2,
    alt: 'Md. Shaon Ahmed',
  },
];

export function AboutLeadership() {
  return (
    <section className='bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-20 text-center'>
          <span className='mb-4 block text-label font-medium tracking-[0.2em] text-secondary uppercase'>
            The Board
          </span>
          <h2 className='text-4xl leading-[1.2] font-serif md:text-5xl'>
            Visionary Leadership
          </h2>
        </div>

        <div
          className='grid gap-16 md:grid-cols-2'
          style={{ perspective: '1200px' }}
        >
          {LEADERS.map((leader) => (
            <div key={leader.name} className='group'>
              <div className='relative mb-8 overflow-hidden grayscale transition-all duration-700 hover:grayscale-0'>
                <div className='transition-transform duration-700 group-hover:scale-105'>
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    layout='fullWidth'
                    height={500}
                    className='aspect-4/5 w-full object-cover'
                  />
                </div>
              </div>
              <div>
                <h4 className='mb-1 text-2xl font-serif'>{leader.name}</h4>
                <p className='mb-4 text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                  {leader.role}
                </p>
                <div className='mb-6 h-px w-full bg-outline' />
                <p className='text-sm leading-relaxed text-on-surface-variant'>
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
