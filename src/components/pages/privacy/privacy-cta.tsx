import { IconArrowRight, IconShieldCheck } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';

export function PrivacyCta() {
  return (
    <section className='bg-surface-raised py-16 md:py-20 border-t border-border'>
      <div className='site-wrapper'>
        <div className='flex flex-col items-center text-center'>
          <IconShieldCheck
            size={24}
            stroke={1.5}
            className='text-custom'
            aria-hidden='true'
          />
          <h2 className='mt-4 font-serif text-[clamp(1.2rem,2.5vw,1.6rem)] font-light text-foreground leading-snug'>
            Questions About Your Data?
          </h2>
          <p className='mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground'>
            If you have any questions or concerns about how we handle your
            personal information, please do not hesitate to reach out.
          </p>
          <div className='mt-6 h-px w-12 bg-custom/50' />
          <Link
            to='/contact'
            className='group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
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
