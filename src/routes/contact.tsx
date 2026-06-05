import { createFileRoute } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { Label } from '#/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { Textarea } from '#/components/ui/textarea';
import { WHATSAPP_MSG, WHATSAPP_NUMBER } from '#/lib/constants';
import type { ContactFormData } from '#/lib/forms';
import { submitContactForm } from '#/lib/forms';
import CTG_IMG from '@/assets/images/contact/ctg-office.webp';
import DHAKA_IMG from '@/assets/images/contact/dhaka-office.webp';
import HERO_IMG from '@/assets/images/contact/hero.webp';

import { fadeUp, stagger } from '@/lib/animations';
import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/contact')({
  head: () =>
    generateMeta({
      title: 'Contact Us',
      description:
        'Get in touch with Shaon Landmarks & Housing. Schedule a consultation or visit our offices in Gulshan, Dhaka or Agrabad, Chattogram.',
    }),

  component: Contact,
});

function Contact() {
  const [interest, setInterest] = useState('Residential Development');
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

  return (
    <main>
      {/* Hero */}
      <section className='relative flex h-[90vh] items-center justify-center overflow-hidden'>
        <motion.div
          className='absolute inset-0 z-0'
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <Image
            src={HERO_IMG}
            alt=''
            layout='fullWidth'
            className='h-full w-full object-cover brightness-40'
          />
        </motion.div>
        <div className='relative z-10 max-w-4xl px-4 text-center md:px-16'>
          <motion.span
            className='mb-6 block text-label font-medium tracking-[0.4em] text-secondary-fixed-dim uppercase'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Personalized Service
          </motion.span>
          <motion.h1
            className='heading-hero mb-8 text-on-tertiary'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Connect with our Consultants
          </motion.h1>
          <motion.p
            className='mx-auto max-w-2xl text-base leading-relaxed text-on-tertiary/80 md:text-lg'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            At Shaon Landmarks, we believe that exceptional architecture begins
            with a shared vision. Our consultants are prepared to guide you
            through a bespoke development journey tailored to your specific
            requirements.
          </motion.p>
        </div>
      </section>

      {/* Consultation Form */}
      <section className='mx-auto mb-32 mt-20 max-w-360 px-4 md:px-16'>
        <div className='grid gap-6 md:grid-cols-12'>
          <motion.div
            className='mb-12 md:col-span-5 md:mb-0'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='mb-8 text-3xl font-serif md:text-4xl'>
              Consultation Request
            </h2>
            <p className='mb-12 text-sm leading-relaxed text-on-surface-variant md:text-base'>
              Provide us with the foundational details of your aspiration. A
              dedicated senior consultant will review your request and reach out
              within 24 business hours to arrange an initial dialogue.
            </p>
            <div className='space-y-8'>
              <motion.div className='flex items-start gap-4' variants={fadeUp}>
                <span className='material-symbols-outlined text-secondary'>
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
              </motion.div>
              <motion.div className='flex items-start gap-4' variants={fadeUp}>
                <span className='material-symbols-outlined text-secondary'>
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
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className='border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm md:col-span-7 md:p-16'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
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
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-sm p-4 text-sm ${
                    formState.status === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {formState.message}
                </motion.div>
              )}

              <Button
                asChild
                disabled={formState.status === 'submitting'}
                className='w-full rounded-none bg-primary px-12 py-5 text-label font-medium tracking-[0.15em] text-on-primary uppercase transition-all duration-300 hover:bg-secondary hover:text-on-primary disabled:opacity-50'
              >
                <motion.button
                  type='submit'
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formState.status === 'submitting'
                    ? 'Submitting...'
                    : 'Submit Request'}
                </motion.button>
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Locations */}
      <section className='bg-surface-container'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.h2
            className='mb-16 text-center text-4xl leading-[1.2] font-serif md:text-5xl'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            Global Presence
          </motion.h2>
          <motion.div
            className='grid gap-12 md:grid-cols-2'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {[
              {
                tag: 'Corporate Headquarters',
                title: 'Dhaka Executive Studio',
                address: 'Level 24, Landmark Tower',
                area: 'Gulshan Avenue, Dhaka 1212',
                phone: '+880 2 987 6543',
                img: DHAKA_IMG,
              },
              {
                tag: 'Regional Studio',
                title: 'Port City Atelier',
                address: '42 Bay View Plaza',
                area: 'Agrabad C/A, Chittagong 4100',
                phone: '+880 31 123 4567',
                img: CTG_IMG,
              },
            ].map((office) => (
              <motion.div
                key={office.title}
                className='group cursor-pointer space-y-6'
                variants={fadeUp}
              >
                <motion.div className='h-100 overflow-hidden border border-outline-variant bg-surface-dim'>
                  <Image
                    src={office.img}
                    alt={office.title}
                    layout='fullWidth'
                    className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                  />
                </motion.div>
                <div>
                  <span className='mb-2 block text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                    {office.tag}
                  </span>
                  <h3 className='mb-4 text-2xl font-serif'>{office.title}</h3>
                  <p className='max-w-sm text-sm leading-relaxed text-on-surface-variant'>
                    {office.address}
                    <br />
                    {office.area}
                    <br />
                    {office.phone}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className='mx-auto my-32 max-w-360 px-4 md:px-16'>
        <motion.div
          className='relative overflow-hidden border-y border-on-tertiary-fixed-variant/10 bg-tertiary py-24 text-center md:py-32'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
        >
          <div
            className='pointer-events-none absolute inset-0 opacity-10'
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className='relative z-10'>
            <h2 className='mb-6 text-4xl leading-[1.2] font-serif text-on-tertiary md:text-5xl'>
              Immediate Dialogue
            </h2>
            <p className='mx-auto mb-10 max-w-2xl text-base leading-relaxed text-on-tertiary/70 md:text-lg'>
              For urgent inquiries or to speak directly with our principal
              design leads, initiate a direct conversation via our secure
              WhatsApp channel.
            </p>
            <motion.a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-4 border border-secondary px-12 py-5 text-label font-medium tracking-[0.15em] text-secondary uppercase transition-all duration-500 hover:bg-secondary hover:text-on-primary'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className='material-symbols-outlined'>chat</span>
              WhatsApp Integration
            </motion.a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
