import {
  IconBuildingSkyscraper,
  IconCertificate,
  IconCircleCheck,
  IconUsersGroup,
} from '@tabler/icons-react';
import { SectionHeading } from '@/components/ui/section-heading';

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
  return (
    <section className='bg-surface-overlay py-20 md:py-28 border-t border-white/6'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Recognition'
          heading='Certifications &'
          highlight='Recognition'
          highlightStyle='stroke'
          align='center'
          className='mb-6'
          headingClassName='text-white'
        />

        <p className='mx-auto mb-12 max-w-2xl text-center text-sm leading-relaxed text-white/55'>
          Our sustainable practices are recognized by leading industry bodies
          and regulatory authorities.
        </p>

        <div className='grid gap-5 sm:grid-cols-2'>
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
