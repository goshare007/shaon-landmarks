'use client';

import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { ContactFormData } from '@/lib/forms';
import { submitContactForm } from '@/lib/forms';

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);
  const [interest, setInterest] = useState('Residential Development');
  const [formState, setFormState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });

    const formData = new FormData(e.currentTarget);
    const data: ContactFormData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      interest,
      message: (formData.get('vision') as string) || '',
    };

    try {
      const result = await submitContactForm({ data });
      if (result.success) {
        setFormState({ status: 'success', message: result.message });
        e.currentTarget.reset();
        setInterest('Residential Development');
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setFormState({ status: 'error', message: errorMessage });
    }
  }

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
            section.querySelector('[data-form-heading]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
          );

          tl.fromTo(
            section.querySelector('[data-form-text]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.3',
          );

          tl.fromTo(
            section.querySelectorAll('[data-form-card]'),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 },
            '-=0.3',
          );

          tl.fromTo(
            section.querySelector('[data-form-wrapper]'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.4',
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
    <section
      ref={sectionRef}
      className='mx-auto mb-32 mt-20 max-w-360 px-4 md:px-16'
    >
      <div className='grid gap-6 md:grid-cols-12'>
        <div className='mb-12 md:col-span-5 md:mb-0'>
          <h2
            data-form-heading
            className='mb-8 text-3xl font-serif md:text-4xl'
          >
            Consultation Request
          </h2>
          <p
            data-form-text
            className='mb-12 text-sm leading-relaxed text-on-surface-variant md:text-base'
          >
            Provide us with the foundational details of your aspiration. A
            dedicated senior consultant will review your request and reach out
            within 24 business hours to arrange an initial dialogue.
          </p>
          <div className='space-y-8'>
            <div data-form-card className='flex items-start gap-4'>
              <span
                className='material-symbols-outlined text-secondary'
                aria-hidden='true'
              >
                verified
              </span>
              <div>
                <h4 className='text-label font-medium tracking-widest text-on-surface uppercase'>
                  Privacy Guaranteed
                </h4>
                <p className='text-sm text-on-surface-variant'>
                  Your vision is secure within our confidential framework.
                </p>
              </div>
            </div>
            <div data-form-card className='flex items-start gap-4'>
              <span
                className='material-symbols-outlined text-secondary'
                aria-hidden='true'
              >
                calendar_today
              </span>
              <div>
                <h4 className='text-label font-medium tracking-widest text-on-surface uppercase'>
                  Priority Scheduling
                </h4>
                <p className='text-sm text-on-surface-variant'>
                  Global availability for virtual or in-person sessions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          data-form-wrapper
          className='border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:col-span-7 md:p-16'
        >
          <form className='space-y-8' onSubmit={handleSubmit}>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='group space-y-2'>
                <Label
                  htmlFor='name'
                  className='text-label font-medium tracking-widest text-on-surface uppercase transition-colors group-focus-within:text-secondary'
                >
                  Full Name *
                </Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  required
                  placeholder='Enter your name'
                  className='rounded-none border-0 border-b border-on-surface bg-transparent px-0 shadow-none focus-visible:border-secondary focus-visible:ring-0'
                />
              </div>
              <div className='group space-y-2'>
                <Label
                  htmlFor='email'
                  className='text-label font-medium tracking-widest text-on-surface uppercase transition-colors group-focus-within:text-secondary'
                >
                  Email Address *
                </Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  required
                  placeholder='email@address.com'
                  className='rounded-none border-0 border-b border-on-surface bg-transparent px-0 shadow-none focus-visible:border-secondary focus-visible:ring-0'
                />
              </div>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='interest'
                className='text-label font-medium tracking-widest text-on-surface uppercase transition-colors group-focus-within:text-secondary'
              >
                Project Interest
              </Label>
              <Select value={interest} onValueChange={setInterest}>
                <SelectTrigger
                  id='interest'
                  className='rounded-none border-0 border-b border-on-surface bg-transparent px-0 shadow-none focus:ring-0 focus:border-secondary [&>svg]:text-on-surface-variant'
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent
                  className=' rounded-none border border-outline-variant bg-white text-on-surface shadow-lg'
                  position='popper'
                  sideOffset={4}
                >
                  <SelectItem value='Residential Development'>
                    Residential Development
                  </SelectItem>
                  <SelectItem value='Commercial Portfolio'>
                    Commercial Portfolio
                  </SelectItem>
                  <SelectItem value='Sustainable Landmarks'>
                    Sustainable Landmarks
                  </SelectItem>
                  <SelectItem value='Consultancy Services'>
                    Consultancy Services
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='group space-y-2'>
              <Label
                htmlFor='vision'
                className='text-label font-medium tracking-widest text-on-surface uppercase transition-colors group-focus-within:text-secondary'
              >
                Your Vision
              </Label>
              <Textarea
                id='vision'
                name='vision'
                rows={4}
                placeholder='Describe the scale and intent of your project...'
                className='resize-none rounded-none border border-on-surface bg-transparent p-4 shadow-none focus-visible:border-secondary focus-visible:ring-0'
              />
            </div>

            {formState.message && (
              <div
                className={`rounded-sm p-4 text-sm ${
                  formState.status === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {formState.message}
              </div>
            )}

            <Button
              asChild
              disabled={formState.status === 'submitting'}
              className='w-full rounded-none bg-primary px-12 py-5 text-label font-medium tracking-[0.15em] text-on-primary uppercase transition-all duration-300 hover:bg-secondary hover:text-on-primary disabled:opacity-50'
            >
              <button type='submit'>
                {formState.status === 'submitting'
                  ? 'Submitting...'
                  : 'Submit Request'}
              </button>
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
