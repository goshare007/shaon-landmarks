import { Image } from '@unpic/react';
import { useCallback, useRef, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export function PortfolioDetailGallery({
  images,
  projectTitle,
}: {
  images: string[];
  projectTitle: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const slides = images.map((src) => ({ src }));

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const [img1, img2, img3] = images;

  return (
    <section ref={sectionRef} className='bg-white py-24'>
      <div className='container'>
        <div className='detail-gallery__heading mb-16 flex items-end justify-between'>
          <h2 className='text-2xl font-serif text-foreground md:text-3xl'>
            Immersive Spaces
          </h2>
          <p className='border-b border-custom pb-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase'>
            View Full Gallery
          </p>
        </div>
        <div className='detail-gallery__image grid h-200 grid-cols-12 grid-rows-2 gap-6'>
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
              height={800}
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
