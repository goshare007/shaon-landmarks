import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import type { BlogArticle } from '@/content/blog';
import { getRecentArticles } from '@/content/blog';
import { renderMarkdown } from '@/lib/markdown';

export function ArticleLayout({ article }: { article: BlogArticle }) {
  const recent = getRecentArticles(article.slug, 3);

  return (
    <section>
      <article className='mx-auto max-w-360 px-4 pb-24 md:px-16'>
        <div className='mx-auto max-w-3xl'>
          <span className='inline-block rounded-sm bg-secondary/10 px-3 py-1 text-[11px] font-medium tracking-wider text-secondary uppercase'>
            {article.category.name}
          </span>

          <h1 className='mt-4 text-3xl font-serif leading-tight md:text-4xl lg:text-5xl'>
            {article.title}
          </h1>

          <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-on-surface-variant'>
            <span>{article.author}</span>
            <span aria-hidden='true'>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span aria-hidden='true'>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>

        <div className='relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-sm bg-gradient-to-br from-tertiary to-surface-container-high'>
          <Image
            src={article.image}
            alt={article.title}
            layout='fullWidth'
            height={675}
            className='w-full object-cover'
          />
        </div>

        <div className='mx-auto mt-10 max-w-3xl text-base leading-relaxed md:text-lg'>
          {renderMarkdown(article.content)}
        </div>

        {article.tags.length > 0 && (
          <div className='mx-auto mt-12 flex max-w-3xl flex-wrap gap-2 border-t border-outline-variant pt-8'>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-sm border border-outline-variant bg-surface-container-low px-3 py-1 text-[11px] font-medium tracking-wider text-on-surface-variant uppercase'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className='mx-auto mt-16 max-w-3xl border-t border-outline-variant pt-12 text-center'>
          <p className='text-sm text-on-surface-variant'>
            Ready to find your dream property?
          </p>
          <Link
            to='/contact'
            className='mt-4 inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary uppercase transition-all hover:opacity-90'
          >
            Contact Us
          </Link>
        </div>

        {recent.length > 0 && (
          <div className='mx-auto mt-24 max-w-5xl border-t border-outline-variant pt-16'>
            <h2 className='text-2xl font-serif'>Recent Articles</h2>
            <div className='mt-8 grid gap-6 md:grid-cols-3'>
              {recent.map((r) => (
                <Link
                  key={r.slug}
                  to='/blog/$slug'
                  params={{ slug: r.slug }}
                  className='group'
                >
                  <div className='aspect-[16/9] overflow-hidden rounded-sm bg-gradient-to-br from-tertiary to-surface-container-high'>
                    <Image
                      src={r.image}
                      alt={r.title}
                      layout='fullWidth'
                      height={225}
                      className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='mt-3'>
                    <span className='text-[11px] font-medium tracking-wider text-secondary uppercase'>
                      {r.category.name}
                    </span>
                    <h3 className='mt-1 text-base font-serif leading-snug text-on-surface transition-colors group-hover:text-secondary'>
                      {r.title}
                    </h3>
                    <p className='mt-1 text-caption text-on-surface-variant'>
                      {r.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
}
