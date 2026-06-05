import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

import { fadeUp, staggerShort as stagger } from '@/lib/animations';
import { generateMeta } from '@/lib/seo';

const policySections = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you provide directly, such as your name, email address, phone number, and project preferences when you fill out consultation forms or contact us. We also collect anonymous usage data through standard web analytics to improve your browsing experience.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'Your information is used solely to respond to your inquiries, schedule consultations, provide updates on our projects, and improve our services. We do not sell, rent, or share your personal data with third parties for their marketing purposes.',
  },
  {
    title: 'Data Protection',
    content:
      'Shaon Landmarks employs industry-standard security measures to protect your personal information. All data transmitted through our website is encrypted using SSL/TLS protocols. Access to personal data is restricted to authorized personnel only.',
  },
  {
    title: 'Cookies',
    content:
      'Our website uses essential cookies to ensure proper functionality. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings.',
  },
  {
    title: 'Third-Party Services',
    content:
      'We may engage trusted third-party service providers to assist in operating our website and business. These providers are contractually bound to protect your data and may only use it for the specific services they perform on our behalf.',
  },
  {
    title: 'Your Rights',
    content:
      'You have the right to request access to, correction of, or deletion of your personal data held by Shaon Landmarks. To exercise these rights, please contact us through our consultation form or email.',
  },
];

export const Route = createFileRoute('/privacy')({
  component: Privacy,
  head: () =>
    generateMeta({
      title: 'Privacy Policy',
      description:
        "Shaon Landmarks & Housing's privacy policy — how we collect, use, and protect your personal information.",
    }),
});

function Privacy() {
  return (
    <main>
      {/* Hero */}
      <section className='bg-tertiary py-24 md:py-32'>
        <div className='mx-auto max-w-[1440px] px-4 md:px-16'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Legal
            </span>
            <h1 className='heading-hero mt-3 text-on-tertiary'>
              Privacy Policy
            </h1>

            <p className='mt-4 max-w-xl text-base leading-relaxed text-[#9a9c9c]'>
              Your privacy matters to us. This policy outlines how Shaon
              Landmarks & Housing collects, uses, and protects your personal
              information.
            </p>
            <p className='mt-2 text-label font-medium tracking-[0.1em] text-on-surface-variant uppercase'>
              Last updated: June 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className='bg-surface py-20 md:py-28'>
        <div className='mx-auto max-w-[900px] px-4 md:px-16'>
          <motion.div
            className='prose prose-sm max-w-none'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {policySections.map((section, i) => (
              <motion.div
                key={section.title}
                className='mb-12'
                variants={fadeUp}
              >
                <div className='mb-4 flex items-start gap-4'>
                  <span className='text-label font-medium tracking-[0.1em] text-secondary'>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className='flex-1'>
                    <h2 className='mb-3 text-xl font-serif text-on-surface md:text-2xl'>
                      {section.title}
                    </h2>
                    <p className='text-sm leading-relaxed text-on-surface-variant md:text-base'>
                      {section.content}
                    </p>
                  </div>
                </div>
                {i < policySections.length - 1 && (
                  <div className='ml-10 mt-8 h-px bg-outline-variant' />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className='bg-surface-container-low py-20'>
        <div className='mx-auto max-w-[900px] px-4 md:px-16'>
          <motion.div
            className='border border-outline-variant bg-white p-8 md:p-12'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='mb-4 text-xl font-serif text-on-surface md:text-2xl'>
              Questions About Your Data?
            </h2>
            <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
              If you have any questions or concerns about how we handle your
              personal information, please do not hesitate to reach out to our
              data protection team.
            </p>
            <Link
              to='/contact'
              className='inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-label font-medium tracking-[0.1em] text-on-primary uppercase transition-all hover:opacity-90'
            >
              Contact Us
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
