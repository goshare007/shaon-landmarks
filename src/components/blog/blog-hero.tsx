export function BlogHero() {
  return (
    <section className='relative border-b border-outline-variant bg-tertiary pb-16 pt-24 md:pb-20 md:pt-32'>
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-secondary)_0%,_transparent_60%)] opacity-10' />
      <div className='relative z-10 mx-auto max-w-360 px-4 md:px-16'>
        <div>
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Insights & Guides
          </span>
          <h1 className='heading-hero mt-3 text-on-tertiary'>Blog</h1>
          <p className='mt-4 max-w-2xl text-base leading-relaxed text-[#d6d8d8]'>
            Market trends, buying guides, architecture insights, and tips for
            making informed real estate decisions in Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}
