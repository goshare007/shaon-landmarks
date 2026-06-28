export function PrivacyHero() {
  return (
    <section className='relative bg-surface-brand py-24 md:py-32 border-b border-white/6 overflow-hidden'>
      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/30' />

      <div className='privacy-hero__content site-wrapper'>
        <div className='mb-5 flex items-center gap-4'>
          <div className='w-8 h-px bg-custom' />
          <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
            Legal
          </span>
        </div>
        <h1 className='font-serif text-[clamp(2.5rem,5vw,4rem)] font-light leading-tight tracking-[-0.01em] text-white'>
          Privacy{' '}
          <span
            className='italic'
            style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.28)',
            }}
          >
            Policy
          </span>
        </h1>
        <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55'>
          Your privacy matters to us. This policy outlines how Shaon Landmarks &
          Housing collects, uses, and protects your personal information.
        </p>
        <p className='mt-4 text-[10px] font-medium tracking-[0.2em] text-white/30 uppercase'>
          Last updated: June 2026
        </p>
      </div>
    </section>
  );
}
