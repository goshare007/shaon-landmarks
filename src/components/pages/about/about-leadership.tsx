import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import LEADER_1 from '@/assets/images/about/leader-1.webp';
import LEADER_2 from '@/assets/images/about/leader-2.webp';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const LEADERS = [
  {
    name: 'Engr. Mahfuzur Rahman',
    role: 'Chairman',
    bio: 'With over 25 years in civil engineering, Engr. Rahman provides the technical oversight and strategic direction that anchors our commitment to structural safety and architectural innovation.',
    image: LEADER_1,
    alt: 'Engr. Mahfuzur Rahman — Chairman, Shaon Landmarks',
  },
  {
    name: 'Md. Shaon Ahmed',
    role: 'Managing Director',
    bio: "A visionary in real estate marketing and development, Mr. Ahmed leads the company's expansion and ensures that every project aligns with the lifestyle aspirations of our elite clientele.",
    image: LEADER_2,
    alt: 'Md. Shaon Ahmed — Managing Director, Shaon Landmarks',
  },
];

export function AboutLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 22,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 86%',
          once: true,
        },
      });
      if (cardsRef.current) {
        gsap.from(Array.from(cardsRef.current.children), {
          y: 32,
          opacity: 0,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 84%',
            once: true,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-raised py-24 border-t border-border'
    >
      <div className='container'>
        <SectionHeading
          ref={headingRef}
          eyebrow='The Board'
          heading='Visionary'
          highlight='Leadership'
          align='center'
          className='mb-16'
        />

        {/* Leader cards */}
        <div ref={cardsRef} className='grid gap-10 md:grid-cols-2'>
          {LEADERS.map((leader) => (
            <div key={leader.name} className='group'>
              {/* Image */}
              <div className='relative mb-7 overflow-hidden rounded-sm aspect-4/5'>
                <div className='h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]'>
                  <Image
                    src={leader.image}
                    alt={leader.alt}
                    layout='fullWidth'
                    height={500}
                    className='h-full w-full object-cover'
                  />
                </div>

                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

                {/* Role pill on hover */}
                <div className='absolute bottom-5 left-5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0'>
                  <span
                    className='text-[9px] font-medium tracking-[0.2em] uppercase text-white/80 border border-white/20 px-3 py-1.5 rounded-sm'
                    style={{
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {leader.role}
                  </span>
                </div>

                {/* Border overlay */}
                <div className='absolute inset-0 border border-black/6 rounded-sm group-hover:border-custom/20 transition-colors duration-500' />
              </div>

              {/* Text */}
              <div>
                <h4 className='font-serif text-2xl font-light text-foreground leading-snug'>
                  {leader.name}
                </h4>
                <p className='mt-1 text-[10px] font-medium tracking-[0.18em] uppercase text-custom'>
                  {leader.role}
                </p>
                <div className='mt-5 mb-5 w-full h-px bg-border transition-colors duration-300 group-hover:bg-custom/20' />
                <p className='text-sm leading-relaxed text-muted-foreground'>
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
