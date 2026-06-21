import { Lock } from 'lucide-react';
import { useState } from 'react';
import type { ContactFormData } from '@/lib/forms';
import { submitContactForm } from '@/lib/forms';

export function CtaSection() {
  const [formState, setFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string) || '';
    const email = (formData.get('email') as string) || '';
    const interest = (formData.get('interest') as string) || '';
    const data: ContactFormData = {
      name,
      email,
      interest,
      message: `Consultation request via CTA — Interest: ${interest || 'Not specified'}`,
    };

    try {
      const result = await submitContactForm({ data });
      if (result.success) {
        setFormState({ status: 'success', message: result.message });
        e.currentTarget.reset();
      } else {
        setFormState({
          status: 'error',
          message: result.message || 'Submission failed. Please try again.',
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setFormState({ status: 'error', message: errorMessage });
    }
  }

  return (
    <section className='bg-surface py-20 md:py-28 overflow-x-hidden'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div>
            <h2 className='text-4xl leading-tight text-on-surface font-serif sm:text-5xl'>
              Begin Your Legacy
            </h2>
            <p className='mt-4 max-w-md text-base leading-relaxed text-on-surface-variant'>
              Schedule a private consultation with our portfolio managers to
              discuss your future investment in timeless landmarks.
            </p>
            <div className='mt-6 h-px w-16 bg-secondary' />
            <div className='mt-6 flex items-center gap-3'>
              <Lock className='text-secondary' size={20} aria-hidden='true' />
              <span className='text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                Exclusive Portfolio Access
              </span>
            </div>
          </div>

          <div className='border border-outline-variant bg-white p-8'>
            <h3 className='mb-6 text-label font-medium tracking-widest text-on-surface-variant uppercase'>
              Exclusive Portfolio Access
            </h3>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='group'>
                <label
                  htmlFor='cta-name'
                  className='mb-1 block text-label font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Full Name *
                </label>
                <input
                  id='cta-name'
                  name='name'
                  type='text'
                  required
                  placeholder='Your full name'
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-body-sm text-on-surface outline-none transition-colors focus:border-secondary'
                />
              </div>
              <div className='group'>
                <label
                  htmlFor='cta-email'
                  className='mb-1 block text-label font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Email Address *
                </label>
                <input
                  id='cta-email'
                  name='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  aria-describedby={
                    formState.message ? 'cta-form-status' : undefined
                  }
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-body-sm text-on-surface outline-none transition-colors focus:border-secondary'
                />
              </div>
              <div className='group'>
                <label
                  htmlFor='cta-interest'
                  className='mb-1 block text-label font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Interest Area
                </label>
                <select
                  id='cta-interest'
                  name='interest'
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-body-sm text-on-surface-variant outline-none transition-colors focus:border-secondary'
                >
                  <option>Residential Penthouses</option>
                  <option>Commercial Landmarks</option>
                  <option>Investment Opportunities</option>
                </select>
              </div>
              {formState.message && (
                <div
                  id='cta-form-status'
                  className={`rounded-sm p-3 text-xs ${
                    formState.status === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {formState.message}
                </div>
              )}

              <button
                type='submit'
                disabled={formState.status === 'submitting'}
                className='w-full rounded-sm bg-primary py-3 text-label font-medium tracking-widest text-on-primary transition-colors hover:bg-secondary uppercase disabled:opacity-50'
              >
                {formState.status === 'submitting'
                  ? 'Submitting...'
                  : 'Request Consultation'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
