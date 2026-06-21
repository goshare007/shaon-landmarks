import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function PrivacyCta() {
  return (
    <section className='bg-surface-container-low py-20'>
      <div className='mx-auto max-w-225 px-4 md:px-16'>
        <div className='border border-outline-variant bg-white p-8 md:p-12'>
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
            className='inline-flex items-center gap-2 rounded-sm bg-primary px-6 py-3 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
          >
            Contact Us
            <ArrowRight size={16} aria-hidden='true' />
          </Link>
        </div>
      </div>
    </section>
  );
}
