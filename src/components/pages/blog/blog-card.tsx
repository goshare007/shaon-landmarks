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

  if (featured) {
    return (
      <Link
        to='/blog/$slug'
        params={{ slug: article.slug }}
        className='group flex flex-col overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg md:flex-row'
      >
        <div className='relative aspect-video overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised md:w-[55%]'>
          <Image
            src={article.image}
            alt={article.title}
            layout='fullWidth'
            height={450}
            className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
          <span className='absolute top-4 left-4 rounded-sm bg-custom/90 px-3 py-1 text-[11px] font-medium tracking-wider text-white uppercase'>
            Featured
          </span>
          <span className='absolute top-4 right-4 rounded-sm bg-custom/90 px-3 py-1 text-[11px] font-medium tracking-wider text-white uppercase'>
            {article.category.name}
          </span>
        </div>
        <div className='flex flex-1 flex-col justify-center p-6 md:w-[45%] md:p-8'>
          <p className='text-[10px] text-muted-foreground'>
            {formattedDate} · {article.readingTime} min read
          </p>
          <h3 className='mt-2 text-2xl font-serif leading-snug text-foreground transition-colors group-hover:text-custom md:text-3xl'>
            {article.title}
          </h3>
          <p className='mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
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
      className='group flex flex-col overflow-hidden border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg'
    >
      <div className='relative aspect-16/10 overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised'>
        <Image
          src={article.image}
          alt={article.title}
          layout='fullWidth'
          height={375}
          className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
        <span className='absolute top-4 left-4 rounded-sm bg-custom/90 px-3 py-1 text-[11px] font-medium tracking-wider text-white uppercase'>
          {article.category.name}
        </span>
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='text-[10px] text-muted-foreground'>
          {formattedDate} · {article.readingTime} min read
        </p>
        <h3 className='mt-2 text-xl font-serif leading-snug text-foreground transition-colors group-hover:text-custom'>
          {article.title}
        </h3>
        <p className='mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground'>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
