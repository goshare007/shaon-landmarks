import { Image } from '@unpic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { gsap, MOTION } from '@/lib/gsap';

export function PortfolioDetailGallery({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION || !images?.length) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(headingRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [images]);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = (images ?? []).map((src) => ({ src }));

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const [img1, img2, img3] = images ?? [];

  if (!images?.length) return null;

  return (
    <section ref={sectionRef} className='bg-white py-24'>
      <div className='site-wrapper'>
        <div
          ref={headingRef}
          className='detail-gallery__heading mb-16 flex items-end justify-between'
        >
          <h2 className='text-2xl font-serif text-foreground md:text-3xl'>
            Immersive Spaces
          </h2>
          <p className='border-b border-brand pb-1 text-[10px] font-medium tracking-[0.15em] text-brand uppercase'>
            View Full Gallery
          </p>
        </div>
        <div
          ref={gridRef}
          className='detail-gallery__image grid h-200 grid-cols-12 grid-rows-2 gap-6'
        >
          <button
            type='button'
            className='group col-span-12 w-full cursor-crosshair overflow-hidden text-left md:col-span-8 md:row-span-2'
            onClick={() => openLightbox(0)}
            aria-label='Open gallery image 1'
          >
            <Image
              src={img1}
              alt={`${projectTitle} gallery — main view`}
              layout='fullWidth'
              decoding='async'
              width={1200}
              height={800}
              loading='lazy'
              className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
          </button>
          {img2 && (
            <button
              type='button'
              className='group col-span-6 w-full cursor-crosshair overflow-hidden text-left md:col-span-4 md:row-span-1'
              onClick={() => openLightbox(1)}
              aria-label='Open gallery image 2'
            >
              <Image
                src={img2}
                alt={`${projectTitle} gallery — view 2`}
                layout='fullWidth'
                decoding='async'
                width={600}
                height={400}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </button>
          )}
          {img3 && (
            <button
              type='button'
              className='group col-span-6 w-full cursor-crosshair overflow-hidden text-left md:col-span-4 md:row-span-1'
              onClick={() => openLightbox(2)}
              aria-label='Open gallery image 3'
            >
              <Image
                src={img3}
                alt={`${projectTitle} gallery — view 3`}
                layout='fullWidth'
                decoding='async'
                width={600}
                height={400}
                loading='lazy'
                className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-105'
              />
            </button>
          )}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
      />
    </section>
  );
}
