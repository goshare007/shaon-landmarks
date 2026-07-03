import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/lib/format';
import { gsap, MOTION } from '@/lib/gsap';

function calculateEmi(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;
  if (monthlyRate === 0) {
    const emi = principal / months;
    return { emi, totalPayment: principal, totalInterest: 0 };
  }
  const factor = (1 + monthlyRate) ** months;
  const emi = (principal * (monthlyRate * factor)) / (factor - 1);
  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;
  return { emi, totalPayment, totalInterest };
}

interface SliderControlProps {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

function SliderControl({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
}: SliderControlProps) {
  return (
    <div className='space-y-3'>
      <div className='flex items-center justify-between'>
        <span className='text-[9px] font-medium tracking-[0.2em] text-foreground uppercase'>
          {label}
        </span>
        <span className='font-serif text-lg font-light text-custom'>
          {displayValue}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(val) => {
          const v = Array.isArray(val) ? val[0] : val;
          if (v !== undefined) onChange(v);
        }}
        min={min}
        max={max}
        step={step}
        aria-label={label}
        className='**:data-[slot=slider-track]:bg-border **:data-[slot=slider-range]:bg-custom **:data-[slot=slider-thumb]:border-custom **:data-[slot=slider-thumb]:focus-visible:ring-custom/40'
      />
      <div className='flex justify-between text-[9px] tracking-widest text-muted-foreground'>
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function EmiCalculator() {
  const section1Ref = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const slidersRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const ctaContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      // Section 1 — intro
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(
        introRef.current ? Array.from(introRef.current.children) : [],
        { y: 24, opacity: 0, stagger: 0.12, duration: 0.7 },
        0,
      );

      // Section 2 — sliders
      gsap.from(Array.from(slidersRef.current?.children ?? []), {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        scrollTrigger: {
          trigger: slidersRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      // Section 2 — results
      gsap.from(Array.from(resultsRef.current?.children ?? []), {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: resultsRef.current,
          start: 'top 82%',
          once: true,
        },
      });

      // Section 3 — CTA
      gsap.from(Array.from(ctaContentRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ctaContentRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, section1Ref);

    return () => ctx.revert();
  }, []);

  const [principal, setPrincipal] = useState(50_00_000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest } = useMemo(
    () => calculateEmi(principal, rate, tenure),
    [principal, rate, tenure],
  );

  const principalPct = Math.round((principal / totalPayment) * 100);
  const interestPct = 100 - principalPct;

  return (
    <main ref={section1Ref}>
      {/* ── Section 1: Dark intro ─────────────────────────────────────────── */}
      <section className='relative bg-surface-brand py-16 md:py-20 border-t border-white/6 overflow-hidden'>
        <div ref={introRef}>
          {/* Corner accents */}
          <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
            <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
          </div>
          <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
            <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
          </div>

          <div className='site-wrapper'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-8 h-px bg-custom' />
              <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
                Financial Planning
              </span>
            </div>
            <h1 className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-white mb-5'>
              EMI <span className='italic text-custom'>Calculator</span>
            </h1>
            <p className='max-w-xl text-sm leading-relaxed text-white/55'>
              Plan your investment with confidence. Adjust the loan parameters
              below to see your estimated monthly payments.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Calculator ──────────────────────────────────────────── */}
      <section
        ref={section2Ref}
        className='bg-surface-raised py-20 md:py-28 border-t border-border'
      >
        <div className='site-wrapper'>
          <div className='grid gap-12 lg:grid-cols-2 lg:gap-20'>
            {/* Sliders */}
            <div ref={slidersRef} className='space-y-10'>
              <SliderControl
                label='Loan Amount'
                value={principal}
                displayValue={formatCurrency(principal)}
                min={10_00_000}
                max={5_00_00_000}
                step={5_00_000}
                onChange={setPrincipal}
              />
              <SliderControl
                label='Interest Rate'
                value={rate}
                displayValue={`${rate}%`}
                min={5}
                max={15}
                step={0.25}
                onChange={setRate}
              />
              <SliderControl
                label='Tenure'
                value={tenure}
                displayValue={`${tenure} years`}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
              />

              {/* Breakdown bar */}
              <div className='space-y-3 pt-2'>
                <div className='flex overflow-hidden rounded-sm h-1.5'>
                  <div
                    className='h-full bg-custom transition-all duration-300'
                    style={{ width: `${principalPct}%` }}
                  />
                  <div
                    className='h-full bg-custom/25 transition-all duration-300'
                    style={{ width: `${interestPct}%` }}
                  />
                </div>
                <div className='flex items-center justify-between text-[9px] tracking-[0.12em] text-muted-foreground uppercase'>
                  <span className='flex items-center gap-2'>
                    <span className='inline-block h-1.5 w-1.5 rounded-full bg-custom' />
                    Principal {principalPct}%
                  </span>
                  <span className='flex items-center gap-2'>
                    <span className='inline-block h-1.5 w-1.5 rounded-full bg-custom/25' />
                    Interest {interestPct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div
              ref={resultsRef}
              className='flex flex-col justify-center space-y-4'
            >
              {/* EMI card */}
              <div className='relative border border-border bg-white p-8 text-center'>
                <div className='absolute top-0 left-0 w-8 h-px bg-custom/40' />
                <div className='absolute top-0 left-0 w-px h-8 bg-custom/40' />
                <div className='absolute bottom-0 right-0 w-8 h-px bg-custom/40' />
                <div className='absolute bottom-0 right-0 w-px h-8 bg-custom/40' />

                <span className='text-[9px] font-medium tracking-[0.2em] uppercase text-muted-foreground block mb-3'>
                  Monthly EMI
                </span>
                <p className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-foreground'>
                  {formatCurrency(Math.round(emi))}
                </p>
                <p className='mt-3 text-[11px] tracking-widest text-muted-foreground'>
                  for {tenure} yrs at {rate}% p.a.
                </p>
              </div>

              {/* Stat pair */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='group relative border border-border bg-white p-6 text-center'>
                  <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
                  <div className='absolute top-0 left-0 w-5 h-px bg-custom/30' />
                  <div className='absolute top-0 left-0 w-px h-5 bg-custom/30' />
                  <span className='text-[9px] font-medium tracking-[0.2em] uppercase text-muted-foreground block mb-2'>
                    Total Interest
                  </span>
                  <p className='font-serif text-xl font-light text-foreground md:text-2xl'>
                    {formatCurrency(Math.round(totalInterest))}
                  </p>
                </div>
                <div className='group relative border border-border bg-white p-6 text-center'>
                  <div className='absolute top-0 left-0 right-0 h-0.5 bg-custom origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100' />
                  <div className='absolute bottom-0 right-0 w-5 h-px bg-custom/30' />
                  <div className='absolute bottom-0 right-0 w-px h-5 bg-custom/30' />
                  <span className='text-[9px] font-medium tracking-[0.2em] uppercase text-muted-foreground block mb-2'>
                    Total Payment
                  </span>
                  <p className='font-serif text-xl font-light text-foreground md:text-2xl'>
                    {formatCurrency(Math.round(totalPayment))}
                  </p>
                </div>
              </div>

              <p className='text-center text-xs leading-relaxed text-muted-foreground'>
                * Estimate for reference only. Actual rates and terms depend on
                lender evaluation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: CTA ──────────────────────────────────────────────────── */}
      <section
        ref={section3Ref}
        className='relative bg-surface-brand py-20 md:py-28 border-t border-white/6 overflow-hidden'
      >
        {/* Corner accents */}
        <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
          <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
        </div>
        <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
          <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
        </div>

        <div className='site-wrapper flex flex-col items-center text-center'>
          <div ref={ctaContentRef}>
            <h2 className='font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-tight text-white mb-5'>
              Ready to build your{' '}
              <span className='italic text-custom'>Landmark ?</span>
            </h2>
            <p className='max-w-lg text-sm leading-relaxed text-white/55 mb-10'>
              Speak with our financing experts to turn your numbers into a
              concrete plan.
            </p>
            <Link
              to='/contact'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3'>
                Schedule a Consultation
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
