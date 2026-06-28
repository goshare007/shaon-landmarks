import { Image } from '@unpic/react';
import { useRef } from 'react';
import type { ProjectDetail } from '@/content/projects';

export function PortfolioDetailVision({
  vision,
}: {
  vision: ProjectDetail['vision'];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className='bg-surface-raised py-32'>
      <div className='container flex flex-col gap-20 md:flex-row'>
        <div className='detail-vision__text w-full md:w-1/2'>
          <h2 className='mb-10 text-3xl leading-tight font-serif text-foreground md:text-4xl lg:text-5xl'>
            {vision.title}{' '}
            {vision.italicPart && (
              <span className='italic'>{vision.italicPart}</span>
            )}
          </h2>
          <div className='max-w-xl space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg'>
            {vision.paragraphs.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static paragraph array — stable order
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className='detail-vision__image w-full overflow-hidden bg-background md:w-1/2'>
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
