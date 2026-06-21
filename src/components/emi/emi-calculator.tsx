import * as Slider from '@radix-ui/react-slider';
import { useState } from 'react';
import { formatCurrency } from '@/lib/format';

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
  formatDisplay?: (value: number) => string;
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
        <span className='text-label font-medium tracking-widest text-on-surface uppercase'>
          {label}
        </span>
        <span className='font-sans text-lg font-semibold text-secondary'>
          {displayValue}
        </span>
      </div>
      <Slider.Root
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className='relative flex h-6 w-full touch-none items-center'
      >
        <Slider.Track className='relative h-1 w-full rounded-full bg-outline-variant/50'>
          <Slider.Range className='absolute h-full rounded-full bg-secondary' />
        </Slider.Track>
        <Slider.Thumb
          className='block h-5 w-5 cursor-pointer rounded-full bg-secondary shadow-md transition-transform duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2'
          aria-label={label}
        />
      </Slider.Root>
      <div className='flex justify-between text-caption text-on-surface-variant'>
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(50_00_000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(20);

  const { emi, totalPayment, totalInterest } = calculateEmi(
    principal,
    rate,
    tenure,
  );

  return (
    <section className='bg-surface py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-16 text-center'>
          <h1 className='mb-4 text-3xl font-serif text-primary md:text-4xl'>
            EMI Calculator
          </h1>
          <p className='mx-auto max-w-2xl text-base text-on-surface-variant md:text-lg'>
            Plan your investment with confidence. Adjust the loan parameters
            below to see your estimated monthly payments.
          </p>
        </div>

        <div className='grid gap-12 lg:grid-cols-2 lg:gap-16'>
          <div className='space-y-10'>
            <div>
              <SliderControl
                label='Loan Amount'
                value={principal}
                displayValue={formatCurrency(principal)}
                min={10_00_000}
                max={5_00_00_000}
                step={5_00_000}
                onChange={setPrincipal}
              />
            </div>
            <div>
              <SliderControl
                label='Interest Rate'
                value={rate}
                displayValue={`${rate}%`}
                min={5}
                max={15}
                step={0.25}
                onChange={setRate}
              />
            </div>
            <div>
              <SliderControl
                label='Tenure'
                value={tenure}
                displayValue={`${tenure} years`}
                min={1}
                max={30}
                step={1}
                onChange={setTenure}
              />
            </div>
          </div>

          <div className='flex flex-col justify-center space-y-6'>
            <div className='rounded-sm border border-outline-variant/30 bg-surface-container-low p-8 text-center'>
              <p className='text-label font-medium tracking-widest text-on-surface-variant uppercase mb-2'>
                Monthly EMI
              </p>
              <p className='font-serif text-4xl font-bold text-secondary md:text-5xl'>
                {formatCurrency(Math.round(emi))}
              </p>
              <p className='mt-2 text-sm text-on-surface-variant'>
                for {tenure} years at {rate}% interest
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='rounded-sm border border-outline-variant/30 bg-surface-container-lowest p-6 text-center'>
                <p className='text-label font-medium tracking-widest text-on-surface-variant uppercase mb-1'>
                  Total Interest
                </p>
                <p className='font-sans text-xl font-semibold text-primary md:text-2xl'>
                  {formatCurrency(Math.round(totalInterest))}
                </p>
              </div>
              <div className='rounded-sm border border-outline-variant/30 bg-surface-container-lowest p-6 text-center'>
                <p className='text-label font-medium tracking-widest text-on-surface-variant uppercase mb-1'>
                  Total Payment
                </p>
                <p className='font-sans text-xl font-semibold text-primary md:text-2xl'>
                  {formatCurrency(Math.round(totalPayment))}
                </p>
              </div>
            </div>
            <p className='text-center text-caption text-on-surface-variant'>
              *This is an estimate for reference only. Actual rates and terms
              depend on lender evaluation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
