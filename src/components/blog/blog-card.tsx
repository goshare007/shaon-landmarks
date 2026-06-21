'use client';

import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import type { BlogArticle } from '@/data/blog';

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link
      to='/blog/$slug'
      params={{ slug: article.slug }}
      className='group flex flex-col overflow-hidden border border-outline-variant bg-white transition-shadow duration-300 hover:shadow-lg'
      data-e='card'
    >
      <div className='relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-tertiary to-surface-container-high'>
        <Image
          src={article.image}
          alt={article.title}
          layout='fullWidth'
          width={600}
          height={375}
          className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
        <span className='absolute top-4 left-4 rounded-sm bg-secondary/90 px-3 py-1 text-[11px] font-medium tracking-wider text-on-secondary uppercase'>
          {article.category.name}
        </span>
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <p className='text-caption text-on-surface-variant'>
          {article.publishedAt} · {article.readingTime} min read
        </p>
        <h3 className='mt-2 text-xl font-serif leading-snug text-on-surface transition-colors group-hover:text-secondary'>
          {article.title}
        </h3>
        <p className='mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-on-surface-variant'>
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
