import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'motion/react';

import { fadeUp, staggerShort as stagger } from '@/lib/animations';
import { generateMeta } from '@/lib/seo';

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

export const Route = createFileRoute('/legal')({
  component: Legal,
  head: () =>
    generateMeta({
      title: 'Legal Disclosures',
      description:
        'RAJUK certified, REHAB member — Shaon Landmarks operates with full regulatory compliance and transparency in Bangladesh real estate.',
    }),
});

function Legal() {
  return (
    <main>
      {/* Hero */}
      <section className='bg-tertiary py-24 md:py-32'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Compliance & Transparency
            </span>
            <h1 className='heading-hero mt-3 text-on-tertiary'>
              Legal Information
            </h1>

            <p className='mt-4 max-w-xl text-base leading-relaxed text-[#9a9c9c]'>
              Shaon Landmarks & Housing operates with full regulatory compliance
              and transparency. Below are our certifications, memberships, and
              legal information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclosure Content */}
      <section className='bg-surface py-20 md:py-28'>
        <div className='mx-auto max-w-225 px-4 md:px-16'>
          <motion.div
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {disclosureSections.map((section, i) => (
              <motion.div
                key={section.title}
                className='mb-12'
                variants={fadeUp}
              >
                <div className='mb-4 flex items-start gap-4'>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center border border-secondary bg-secondary/5'>
                    <span className='material-symbols-outlined text-base text-secondary'>
                      {i === 0
                        ? 'verified'
                        : i === 1
                          ? 'handshake'
                          : i === 2
                            ? 'description'
                            : i === 3
                              ? 'gavel'
                              : 'balance'}
                    </span>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-surface-container-low py-20'>
        <div className='mx-auto max-w-225 px-4 md:px-16'>
          <motion.div
            className='border border-outline-variant bg-white p-8 text-center md:p-12'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className='material-symbols-outlined mb-4 text-3xl text-secondary'>
              help
            </span>
            <h2 className='mb-4 text-xl font-serif text-on-surface md:text-2xl'>
              Need More Information?
            </h2>
            <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
              For detailed legal documentation or specific inquiries regarding
              our certifications, please reach out to our compliance department.
            </p>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
            >
              Contact Compliance
              <span className='material-symbols-outlined text-base'>
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
