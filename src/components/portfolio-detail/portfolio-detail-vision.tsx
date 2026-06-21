import { Image } from '@unpic/react';
import type { ProjectDetail } from '@/data/projects';

export function PortfolioDetailVision({
  vision,
}: {
  vision: ProjectDetail['vision'];
}) {
  return (
    <section className='bg-surface py-32'>
      <div className='mx-auto flex max-w-360 flex-col gap-20 px-4 md:flex-row md:px-16'>
        <div className='w-full md:w-1/2'>
          <h2 className='mb-10 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
            {vision.title}{' '}
            {vision.italicPart && (
              <span className='italic'>{vision.italicPart}</span>
            )}
          </h2>
          <div className='max-w-xl space-y-6 text-base leading-relaxed text-on-surface-variant md:text-lg'>
            {vision.paragraphs.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph array — stable order
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className='w-full overflow-hidden bg-surface-container md:w-1/2'>
          <Image
            src={vision.image}
            alt=''
            layout='fullWidth'
            height={750}
            className='aspect-4/5 h-full w-full object-cover'
          />
        </div>
      </div>
    </section>
  );
}
