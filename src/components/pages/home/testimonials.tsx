import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SectionHeading } from '@/components/ui/section-heading';
import { testimonials } from '@/content/testimonials';
import { gsap, MOTION } from '@/lib/gsap';

export function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    [],
  );

  // Pause autoplay on keyboard focus inside carousel
  useEffect(() => {
    const el = carouselWrapperRef.current;
    if (!el) return;
    const handleFocusIn = () => autoplayPlugin.stop();
    const handleFocusOut = (e: FocusEvent) => {
      if (!el.contains(e.relatedTarget as Node)) autoplayPlugin.play();
    };
    el.addEventListener('focusin', handleFocusIn);
    el.addEventListener('focusout', handleFocusOut);
    return () => {
      el.removeEventListener('focusin', handleFocusIn);
      el.removeEventListener('focusout', handleFocusOut);
    };
  }, [autoplayPlugin]);

  // Track current slide
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  // Scroll-triggered entrance
  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      tl.from(headingRef.current, { y: 22, opacity: 0, duration: 0.6 }, 0)
        .from(
          carouselWrapperRef.current,
          { y: 30, opacity: 0, duration: 0.7 },
          0.15,
        )
        .from(
          dotsRef.current ? Array.from(dotsRef.current.children) : [],
          { opacity: 0, stagger: 0.04, duration: 0.3 },
          0.4,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='relative bg-surface-overlay py-20 md:py-28 overflow-hidden border-t border-white/5'
    >
      {/* Subtle background texture — large faint quotemark */}
      <div
        className='pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[320px] leading-none text-white/2 select-none'
        aria-hidden='true'
      >
        &ldquo;
      </div>

      <div className=' relative z-10'>
        <SectionHeading
          ref={headingRef}
          eyebrow='What Our Clients Say'
          heading='Trusted'
          highlight='voices'
          align='center'
          className='mb-14 md:mb-16'
          headingClassName='text-[clamp(2rem,4vw,3rem)] text-white'
        />

        {testimonials.length === 0 ? (
          <p className='text-center text-white/40 py-12'>
            No testimonials available yet.
          </p>
        ) : (
          <>
            {/* Carousel */}
            <div ref={carouselWrapperRef}>
              <Carousel
                setApi={setApi}
                opts={{ align: 'center', loop: true }}
                plugins={[autoplayPlugin]}
                className='mx-auto px-4 md:px-0'
                aria-live='polite'
              >
                <CarouselContent>
                  {testimonials.map((t) => (
                    <CarouselItem
                      key={t.id}
                      className='md:basis-4/5 lg:basis-2/4 py-4'
                    >
                      <div className='relative border border-white/[0.07] bg-white/2 p-8 md:p-12 rounded-sm group hover:border-custom/20 transition-colors duration-500'>
                        {/* Top-left accent corner */}
                        <div className='absolute top-0 left-0 w-8 h-8'>
                          <div className='absolute top-0 left-0 w-full h-px bg-custom/50' />
                          <div className='absolute top-0 left-0 h-full w-px bg-custom/50' />
                        </div>

                        {/* Bottom-right accent corner */}
                        <div className='absolute bottom-0 right-0 w-8 h-8'>
                          <div className='absolute bottom-0 right-0 w-full h-px bg-custom/50' />
                          <div className='absolute bottom-0 right-0 h-full w-px bg-custom/50' />
                        </div>

                        {/* Opening quote mark */}
                        <div className='mb-6 font-serif text-5xl leading-none text-custom/40 select-none'>
                          &ldquo;
                        </div>

                        {/* Quote */}
                        <p className='text-base md:text-lg leading-relaxed text-white/70 font-light'>
                          {t.quote}
                        </p>

                        {/* Divider */}
                        <div className='my-7 h-px w-10 bg-custom/40' />

                        {/* Author */}
                        <footer className='flex items-center gap-4'>
                          {/* Initials avatar */}
                          <div className='flex items-center justify-center w-9 h-9 rounded-sm border border-white/10 bg-white/4 shrink-0'>
                            <span className='font-serif text-xs text-custom/70'>
                              {t.name
                                .split(' ')
                                .map((n: string) => n[0])
                                .join('')
                                .slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <strong className='block text-[11px] font-medium tracking-[0.18em] text-white/80 uppercase'>
                              {t.name}
                            </strong>
                            <p className='mt-0.5 text-xs text-white/60 tracking-wide'>
                              {t.role}
                            </p>
                          </div>
                        </footer>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Dot indicators */}
            <div
              ref={dotsRef}
              className='mt-10 flex items-center justify-center gap-2.5'
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  type='button'
                  onClick={() => api?.scrollTo(i)}
                  className={`h-px transition-all duration-500 rounded-full ${
                    i === current
                      ? 'w-10 bg-custom'
                      : 'w-4 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
