'use client';

import { Link } from '@tanstack/react-router';
import { ArrowRight, HelpCircle } from 'lucide-react';
import { useRef } from 'react';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

export function LegalCta() {
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
        section.querySelector('[data-cta-card]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface-container-low py-20'>
      <div className='mx-auto max-w-225 px-4 md:px-16'>
        <div
          data-cta-card
          className='border border-outline-variant bg-white p-8 text-center md:p-12'
        >
          <HelpCircle
            className='mb-4 text-secondary'
            size={28}
            aria-hidden='true'
          />
          <h2 className='mb-4 text-xl font-serif text-on-surface md:text-2xl'>
            Need More Information?
          </h2>
          <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
            For detailed legal documentation or specific inquiries regarding our
            certifications, please reach out to our compliance department.
          </p>
          <Link
            to='/contact'
            className='inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
          >
            Contact Compliance
            <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
