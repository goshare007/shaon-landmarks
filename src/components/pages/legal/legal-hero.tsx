import { useEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

export function LegalHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(headingRef.current, { y: 24, opacity: 0, duration: 0.7 }, 0).from(
        paraRef.current,
        { y: 14, opacity: 0, duration: 0.6 },
        0.3,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative bg-background dark-section pb-16 pt-24 md:pb-20 md:pt-32 border-b border-white/6 overflow-hidden'
    >
      <div className='pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full border border-white/6' />

      <div className='absolute top-0 left-0 w-10 h-px bg-brand/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-brand/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-brand/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-brand/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-brand/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-brand/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-brand/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-brand/30' />

      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='Compliance & Transparency'
          heading='Legal'
          highlight='Information'
          as='h1'
          headingClassName='text-white text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.01em]'
          className='mb-5'
        />
        <p
          ref={paraRef}
          className='mt-5 max-w-2xl text-sm leading-relaxed text-white/55'
        >
          Shaon Landmarks & Housing operates with full regulatory compliance and
          transparency. Below are our certifications, memberships, and legal
          information.
        </p>
      </div>
    </section>
  );
}
