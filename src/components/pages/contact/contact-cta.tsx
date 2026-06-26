import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react';
import { WHATSAPP_MSG, WHATSAPP_NUMBER } from '@/lib/constants';

export function ContactCta() {
  return (
    <section className='relative bg-surface-brand py-20 md:py-28 border-t border-white/6 overflow-hidden'>
      {/* Dot grid */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.04]'
        style={{
          backgroundImage:
            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className='container max-w-360'>
        <div className='relative flex flex-col items-center text-center px-6'>
          {/* Corner accents */}
          <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute top-0 left-0 w-full h-px bg-custom/40' />
            <div className='absolute top-0 left-0 h-full w-px bg-custom/40' />
          </div>
          <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
            <div className='absolute bottom-0 right-0 w-full h-px bg-custom/40' />
            <div className='absolute bottom-0 right-0 h-full w-px bg-custom/40' />
          </div>

          {/* Eyebrow */}
          <div className='flex items-center gap-4 mb-7'>
            <div className='w-8 h-px bg-custom' />
            <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom/80'>
              Connect Directly
            </span>
          </div>

          <h2 className='font-serif text-[clamp(2rem,4vw,3rem)] font-light leading-[1.05] tracking-[-0.01em] text-white'>
            Immediate{' '}
            <span
              className='italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              Dialogue
            </span>
          </h2>

          <p className='mt-5 max-w-xl text-sm leading-relaxed text-white/55 font-light'>
            For urgent inquiries or to speak directly with our principal design
            leads, initiate a direct conversation via our secure WhatsApp
            channel.
          </p>

          <div className='mt-5 h-px w-14 bg-custom/50' />

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10 inline-flex items-center gap-3'>
              <IconBrandWhatsapp size={18} aria-hidden='true' />
              WhatsApp Integration
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
