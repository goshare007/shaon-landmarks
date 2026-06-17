'use client';

import { Image } from '@unpic/react';
import { useRef } from 'react';
import LEADER_1 from '@/assets/images/about/leader-1.webp';
import LEADER_2 from '@/assets/images/about/leader-2.webp';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

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
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        section.querySelector('[data-lead-header]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
      );

      const cards = section.querySelectorAll('[data-lead-card]');
      tl.fromTo(
        cards,
        { opacity: 0, y: 40, rotateY: 10 },
        { opacity: 1, y: 0, rotateY: 0, duration: 0.8, stagger: 0.15 },
        '-=0.3',
      );

      const images = section.querySelectorAll('[data-lead-image]');
      tl.fromTo(
        images,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0 0 0)', duration: 0.9, stagger: 0.2 },
        '-=0.5',
      );

      const details = section.querySelectorAll('[data-lead-detail]');
      tl.fromTo(
        details,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        '-=0.3',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div data-lead-header className='mb-20 text-center'>
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
            <div key={leader.name} data-lead-card className='group'>
              <div
                data-lead-image
                className='relative mb-8 overflow-hidden grayscale transition-all duration-700 hover:grayscale-0'
                style={{ clipPath: 'inset(0 100% 0 0)' }}
              >
                <div className='transition-transform duration-700 group-hover:scale-105'>
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    layout='fullWidth'
                    width={400}
                    height={500}
                    className='aspect-4/5 w-full object-cover'
                  />
                </div>
              </div>
              <div data-lead-detail>
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
