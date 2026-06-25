import { Lock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap, MOTION } from '@/lib/gsap';

export function CtaSection() {
  const [interest, setInterest] = useState('residential');

  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      // Left column children stagger up
      if (leftRef.current) {
        gsap.from(Array.from(leftRef.current.children), {
          y: 28,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 84%',
            once: true,
          },
        });
      }

      // Divider line draws from left
      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      // Card slides up
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      // Form fields stagger inside card
      if (cardRef.current) {
        gsap.from(Array.from(cardRef.current.querySelectorAll('.form-field')), {
          y: 16,
          opacity: 0,
          duration: 0.5,
          stagger: 0.09,
          ease: 'power2.out',
          delay: 0.25,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // biome-ignore lint/suspicious/noConsole: this is fine
    console.log({
      name: formData.get('name'),
      email: formData.get('email'),
      interest,
    });
  }

  return (
    <section
      ref={sectionRef}
      className='bg-[#0a0a0a] py-20 md:py-28 overflow-x-hidden border-t border-white/[0.06]'
    >
      <div className='container max-w-360'>
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
              Begin Your{' '}
              <span
                className='italic'
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                }}
              >
                Legacy
              </span>
            </h2>

            <p className='mt-5 max-w-sm text-sm leading-relaxed text-white/45 font-light'>
              Schedule a private consultation with our portfolio managers to
              discuss your future investment in timeless landmarks.
            </p>

            <div ref={dividerRef} className='mt-8 h-px w-14 bg-custom/50' />

            <div className='mt-6 flex items-center gap-3'>
              <Lock size={14} className='text-custom/70' aria-hidden='true' />
              <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/30'>
                Exclusive Portfolio Access
              </span>
            </div>
          </div>

          {/* ── Card ─────────────────────────────────────────────────────── */}
          <div
            ref={cardRef}
            className='relative border border-white/[0.08] p-8 md:p-10 rounded-sm overflow-hidden'
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {/* Subtle corner accent */}
            <div className='absolute top-0 left-0 w-10 h-px bg-custom/60' />
            <div className='absolute top-0 left-0 w-px h-10 bg-custom/60' />

            <h3 className='mb-8 text-[10px] font-medium tracking-[0.22em] uppercase text-white/30'>
              Request Access
            </h3>

            <form className='space-y-7' onSubmit={handleSubmit}>
              {/* Name */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-name'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2 transition-colors group-focus-within:text-custom/70'
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
                             text-sm text-white placeholder:text-white/20 font-light
                             outline-none transition-colors focus:border-custom/50'
                />
              </div>

              {/* Email */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-email'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2 transition-colors group-focus-within:text-custom/70'
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
                             text-sm text-white placeholder:text-white/20 font-light
                             outline-none transition-colors focus:border-custom/50'
                />
              </div>

              {/* Interest */}
              <div className='form-field group'>
                <label
                  htmlFor='cta-interest'
                  className='block text-[9px] font-medium tracking-[0.2em] uppercase text-white/30 mb-2 transition-colors group-focus-within:text-custom/70'
                >
                  Interest Area
                </label>
                <select
                  id='cta-interest'
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className='w-full bg-transparent border-0 border-b border-white/10 pb-2 pt-1
                             text-sm text-white/60 font-light
                             outline-none transition-colors focus:border-custom/50
                             [&>option]:bg-[#0a0a0a] [&>option]:text-white appearance-none cursor-pointer'
                >
                  <option value='residential'>Residential Penthouses</option>
                  <option value='commercial'>Commercial Landmarks</option>
                  <option value='investment'>Investment Opportunities</option>
                </select>
              </div>

              {/* Submit */}
              <button
                type='submit'
                className='form-field group relative w-full overflow-hidden rounded-sm bg-custom
                           px-6 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white
                           uppercase transition-colors duration-200 hover:bg-[#8f6438]'
              >
                {/* Shimmer */}
                <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
                <span className='relative z-10 inline-flex items-center gap-3'>
                  Request Consultation
                  <svg
                    className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5'
                    viewBox='0 0 16 16'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    aria-hidden='true'
                  >
                    <path d='M2 8h12M9 3l5 5-5 5' />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
