import {
  IconBuildingSkyscraper,
  IconCertificate,
  IconCircleCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const certifications = [
  {
    icon: IconBuildingSkyscraper,
    title: 'RAJUK Certified',
    description:
      'All projects comply with Rajdhani Unnayan Kartripakkha regulations for safe and planned urban development.',
  },
  {
    icon: IconUsersGroup,
    title: 'REHAB Member',
    description:
      'Proud member of the Real Estate & Housing Association of Bangladesh, upholding industry best practices.',
  },
  {
    icon: IconCertificate,
    title: 'ISO 14001',
    description:
      'Environmental management systems certified to international standards for sustainable operations.',
  },
  {
    icon: IconCircleCheck,
    title: 'Green Building Council',
    description:
      'Recognized for integrating green building principles across design, construction, and operations.',
  },
];

export function SustainabilityCertifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      gsap.from(paraRef.current, {
        y: 14,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: paraRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-overlay py-20 md:py-28 border-t border-white/6'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Recognition'
          heading='Certifications &'
          highlight='Recognition'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <p
          ref={paraRef}
          className='mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-white/55'
        >
          Our sustainable practices are recognized by leading industry bodies
          and regulatory authorities.
        </p>

        <div ref={gridRef} className='grid gap-5 sm:grid-cols-2'>
          {certifications.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className='flex items-start gap-5 rounded-sm p-6 transition-all duration-300 hover:-translate-y-0.5'
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className='flex items-center justify-center w-10 h-10 rounded-sm border border-white/10 bg-white/5 shrink-0'>
                  <Icon size={18} className='text-custom' aria-hidden='true' />
                </div>
                <div>
                  <h3 className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/80'>
                    {c.title}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-white/55'>
                    {c.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
