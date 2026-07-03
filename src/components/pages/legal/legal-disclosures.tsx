import {
  IconFileDescription,
  IconGavel,
  IconScale,
  IconShieldCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { gsap, MOTION } from '@/lib/gsap';

const disclosureSections = [
  {
    title: 'RAJUK Certification',
    content:
      'Shaon Landmarks & Housing is fully certified by RAJUK (Rajdhani Unnayan Kartripakkha), the capital development authority of Bangladesh. All our projects comply with the approved building plans, construction regulations, and safety standards mandated by RAJUK. Clients are provided with certified documentation for every completed development.',
    icon: IconShieldCheck,
  },
  {
    title: 'REHAB Membership',
    content:
      'As a proud member of REHAB (Real Estate & Housing Association of Bangladesh), Shaon Landmarks adheres to the highest ethical standards in the real estate industry. Our membership reflects our commitment to transparency, fair practices, and the protection of homebuyer interests.',
    icon: IconUsersGroup,
  },
  {
    title: 'Terms of Use',
    content:
      'By accessing and using this website, you agree to these terms. All content, images, and materials on this site are the intellectual property of Shaon Landmarks & Housing unless otherwise stated. You may not reproduce, distribute, or use any content without prior written consent. All project information, specifications, and timelines are subject to change without prior notice.',
    icon: IconFileDescription,
  },
  {
    title: 'Limitation of Liability',
    content:
      'Shaon Landmarks & Housing shall not be held liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content. Project visuals are artistic representations and may differ from the final delivered product. Actual property dimensions, finishes, and specifications are confirmed in the formal sale agreement.',
    icon: IconGavel,
  },
  {
    title: 'Dispute Resolution',
    content:
      'Any disputes arising from the use of this website or related services shall be resolved through arbitration in accordance with the laws of Bangladesh. The courts of Dhaka shall have exclusive jurisdiction over any matters not subject to arbitration.',
    icon: IconScale,
  },
];

export function LegalDisclosures() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(listRef.current?.children ?? []), {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 bg-white'>
      <div className='site-wrapper'>
        <div ref={listRef} className='divide-y divide-border'>
          {disclosureSections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className='flex items-start gap-5 py-10'>
                <div className='flex w-11 h-11 shrink-0 items-center justify-center rounded-md border border-border bg-background text-brand'>
                  <Icon size={16} stroke={1.5} />
                </div>
                <div className='flex-1 pt-0.5'>
                  <div className='mb-4 w-6 h-px bg-brand/40' />
                  <h2 className='mb-4 font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light text-foreground'>
                    {section.title}
                  </h2>
                  <p className='text-sm leading-relaxed text-muted-foreground'>
                    {section.content}
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
