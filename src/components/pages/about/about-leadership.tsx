import { Image } from '@unpic/react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useMemo, useRef, useState } from 'react';
import LEADER_1 from '@/assets/images/about/leader-1.webp';
import LEADER_2 from '@/assets/images/about/leader-2.webp';
import LEADER_3 from '@/assets/images/about/leader-3.webp';
import LEADER_4 from '@/assets/images/about/leader-4.webp';
import LEADER_5 from '@/assets/images/about/leader-5.webp';
import LEADER_6 from '@/assets/images/about/leader-6.webp';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const LEADERS = [
  {
    name: 'Engr. Mahfuzur Rahman',
    role: 'Chairman',
    bio: 'Over 25 years in civil engineering, providing technical oversight and strategic direction.',
    image: LEADER_1,
    alt: 'Engr. Mahfuzur Rahman — Chairman, Shaon Landmarks',
  },
  {
    name: 'Md. Shaon Ahmed',
    role: 'Managing Director',
    bio: 'Visionary leader driving expansion and ensuring every project aligns with elite lifestyle aspirations.',
    image: LEADER_2,
    alt: 'Md. Shaon Ahmed — Managing Director, Shaon Landmarks',
  },
  {
    name: 'Sajid Hasan',
    role: 'Director of Operations',
    bio: '20+ years managing large-scale residential and commercial projects across Dhaka.',
    image: LEADER_3,
    alt: 'Sajid Hasan — Director of Operations, Shaon Landmarks',
  },
  {
    name: 'Farzana Alam',
    role: 'Chief Financial Officer',
    bio: 'Chartered accountant overseeing financial strategy, risk management, and capital planning.',
    image: LEADER_4,
    alt: 'Farzana Alam — Chief Financial Officer, Shaon Landmarks',
  },
  {
    name: 'Kamrul Islam',
    role: 'Head of Sales & Marketing',
    bio: 'Drives brand presence and customer engagement with a decade in real estate marketing.',
    image: LEADER_5,
    alt: 'Kamrul Islam — Head of Sales & Marketing, Shaon Landmarks',
  },
  {
    name: 'Taslima Begum',
    role: 'Head of Design',
    bio: 'Award-winning architect focused on contemporary aesthetics and sustainable residential design.',
    image: LEADER_6,
    alt: 'Taslima Begum — Head of Design, Shaon Landmarks',
  },
];

export function AboutLeadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 4000,
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
      className='bg-surface-raised py-16 md:py-20 border-t border-border'
    >
      <div className='site-wrapper'>
        <SectionHeading
          ref={headingRef}
          eyebrow='The Board'
          heading='Visionary'
          highlight='Leadership'
          align='center'
          className='mb-10'
        />

        <div ref={carouselWrapperRef}>
          <Carousel
            setApi={setApi}
            opts={{ align: 'center', loop: true }}
            plugins={[autoplayPlugin]}
            aria-live='polite'
          >
            <CarouselContent>
              {LEADERS.map((leader) => (
                <CarouselItem
                  key={leader.name}
                  className='md:basis-1/2 lg:basis-1/4 py-4'
                >
                  <div className='group border border-border/60 bg-background p-5 rounded-sm hover:border-custom/20 transition-colors duration-500'>
                    <div className='relative mb-4 overflow-hidden rounded-sm'>
                      <div className='aspect-3/4'>
                        <Image
                          src={leader.image}
                          alt={leader.alt}
                          layout='fullWidth'
                          decoding='async'
                          height={400}
                          loading='lazy'
                          className='h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.03]'
                        />
                      </div>

                      <div
                        className='absolute top-0 left-0 w-5 h-5'
                        aria-hidden='true'
                      >
                        <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
                        <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
                      </div>
                      <div
                        className='absolute bottom-0 right-0 w-5 h-5'
                        aria-hidden='true'
                      >
                        <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
                        <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
                      </div>

                      <div className='absolute top-2 left-2'>
                        <span
                          className='inline-block px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase text-white/90 rounded-sm border border-white/10'
                          style={{
                            background: 'rgba(0,0,0,0.55)',
                            backdropFilter: 'blur(8px)',
                          }}
                        >
                          {leader.role}
                        </span>
                      </div>
                    </div>

                    <h4 className='font-serif text-[15px] font-light text-foreground leading-snug'>
                      {leader.name}
                    </h4>
                    <div className='mt-3 mb-3 w-6 h-px bg-custom/30' />
                    <p className='text-xs leading-relaxed text-muted-foreground'>
                      {leader.bio}
                    </p>
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
          {LEADERS.map((leader, i) => (
            <button
              key={leader.name}
              type='button'
              onClick={() => api?.scrollTo(i)}
              className={`h-px transition-all duration-500 rounded-full ${
                i === current
                  ? 'w-10 bg-custom'
                  : 'w-4 bg-border hover:bg-muted-foreground/40'
              }`}
              aria-label={`Go to ${leader.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
