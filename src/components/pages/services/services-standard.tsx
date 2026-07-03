import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const steps = [
  {
    step: '01',
    title: 'Planning',
    desc: 'Strategic feasibility studies, land acquisition, and environmental impact assessments to ensure longevity.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Collaborative architectural conceptualization and interior planning utilizing 3D BIM technology.',
  },
  {
    step: '03',
    title: 'Construction',
    desc: 'Meticulous execution by master craftsmen with strict adherence to safety and material quality standards.',
  },
  {
    step: '04',
    title: 'Handover',
    desc: 'Final inspections, legal compliance certification, and the key delivery of your new landmark.',
  },
];

export function ServicesStandard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cornersRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.from(
        cornersRef.current ? Array.from(cornersRef.current.children) : [],
        { opacity: 0, duration: 0.5, stagger: 0.05 },
        0,
      )
        .from(headingRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0.1)
        .from(paraRef.current, { y: 14, opacity: 0, duration: 0.5 }, 0.3)
        .from(
          stepsRef.current ? Array.from(stepsRef.current.children) : [],
          { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 },
          0.4,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative bg-surface-brand py-20 md:py-28 border-t border-white/6 overflow-hidden'
    >
      {/* Corner accents */}
      <div ref={cornersRef}>
        <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
        <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />
      </div>

      <div className='site-wrapper'>
        <div ref={headingRef}>
          <SectionHeading
            eyebrow='Our Process'
            heading='The Shaon'
            highlight='Standard'
            align='center'
            className='mb-20'
            headingClassName='text-white'
          />
        </div>
        <p
          ref={paraRef}
          className='mx-auto -mt-14 mb-16 max-w-2xl text-center text-sm leading-relaxed text-white/55'
        >
          A systematic approach to perfection. We guide every project through a
          rigorous four-phase lifecycle.
        </p>
        <div
          ref={stepsRef}
          className='grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10'
        >
          {steps.map((s) => (
            <div
              key={s.step}
              className='group relative bg-surface-brand p-8 md:p-10 transition-colors duration-300'
            >
              <span className='mb-6 block font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white/20 transition-colors duration-300 group-hover:text-custom/60'>
                {s.step}
              </span>
              <div className='mb-5 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
              <h4 className='mb-4 font-serif text-base font-light text-white'>
                {s.title}
              </h4>
              <p className='text-sm leading-relaxed text-white/55'>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
