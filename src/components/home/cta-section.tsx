import { motion } from 'framer-motion';
import { useState } from 'react';
import type { ContactFormData } from '#/lib/forms';
import { submitContactForm } from '#/lib/forms';

const leftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.15, 1] as const },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0.25, 0.1, 0.15, 1] as const,
    },
  },
};

export function CtaSection() {
  const [formState, setFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      interest: (formData.get('interest') as string) || '',
      message: 'Request consultation via CTA section',
    };

    try {
      const result = await submitContactForm({ data });
      if (result.success) {
        setFormState({ status: 'success', message: result.message });
        e.currentTarget.reset();
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
          <motion.div
            variants={leftVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='text-4xl leading-tight text-on-surface font-serif sm:text-5xl'>
              Begin Your Legacy
            </h2>
            <p className='mt-4 max-w-md text-base leading-relaxed text-on-surface-variant'>
              Schedule a private consultation with our portfolio managers to
              discuss your future investment in timeless landmarks.
            </p>
            <motion.div
              className='mt-6 h-px w-16 bg-secondary'
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <div className='mt-6 flex items-center gap-3'>
              <span className='material-symbols-outlined text-lg text-secondary'>
                lock
              </span>
              <span className='text-[11px] font-medium tracking-widest text-on-surface-variant uppercase'>
                Exclusive Portfolio Access
              </span>
            </div>
          </motion.div>

          <motion.div
            className='border border-outline-variant bg-white p-8'
            variants={rightVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h3 className='mb-6 text-[11px] font-medium tracking-widest text-on-surface-variant uppercase'>
              Exclusive Portfolio Access
            </h3>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <motion.div
                className='group'
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor='cta-name'
                  className='mb-1 block text-[11px] font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Full Name *
                </label>
                <input
                  id='cta-name'
                  name='name'
                  type='text'
                  required
                  placeholder='Your full name'
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface outline-none transition-colors focus:border-secondary'
                />
              </motion.div>
              <motion.div
                className='group'
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor='cta-email'
                  className='mb-1 block text-[11px] font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Email Address *
                </label>
                <input
                  id='cta-email'
                  name='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface outline-none transition-colors focus:border-secondary'
                />
              </motion.div>
              <motion.div
                className='group'
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <label
                  htmlFor='cta-interest'
                  className='mb-1 block text-[11px] font-medium tracking-wider text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary'
                >
                  Interest Area
                </label>
                <select
                  id='cta-interest'
                  name='interest'
                  className='w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface-variant outline-none transition-colors focus:border-secondary'
                >
                  <option>Residential Penthouses</option>
                  <option>Commercial Landmarks</option>
                  <option>Investment Opportunities</option>
                </select>
              </motion.div>
              {formState.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-sm p-3 text-xs ${
                    formState.status === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {formState.message}
                </motion.div>
              )}

              <motion.button
                type='submit'
                disabled={formState.status === 'submitting'}
                className='w-full rounded-sm bg-primary py-3 text-[11px] font-medium tracking-widest text-on-primary transition-colors hover:bg-secondary uppercase disabled:opacity-50'
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formState.status === 'submitting'
                  ? 'Submitting...'
                  : 'Request Consultation'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
