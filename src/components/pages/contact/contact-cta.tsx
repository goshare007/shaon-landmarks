import { IconArrowRight, IconBrandWhatsapp } from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import { WHATSAPP_MSG, WHATSAPP_NUMBER } from '@/lib/env';
import { gsap, MOTION } from '@/lib/gsap';

export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(contentRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-brand py-16 md:py-20 border-t border-white/6'
    >
      <div className='site-wrapper'>
        <div
          ref={contentRef}
          className='flex flex-col items-center text-center'
        >
          <h2 className='font-serif text-[clamp(1.5rem,3vw,2rem)] font-light text-white leading-snug'>
            Prefer a direct conversation?
          </h2>
          <p className='mt-3 max-w-lg text-sm leading-relaxed text-white/55 font-light'>
            Reach out via WhatsApp for immediate assistance from our team.
          </p>

          <div className='mt-6 h-px w-12 bg-custom/50' />

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
            target='_blank'
            rel='noopener noreferrer'
            className='group relative mt-6 inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10 inline-flex items-center gap-3'>
              <IconBrandWhatsapp size={18} aria-hidden='true' />
              WhatsApp
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
