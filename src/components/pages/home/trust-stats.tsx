import { TRUST_STATS as stats } from '@/content/home';

export function TrustStats() {
  return (
    <section className='border-y border-border bg-white py-14 md:py-16'>
      <div className='site-wrapper'>
        <h2 className='sr-only'>Company Statistics</h2>
        <div className='grid grid-cols-2 md:grid-cols-4'>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group flex flex-col items-center justify-center gap-2 px-6 py-8 text-center transition-colors duration-300 hover:bg-surface-raised ${
                i < stats.length - 1 ? 'border-r border-border' : ''
              }`}
            >
              {/* Value */}
              <span className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-none text-foreground transition-colors duration-300 group-hover:text-custom'>
                {stat.value}
              </span>

              {/* Expanding rule */}
              <div className='h-px w-6 bg-custom/30 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />

              {/* Label */}
              <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground'>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
