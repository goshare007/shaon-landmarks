import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useRef } from 'react';
import type { BlogArticle } from '@/content/blog';

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export function BlogCard({ article, featured }: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );

  const baseClasses =
    'group relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xs ring-1 ring-foreground/10 transition-all duration-500 hover:ring-brand/25';

  const badgeClasses =
    'rounded-sm border border-white/30 bg-black/45 px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-sm';

  if (featured) {
    return (
      <div ref={cardRef}>
        <Link
          to='/blog/$slug'
          params={{ slug: article.slug }}
          className={`${baseClasses} md:flex-row`}
        >
          <div className='relative aspect-video overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised md:w-[55%]'>
            <Image
              src={article.image}
              alt={article.title}
              layout='fullWidth'
              decoding='async'
              height={450}
              loading='lazy'
              className='h-full w-full object-cover transition-all duration-900 ease-out group-hover:scale-[1.04]'
            />
            <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
            <span
              className={`absolute top-3 left-3 inline-flex items-center gap-1.5 ${badgeClasses}`}
            >
              <span className='size-1.5 rounded-full bg-brand' />
              Featured
            </span>
            <span className={`absolute top-3 right-3 ${badgeClasses}`}>
              {article.category.name}
            </span>
          </div>

          <div className='flex flex-1 flex-col justify-center p-6 md:w-[45%] md:p-8 translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
            <p className='text-[10px] text-muted-foreground'>
              {formattedDate} · {article.readingTime} min read
            </p>
            <h3 className='mt-2 text-2xl font-serif leading-snug text-foreground transition-colors group-hover:text-brand md:text-3xl'>
              {article.title}
            </h3>
            <div className='my-3 h-px w-6 bg-brand/40 transition-all duration-300 group-hover:w-10 group-hover:bg-brand' />
            <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
              {article.excerpt}
            </p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div ref={cardRef}>
      <Link
        to='/blog/$slug'
        params={{ slug: article.slug }}
        className={baseClasses}
      >
        <div className='relative aspect-16/10 overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised'>
          <Image
            src={article.image}
            alt={article.title}
            layout='fullWidth'
            decoding='async'
            height={375}
            loading='lazy'
            className='h-full w-full object-cover transition-all duration-900 ease-out group-hover:scale-[1.04]'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
          <span className={`absolute top-3 left-3 ${badgeClasses}`}>
            {article.category.name}
          </span>
        </div>

        <div className='flex flex-1 flex-col p-6 translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
          <p className='text-[10px] text-muted-foreground'>
            {formattedDate} · {article.readingTime} min read
          </p>
          <h3 className='mt-2 text-lg font-serif leading-snug text-foreground transition-colors group-hover:text-brand'>
            {article.title}
          </h3>
          <div className='my-2 h-px w-6 bg-brand/40 transition-all duration-300 group-hover:w-10 group-hover:bg-brand' />
        </div>
      </Link>
    </div>
  );
}
