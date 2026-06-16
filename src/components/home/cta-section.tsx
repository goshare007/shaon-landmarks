'use client';

import { useEffect, useRef, useState } from 'react';
import type { ContactFormData } from '@/lib/forms';
import { submitContactForm } from '@/lib/forms';

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const doneRef = useRef(false);

  const [formState, setFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

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

  const handleMagnetMove = (e: React.MouseEvent) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticPos({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMagnetLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (doneRef.current) return;
    doneRef.current = true;

    const ctrls: (() => void)[] = [];

    import('gsap').then(({ gsap }) => {
      const el = sectionRef.current;
      if (!el) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          defaults: { ease: 'power3.out' },
        });

        tl.fromTo(
          el.querySelector('[data-cta-left]'),
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.8 },
        );

        tl.fromTo(
          el.querySelector('[data-cta-right]'),
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8 },
          '-=0.4',
        );

        tl.fromTo(
          el.querySelector('[data-cta-line]'),
          { width: 0 },
          { width: 64, duration: 0.6 },
          '-=0.3',
        );

        ctrls.push(() => ctx.revert());
      }, el);
    });

    return () => {
      for (const fn of ctrls) fn();
    };
  }, []);

  useEffect(() => {
    if (!magneticPos.x && !magneticPos.y) return;

    import('gsap').then(({ gsap }) => {
      gsap.to(buttonRef.current, {
        x: magneticPos.x,
        y: magneticPos.y,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });
  }, [magneticPos]);

  return (
    <section
      ref={sectionRef}
      className='bg-surface py-20 md:py-28 overflow-x-hidden'
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          <div data-cta-left>
            <h2 className='text-4xl leading-tight text-on-surface font-serif sm:text-5xl'>
              Begin Your Legacy
            </h2>
            <p className='mt-4 max-w-md text-base leading-relaxed text-on-surface-variant'>
              Schedule a private consultation with our portfolio managers to
              discuss your future investment in timeless landmarks.
            </p>
            <div
              data-cta-line
              className='mt-6 h-px bg-secondary'
              style={{ width: 0 }}
            />
            <div className='mt-6 flex items-center gap-3'>
              <span className='material-symbols-outlined text-lg text-secondary'>
                lock
              </span>
              <span className='text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                Exclusive Portfolio Access
              </span>
            </div>
          </div>

          <div
            data-cta-right
            className='border border-outline-variant bg-white p-8'
          >
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

              {/** biome-ignore lint/a11y/noStaticElementInteractions: magnetic button */}
              <div
                onMouseMove={handleMagnetMove}
                onMouseLeave={handleMagnetLeave}
                className='inline-block w-full'
              >
                <button
                  ref={buttonRef}
                  type='submit'
                  disabled={formState.status === 'submitting'}
                  className='w-full rounded-sm bg-primary py-3 text-label font-medium tracking-widest text-on-primary transition-colors hover:bg-secondary uppercase disabled:opacity-50'
                >
                  {formState.status === 'submitting'
                    ? 'Submitting...'
                    : 'Request Consultation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
