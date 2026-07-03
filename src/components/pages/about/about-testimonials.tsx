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

export function AboutTestimonials() {
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

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

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
      className='bg-white py-20 md:py-24 border-t border-border'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='What People Say'
          heading='Trusted by'
          highlight='Hundreds'
          align='center'
          className='mb-12'
        />

        <div ref={carouselWrapperRef}>
          <Carousel
            setApi={setApi}
            opts={{ align: 'center', loop: true }}
            plugins={[autoplayPlugin]}
            aria-live='polite'
          >
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className='md:basis-1/2 lg:basis-1/3 py-4'
                >
                  <div className='group relative border border-border bg-background p-6 rounded-sm h-full transition-shadow duration-300 hover:shadow-md'>
                    <div
                      className='absolute top-0 left-0 w-6 h-6'
                      aria-hidden='true'
                    >
                      <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
                      <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
                    </div>

                    <svg
                      className='mb-4 h-5 w-5 text-custom/20'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.68-3.646 3.703-3.646 4.832.6-.266 1.288-.348 1.975-.261C9.676 10.989 11 12.348 11 14c0 1.652-1.389 3-3.037 3-.525 0-1.048-.134-1.483-.394.463.727 1.205 1.2 2.03 1.307.013.285.017.563.011.84-1.483.092-2.69-.504-3.849-1.432zm9 0C12.553 16.227 12 15 12 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.68-3.646 3.703-3.646 4.832.6-.266 1.288-.348 1.975-.261C18.676 10.989 20 12.348 20 14c0 1.652-1.389 3-3.037 3-.525 0-1.048-.134-1.483-.394.463.727 1.205 1.2 2.03 1.307.013.285.017.563.011.84-1.483.092-2.69-.504-3.849-1.432z' />
                    </svg>

                    <blockquote className='text-sm leading-relaxed text-muted-foreground mb-5'>
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <div className='border-t border-border pt-4'>
                      <p className='font-serif text-sm font-light text-foreground'>
                        {t.name}
                      </p>
                      <p className='text-[9px] font-medium tracking-[0.12em] uppercase text-custom mt-0.5'>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        <div
          ref={dotsRef}
          className='mt-8 flex items-center justify-center gap-2.5'
        >
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type='button'
              onClick={() => api?.scrollTo(i)}
              className={`h-px transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-10 bg-custom'
                  : 'w-4 bg-border hover:bg-muted-foreground/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
