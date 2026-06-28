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
  return (
    <section className='py-20 md:py-28 bg-white'>
      <div className='site-wrapper'>
        <div className='divide-y divide-border'>
          {policySections.map((section, i) => (
            <div key={section.title} className='flex items-start gap-8 py-10'>
              <span className='shrink-0 font-serif text-[clamp(1.8rem,3vw,2.4rem)] font-light leading-none text-custom/20'>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className='flex-1 pt-1'>
                <div className='mb-4 w-6 h-px bg-custom/40' />
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
