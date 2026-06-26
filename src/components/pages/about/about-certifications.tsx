import {
  IconCertificate,
  IconHeartHandshake,
  IconRosette,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { gsap, MOTION } from '@/lib/gsap';

// ─────────────────────────────────────────────────────────────────────────────
const CERTIFICATIONS = [
  { icon: <IconRosette size={28} stroke={1.5} />, label: 'RAJUK Certified' },
  {
    icon: <IconHeartHandshake size={28} stroke={1.5} />,
    label: 'REHAB Member',
  },
  { icon: <IconCertificate size={28} stroke={1.5} />, label: 'ISO 9001:2015' },
];

export function AboutCertifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;
    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 86%',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-overlay py-20 border-t border-white/6'
    >
      <div className='container'>
        <div className='relative flex flex-col md:flex-row items-center justify-between gap-12 border-y border-white/6 py-14'>
          {/* Corner accents */}
          <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute top-0 left-0 w-full h-px bg-custom/40' />
            <div className='absolute top-0 left-0 h-full w-px bg-custom/40' />
          </div>
          <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute bottom-0 right-0 w-full h-px bg-custom/40' />
            <div className='absolute bottom-0 right-0 h-full w-px bg-custom/40' />
          </div>

          {/* Left copy */}
          <div ref={leftRef} className='max-w-sm text-center md:text-left'>
            <div className='flex items-center gap-4 mb-5 justify-center md:justify-start'>
              <div className='w-8 h-px bg-custom' />
              <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
                Accreditations
              </span>
            </div>
            <h2 className='font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light text-white leading-tight mb-4'>
              Certified{' '}
              <span
                className='italic'
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.28)',
                }}
              >
                Excellence
              </span>
            </h2>
            <p className='text-sm leading-relaxed text-white/55'>
              We adhere to the highest regulatory standards in Bangladesh,
              ensuring every development is legal, secure, and built to last.
            </p>
          </div>

          {/* Right badges */}
          <div
            ref={rightRef}
            className='flex flex-wrap justify-center gap-8 md:gap-12'
          >
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.label}
                className='group flex flex-col items-center gap-4 transition-transform duration-300 hover:-translate-y-1'
              >
                <div
                  className='flex h-20 w-20 items-center justify-center rounded-sm border border-white/10 text-custom transition-all duration-500 group-hover:border-custom/30 group-hover:scale-[1.05]'
                  style={{
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {cert.icon}
                </div>
                <span className='text-[10px] font-medium tracking-[0.18em] uppercase text-white/50 text-center transition-colors duration-200 group-hover:text-custom'>
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
