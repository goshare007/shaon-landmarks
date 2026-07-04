import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import SustainabilityImg from '@/assets/images/sustainability/sustainability.webp';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const stats = [
  { value: '40%', label: 'Energy Reduction' },
  { value: '200+', label: 'Green-Certified Units' },
  { value: 'Zero', label: 'Net Carbon Committed' },
];

export function SustainabilityPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(copyRef.current?.children ?? []), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: copyRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from(imageRef.current, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <SectionHeading
              ref={headingRef}
              eyebrow='Our Philosophy'
              heading='Designing for'
              highlight='Generations'
            />
            <div ref={copyRef}>
              <p className='mt-5 text-sm leading-relaxed text-muted-foreground'>
                At Shaon Landmarks, sustainability is not an afterthought — it
                is the foundation. Every project begins with a commitment to
                environmental stewardship, community well-being, and enduring
                value. We believe luxury and responsibility are not mutually
                exclusive.
              </p>

              <div className='mt-10 grid grid-cols-3 gap-6'>
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className='font-serif text-[clamp(1.5rem,2.5vw,2rem)] font-light text-foreground'>
                      {s.value}
                    </div>
                    <div className='mt-2 w-5 h-px bg-brand/40' />
                    <div className='mt-2 text-[9px] font-medium tracking-[0.18em] text-muted-foreground uppercase'>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div ref={imageRef} className='overflow-hidden rounded-sm'>
              <Image
                src={SustainabilityImg}
                alt='Sustainable architecture design'
                layout='fullWidth'
                decoding='async'
                width={1200}
                height={600}
                loading='lazy'
                className='h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
