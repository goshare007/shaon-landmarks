import { TRUST_STATS as stats } from '@/data/home';

export function TrustStats() {
  return (
    <section className='border-b border-t border-outline-variant bg-surface-container-low py-16 md:py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-8 md:grid-cols-4'>
          {stats.map((stat) => (
            <div key={stat.label} className='text-center'>
              <div className='text-4xl font-serif text-secondary sm:text-5xl'>
                {stat.value}
              </div>
              <div className='mt-2 text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
