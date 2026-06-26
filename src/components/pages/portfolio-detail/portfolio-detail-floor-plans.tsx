import { Image } from '@unpic/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import type { ProjectDetail } from '@/content/projects';

gsap.registerPlugin(ScrollTrigger);

export function PortfolioDetailFloorPlans({
  floorPlans,
}: {
  floorPlans: ProjectDetail['floorPlans'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePlan = floorPlans[activeIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.detail-floorplans__heading', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
      gsap.from('.detail-floorplans__tabs > *', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
      gsap.from('.detail-floorplans__image', {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='border-b border-border bg-white py-24'>
      <div className='container'>
        <div className='detail-floorplans__heading mb-16'>
          <h2 className='text-2xl font-serif text-foreground md:text-3xl'>
            Floor Plans
          </h2>
          <p className='mt-2 text-muted-foreground'>
            Explore the layouts and configurations available
          </p>
        </div>

        <div className='detail-floorplans__tabs mb-12 flex flex-wrap gap-3'>
          {floorPlans.map((plan, index) => (
            <button
              key={plan.title}
              type='button'
              onClick={() => setActiveIndex(index)}
              className={`rounded-sm border px-6 py-3 text-[10px] font-medium tracking-[0.1em] uppercase transition-colors ${
                index === activeIndex
                  ? 'border-custom bg-custom text-white'
                  : 'border-border text-muted-foreground hover:border-custom hover:text-custom'
              }`}
            >
              {plan.title}
            </button>
          ))}
        </div>

        <div className='detail-floorplans__image overflow-hidden rounded-sm'>
          <Image
            src={activePlan.image}
            alt={`${activePlan.title} floor plan`}
            layout='fullWidth'
            height={800}
            className='h-auto w-full object-cover'
          />
        </div>

        <div className='mt-8 max-w-2xl'>
          <h3 className='text-xl font-serif text-foreground md:text-2xl'>
            {activePlan.title}
          </h3>
          <p className='mt-2 leading-relaxed text-muted-foreground'>
            {activePlan.description}
          </p>
        </div>
      </div>
    </section>
  );
}
