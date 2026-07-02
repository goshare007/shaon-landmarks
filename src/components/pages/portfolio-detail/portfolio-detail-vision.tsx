import { Image } from '@unpic/react';
import type { ProjectDetail } from '@/content/projects';

export function PortfolioDetailVision({
  vision,
}: {
  vision: ProjectDetail['vision'];
}) {
  return (
    <section className='relative bg-surface-brand py-32 overflow-hidden'>
      {/* Corner accents */}
      <div className='absolute top-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 z-20 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 z-20 w-px h-10 bg-custom/30' />

      <div className='site-wrapper'>
        <div className='flex flex-col gap-16 lg:flex-row lg:items-center'>
          <div className='w-full lg:w-1/2 lg:pr-12'>
            <div className='w-12 h-px bg-custom mb-8' />
            <h2 className='mb-10 text-3xl leading-tight font-serif text-white md:text-4xl lg:text-5xl'>
              {vision.title}{' '}
              {vision.italicPart && (
                <span className='italic text-custom'>{vision.italicPart}</span>
              )}
            </h2>
            <div className='max-w-xl space-y-6 text-base leading-relaxed text-white/55 md:text-lg'>
              {vision.paragraphs.map((p, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph array — stable order
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className='w-full lg:w-1/2'>
            <div className='overflow-hidden rounded-sm'>
              <Image
                src={vision.image}
                alt=''
                layout='fullWidth'
                decoding='async'
                height={750}
                loading='lazy'
                className='aspect-4/5 h-full w-full object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
