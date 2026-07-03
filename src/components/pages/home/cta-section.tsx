import { IconArrowRight, IconLock } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { submitContact } from '@/lib/contact';
import { gsap, MOTION } from '@/lib/gsap';

const INTEREST_LABELS: Record<string, string> = {
  residential: 'Residential Penthouses',
  commercial: 'Commercial Landmarks',
  investment: 'Investment Opportunities',
};

export function CtaSection() {
  const [interest, setInterest] = useState('residential');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  );

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.from(
        leftRef.current ? Array.from(leftRef.current.children) : [],
        { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 },
        0,
      )
        .from(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center', duration: 0.5 },
          0.3,
        )
        .from(cardRef.current, { x: 40, opacity: 0, duration: 0.7 }, 0.15);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
      await submitContact({
        name: fd.get('name') as string,
        email: fd.get('email') as string,
        phone: '',
        interest: INTEREST_LABELS[interest] || interest,
        message: '',
      });
      setStatus('sent');
      form.reset();
      setInterest('residential');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      ref={sectionRef}
      className='bg-surface-brand py-20 md:py-28 overflow-x-hidden border-t border-white/6'
    >
      <div className='site-wrapper'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          {/* ── Left ─────────────────────────────────────────────────────── */}
          <div ref={leftRef} className='flex flex-col'>
            {/* Eyebrow */}
            <div className='flex items-center gap-4 mb-7'>
              <div className='w-8 h-px bg-custom' />
              <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
                Private Consultation
              </span>
            </div>

            <h2 className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-white'>
              Begin Your <span className='italic text-custom'>Legacy</span>
            </h2>

            <p className='mt-5 max-w-sm text-sm leading-relaxed text-white/45 font-light'>
              Schedule a private consultation with our portfolio managers to
              discuss your future investment in timeless landmarks.
            </p>

            <div ref={dividerRef} className='mt-8 h-px w-14 bg-custom/50' />

            <div className='mt-6 flex items-center gap-3'>
              <IconLock
                size={14}
                className='text-custom/70'
                aria-hidden='true'
              />
              <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/55'>
                Exclusive Portfolio Access
              </span>
            </div>
          </div>

          {/* ── Card ─────────────────────────────────────────────────────── */}
          <div
            ref={cardRef}
            className='relative border border-white/8 p-8 md:p-10 rounded-sm overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {/* Subtle corner accent */}
            <div className='absolute top-0 left-0 w-10 h-px bg-custom/60' />
            <div className='absolute top-0 left-0 w-px h-10 bg-custom/60' />

            <h3 className='mb-8 text-[10px] font-medium tracking-[0.22em] uppercase text-white/55'>
              Request Access
            </h3>

            <form className='space-y-7' onSubmit={handleSubmit}>
              {/* Name */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-name'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/55 mb-2 transition-colors group-focus-within:text-custom/70'
                >
                  Full Name *
                </label>
                <input
                  id='cta-name'
                  name='name'
                  type='text'
                  required
                  placeholder='Your full name'
                  className='w-full bg-transparent border-0 border-b border-white/10 pb-2 pt-1
                             text-sm text-white placeholder:text-white/40 font-light
                             outline-none transition-colors focus:border-custom/50'
                />
              </div>

              {/* Email */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-email'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/55 mb-2 transition-colors group-focus-within:text-custom/70'
                >
                  Email Address *
                </label>
                <input
                  id='cta-email'
                  name='email'
                  type='email'
                  required
                  placeholder='your@email.com'
                  className='w-full bg-transparent border-0 border-b border-white/10 pb-2 pt-1
                             text-sm text-white placeholder:text-white/40 font-light
                             outline-none transition-colors focus:border-custom/50'
                />
              </div>

              {/* Interest */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-interest'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/55 mb-2 transition-colors group-focus-within:text-custom/70'
                >
                  Interest Area
                </label>
                <Select
                  value={interest}
                  onValueChange={(v) => v && setInterest(v)}
                >
                  <SelectTrigger
                    id='cta-interest'
                    className='w-full rounded-none border-0 border-b border-white/10 bg-transparent px-0 pb-2 pt-1 shadow-none text-sm text-white/60 font-light focus:ring-0 focus:border-custom/50 [&>svg]:text-white/40'
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    className='rounded-sm border border-white/10 bg-surface-brand text-white shadow-lg'
                    sideOffset={4}
                  >
                    <SelectItem value='residential'>
                      Residential Penthouses
                    </SelectItem>
                    <SelectItem value='commercial'>
                      Commercial Landmarks
                    </SelectItem>
                    <SelectItem value='investment'>
                      Investment Opportunities
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <button
                type='submit'
                disabled={status === 'sending'}
                className='form-field group relative w-full overflow-hidden rounded-sm bg-custom
                           px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white
                           uppercase transition-colors duration-200 hover:bg-custom/90
                           disabled:opacity-60 disabled:cursor-not-allowed'
              >
                {/* Shimmer */}
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10 inline-flex items-center gap-3'>
                  {status === 'sending' ? 'Sending...' : 'Request Consultation'}
                  <IconArrowRight
                    className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5'
                    aria-hidden='true'
                  />
                </span>
              </button>

              {status === 'sent' && (
                <p role='alert' className='mt-4 text-xs text-emerald-400'>
                  Thank you. We will be in touch shortly.
                </p>
              )}
              {status === 'error' && (
                <p role='alert' className='mt-4 text-xs text-red-400'>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
