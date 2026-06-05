import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.15, 1] as const },
  },
};

export function TestimonialSection() {
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
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  return (
    <section className='relative bg-tertiary py-20 md:py-28'>
      <div className='mx-auto  px-4'>
        <motion.div
          className='mb-16 text-center'
          variants={fadeUp}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-80px' }}
        >
          <span className='mb-4 block font-sans text-[11px] font-medium tracking-[0.2em] text-secondary uppercase'>
            What Our Clients Say
          </span>
          <h2 className='font-serif text-4xl text-on-tertiary md:text-5xl'>
            Trusted Voices
          </h2>
        </motion.div>

        <Carousel
          setApi={setApi}
          opts={{
            align: 'center',
            loop: true,
          }}
          plugins={[autoplayPlugin]}
          className='mx-auto'
        >
          <CarouselContent>
            {testimonials.map((t, i) => (
              <CarouselItem
                key={t.id}
                className='md:basis-4/5 lg:basis-2/4 py-3'
              >
                <motion.div
                  className='border border-white/10 p-10 md:p-14'
                  variants={fadeUp}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className='mb-8 font-serif text-7xl leading-none text-secondary'>
                    &ldquo;
                  </div>

                  <p className='mb-10 font-sans text-base leading-relaxed text-on-tertiary/90 md:text-lg'>
                    {t.quote}
                  </p>

                  <div className='mb-6 h-px w-12 bg-secondary' />

                  <footer>
                    <strong className='block font-sans text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
                      {t.name}
                    </strong>
                    <p className='mt-1.5 font-sans text-[12px] text-on-tertiary/50'>
                      {t.role}
                    </p>
                  </footer>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='hidden border border-white/20 text-secondary hover:bg-white/5 hover:text-secondary md:flex -left-4 h-12 w-12 rounded-none' />
          <CarouselNext className='hidden border border-white/20 text-secondary hover:bg-white/5 hover:text-secondary md:flex -right-4 h-12 w-12 rounded-none' />
        </Carousel>

        <div className='mt-12 flex items-center justify-center gap-3'>
          {testimonials.map((_, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: this is fine
              key={i}
              type='button'
              onClick={() => api?.scrollTo(i)}
              className={`h-1 transition-all duration-500 ${
                i === current
                  ? 'w-8 bg-secondary'
                  : 'w-4 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
