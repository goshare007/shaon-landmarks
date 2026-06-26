import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

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
      'Our website uses anonymous analytics to understand how visitors interact with our site. We do not use cookies for tracking purposes. You can manage cookie preferences through your browser settings at any time.',
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.privacy-policy__item', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='py-20 md:py-28 bg-white'>
      <div className='container'>
        <div className='divide-y divide-border'>
          {policySections.map((section, i) => (
            <div
              key={section.title}
              className='privacy-policy__item group flex items-start gap-8 py-10'
            >
              {/* Index */}
              <span className='shrink-0 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-none text-custom/20 transition-colors duration-300 group-hover:text-custom/60'>
                {String(i + 1).padStart(2, '0')}
              </span>
              {/* Content */}
              <div className='flex-1 pt-1'>
                {/* Expanding rule */}
                <div className='mb-4 w-6 h-px bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
                <h2 className='mb-4 font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light text-foreground'>
                  {section.title}
                </h2>
                <p className='text-sm leading-relaxed text-muted-foreground'>
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
