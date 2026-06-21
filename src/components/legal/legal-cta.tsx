import { Link } from '@tanstack/react-router';
import { ArrowRight, HelpCircle } from 'lucide-react';

export function LegalCta() {
  return (
    <section className='bg-surface-container-low py-20'>
      <div className='mx-auto max-w-225 px-4 md:px-16'>
        <div className='border border-outline-variant bg-white p-8 text-center md:p-12'>
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
