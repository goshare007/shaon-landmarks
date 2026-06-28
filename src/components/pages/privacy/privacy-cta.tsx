import { IconArrowRight, IconShieldCheck } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function PrivacyCta() {
  return (
    <section className='bg-surface-raised py-20 md:py-28 border-t border-border'>
      <div className='site-wrapper'>
        <div className='privacy-cta__card relative border border-border bg-white p-8 md:p-12'>
          {/* Corner accents */}
          <div className='absolute top-0 left-0 w-8 h-px bg-custom/40' />
          <div className='absolute top-0 left-0 w-px h-8 bg-custom/40' />
          <div className='absolute bottom-0 right-0 w-8 h-px bg-custom/40' />
          <div className='absolute bottom-0 right-0 w-px h-8 bg-custom/40' />

          <div className='flex items-start gap-4 mb-6'>
            <IconShieldCheck
              size={18}
              stroke={1.5}
              className='text-custom shrink-0 mt-0.5'
              aria-hidden='true'
            />
            <div>
              <h2 className='font-serif text-[clamp(1.1rem,2vw,1.4rem)] font-light text-foreground'>
                Questions About Your Data?
              </h2>
              <p className='mt-3 text-sm leading-relaxed text-muted-foreground'>
                If you have any questions or concerns about how we handle your
                personal information, please do not hesitate to reach out to our
                data protection team.
              </p>
            </div>
          </div>

          <Link
            to='/contact'
            className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10 inline-flex items-center gap-3'>
              Contact Us
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
