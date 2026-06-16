'use client';

import { useEffect, useRef } from 'react';

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

export function PrivacyPolicy() {
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
            section.querySelectorAll('[data-policy-item]'),
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
        {policySections.map((section, i) => (
          <div key={section.title} data-policy-item>
            <div className='mb-4 flex items-start gap-4'>
              <span className='text-label font-medium tracking-widest text-secondary'>
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
          </div>
        ))}
      </div>
    </section>
  );
}
