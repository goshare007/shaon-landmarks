import { SectionHeading } from '@/components/ui/section-heading';

export function PrivacyHero() {
  return (
    <section className='relative bg-surface-brand pb-16 pt-24 md:pb-20 md:pt-32 border-b border-white/6 overflow-hidden'>
      <div className='pointer-events-none absolute -top-40 -right-40 h-125 w-125 rounded-full border border-white/6' />

      <div className='absolute top-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/30' />

      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Legal'
          heading='Privacy'
          highlight='Policy'
          as='h1'
          headingClassName='text-white text-[clamp(2.5rem,5vw,4rem)] tracking-[-0.01em]'
          className='mb-5'
        />
        <p className='mt-5 max-w-2xl text-sm leading-relaxed text-white/55'>
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
