import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import type { BlogArticle } from '@/content/blog';

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

export function BlogCard({ article, featured }: BlogCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    'en-US',
    { year: 'numeric', month: 'short', day: 'numeric' },
  );

  const baseClasses =
    'group relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xs ring-1 ring-foreground/10 transition-all duration-500 hover:ring-custom/25';

  const badgeClasses =
    'rounded-sm border border-white/30 bg-black/45 px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-sm';

  if (featured) {
    return (
      <Link
        to='/blog/$slug'
        params={{ slug: article.slug }}
        className={`${baseClasses} md:flex-row`}
      >
        <div className='absolute top-0 left-0 right-0 z-10 h-0.5 origin-left scale-x-0 bg-custom transition-transform duration-500 ease-out group-hover:scale-x-100' />

        <div className='relative aspect-video overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised md:w-[55%]'>
          <Image
            src={article.image}
            alt={article.title}
            layout='fullWidth'
            height={450}
            className='h-full w-full object-cover transition-all duration-900 ease-out group-hover:scale-[1.04]'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
          <span
            className={`absolute top-3 left-3 inline-flex items-center gap-1.5 ${badgeClasses}`}
          >
            <span className='size-1.5 rounded-full bg-custom' />
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
          <h3 className='mt-2 text-2xl font-serif leading-snug text-foreground transition-colors group-hover:text-custom md:text-3xl'>
            {article.title}
          </h3>
          <div className='my-3 h-px w-6 bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
          <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
            {article.excerpt}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to='/blog/$slug'
      params={{ slug: article.slug }}
      className={baseClasses}
    >
      <div className='absolute top-0 left-0 right-0 z-10 h-0.5 origin-left scale-x-0 bg-custom transition-transform duration-500 ease-out group-hover:scale-x-100' />

      <div className='relative aspect-16/10 overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised'>
        <Image
          src={article.image}
          alt={article.title}
          layout='fullWidth'
          height={375}
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
        <h3 className='mt-2 text-lg font-serif leading-snug text-foreground transition-colors group-hover:text-custom'>
          {article.title}
        </h3>
        <div className='my-2 h-px w-6 bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
        <p className='max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-400 group-hover:max-h-24 group-hover:opacity-100'>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
