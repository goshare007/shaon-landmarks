import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

// ─────────────────────────────────────────────────────────────────────────────
// AboutStory
// ─────────────────────────────────────────────────────────────────────────────
export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });
      gsap.from(bodyRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.75,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 84%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='bg-white py-24 border-t border-border'>
      <div className='container'>
        <div className='grid gap-10 md:grid-cols-12'>
          {/* Sticky heading */}
          <div ref={headingRef} className='md:col-span-4'>
            <div className='md:sticky md:top-32'>
              <SectionHeading
                eyebrow='Since 2008'
                heading='Our'
                highlight='Story'
                headingClassName='text-[clamp(2rem,4vw,3rem)]'
              />
            </div>
          </div>

          {/* Body */}
          <div ref={bodyRef} className='md:col-span-8 flex flex-col gap-8'>
            <p className='text-base leading-relaxed text-muted-foreground'>
              Founded on the principles of transparency and architectural
              innovation, Shaon Landmarks & Housing began its journey with a
              single vision: to redefine the real estate landscape of
              Bangladesh. For over a decade, we have navigated the complexities
              of urban development with a focus on sustainable growth and
              aesthetic excellence.
            </p>

            {/* Inline stats */}
            <div className='grid grid-cols-2 gap-0 border-y border-border py-8'>
              {[
                { num: '16+', label: 'Years of Expertise' },
                { num: '48+', label: 'Completed Projects' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-2 px-6 first:pl-0 ${i > 0 ? 'border-l border-border' : ''}`}
                >
                  <span className='font-serif text-[2.2rem] font-light text-foreground leading-none'>
                    {s.num}
                  </span>
                  <div className='w-6 h-px bg-custom/40' />
                  <span className='text-[10px] tracking-[0.2em] uppercase text-muted-foreground'>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <p className='text-sm leading-relaxed text-muted-foreground'>
              Our commitment goes beyond construction. We meticulously select
              locations that offer the perfect balance of serenity and
              connectivity. Every project is a collaborative masterpiece,
              involving the country's finest architects and engineers to ensure
              that "Shaon Landmarks" remains synonymous with prestige.
            </p>

            <Link
              to='/portfolio'
              search={{ status: '', location: '', search: '' }}
              className='group inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.18em] uppercase text-foreground transition-colors duration-200 hover:text-custom w-fit'
            >
              View Our Portfolio
              <IconArrowRight
                className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5'
                aria-hidden='true'
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
