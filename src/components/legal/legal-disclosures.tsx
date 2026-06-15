'use client';

import { useEffect, useRef } from 'react';
import { DynamicIcon } from '@/lib/icon-map';

const disclosureSections = [
  {
    title: 'RAJUK Certification',
    content:
      'Shaon Landmarks & Housing is fully certified by RAJUK (Rajdhani Unnayan Kartripakkha), the capital development authority of Bangladesh. All our projects comply with the approved building plans, construction regulations, and safety standards mandated by RAJUK. Clients are provided with certified documentation for every completed development.',
  },
  {
    title: 'REHAB Membership',
    content:
      'As a proud member of REHAB (Real Estate & Housing Association of Bangladesh), Shaon Landmarks adheres to the highest ethical standards in the real estate industry. Our membership reflects our commitment to transparency, fair practices, and the protection of homebuyer interests.',
  },
  {
    title: 'Terms of Use',
    content:
      'By accessing and using this website, you agree to these terms. All content, images, and materials on this site are the intellectual property of Shaon Landmarks & Housing unless otherwise stated. You may not reproduce, distribute, or use any content without prior written consent. All project information, specifications, and timelines are subject to change without prior notice.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'Shaon Landmarks & Housing shall not be held liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content. Project visuals are artistic representations and may differ from the final delivered product. Actual property dimensions, finishes, and specifications are confirmed in the formal sale agreement.',
  },
  {
    title: 'Dispute Resolution',
    content:
      'Any disputes arising from the use of this website or related services shall be resolved through arbitration in accordance with the laws of Bangladesh. The courts of Dhaka shall have exclusive jurisdiction over any matters not subject to arbitration.',
  },
];

const icons = ['verified', 'handshake', 'description', 'gavel', 'balance'];

export function LegalDisclosures() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      import('gsap').then(({ gsap }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

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
            section.querySelectorAll('[data-disclosure-item]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          );
        }, section);

        ctrls.push(() => ctx.revert());
      });
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-225 px-4 md:px-16'>
        {disclosureSections.map((section, i) => (
          <div key={section.title} data-disclosure-item>
            <div className='mb-4 flex items-start gap-4'>
              <div className='flex h-10 w-10 shrink-0 items-center justify-center border border-secondary bg-secondary/5'>
                <DynamicIcon
                  name={icons[i]}
                  size={16}
                  className='text-secondary'
                />
              </div>
              <div className='flex-1'>
                <h2 className='mb-3 text-xl font-serif text-on-surface md:text-2xl'>
                  {section.title}
                </h2>
                <p className='text-sm leading-relaxed text-on-surface-variant md:text-base'>
                  {section.content}
                </p>
              </div>
            </div>
            {i < disclosureSections.length - 1 && (
              <div className='ml-14 mt-8 h-px bg-outline-variant' />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
