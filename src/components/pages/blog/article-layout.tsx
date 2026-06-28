import { IconArrowRight } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { SectionHeading } from '@/components/ui/section-heading';
import type { BlogArticle } from '@/content/blog';
import { getRecentArticles } from '@/content/blog';
import { renderMarkdown } from '@/lib/markdown';

export function ArticleLayout({ article }: { article: BlogArticle }) {
  const recent = getRecentArticles(article.slug, 3);

  return (
    <>
      <section>
        <article className='site-wrapper pb-24'>
          <div className='mx-auto max-w-3xl'>
            <div className='article-layout__header'>
              <span className='inline-block rounded-sm bg-custom/10 px-3 py-1 text-[11px] font-medium tracking-wider text-custom uppercase'>
                {article.category.name}
              </span>

              <h1 className='mt-4 text-3xl font-serif leading-tight text-foreground md:text-4xl lg:text-5xl'>
                {article.title}
              </h1>

              <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
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

            <div className='article-layout__image relative mx-auto mt-8 overflow-hidden rounded-sm bg-gradient-to-br from-surface-brand to-surface-raised'>
              <Image
                src={article.image}
                alt={article.title}
                layout='fullWidth'
                height={675}
                className='w-full object-cover'
              />
            </div>

            <div className='article-layout__content mx-auto mt-10 max-w-3xl text-base leading-relaxed md:text-lg'>
              {renderMarkdown(article.content)}
            </div>

            {article.tags.length > 0 && (
              <div className='mx-auto mt-12 flex max-w-3xl flex-wrap gap-2 border-t border-border pt-8'>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-sm border border-border bg-surface-raised px-3 py-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      </section>

      {/* CTA */}
      <section className='relative overflow-hidden bg-surface-brand py-20 md:py-28 border-t border-white/6'>
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-125 w-125 rounded-full border border-white/6' />
        </div>
        <div className='pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='h-187.5 w-187.5 rounded-full border border-white/4' />
        </div>

        <div className='absolute top-0 left-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute top-0 left-0 w-full h-px bg-custom/30' />
          <div className='absolute top-0 left-0 h-full w-px bg-custom/30' />
        </div>
        <div className='absolute bottom-0 right-0 w-8 h-8' aria-hidden='true'>
          <div className='absolute bottom-0 right-0 w-full h-px bg-custom/30' />
          <div className='absolute bottom-0 right-0 h-full w-px bg-custom/30' />
        </div>

        <div className='relative z-10 site-wrapper'>
          <SectionHeading
            eyebrow='Get Started'
            heading='Ready to Find Your'
            highlight='Dream Property?'
            highlightStyle='stroke'
            align='center'
            className='mb-6'
            headingClassName='text-white'
          />

          <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
            <Link
              to='/contact'
              className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-10 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
            >
              <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
              <span className='relative z-10 inline-flex items-center gap-3'>
                Contact Us
                <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </span>
            </Link>
            <Link
              to='/contact'
              className='group inline-flex items-center gap-3 rounded-sm border border-custom/40 px-10 py-3.5 text-[11px] font-medium tracking-[0.15em] text-white/70 uppercase transition-colors duration-200 hover:border-custom hover:text-custom'
            >
              View Properties
              <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      {recent.length > 0 && (
        <section className='bg-surface-raised py-20 border-t border-white/6'>
          <div className='site-wrapper'>
            <SectionHeading
              eyebrow='Read More'
              heading='Recent'
              highlight='Articles'
              highlightStyle='stroke'
              className='mb-10'
            />
            <div className='grid gap-6 md:grid-cols-3'>
              {recent.map((r) => (
                <Link
                  key={r.slug}
                  to='/blog/$slug'
                  params={{ slug: r.slug }}
                  className='group'
                >
                  <div className='aspect-[16/9] overflow-hidden rounded-sm bg-gradient-to-br from-surface-brand to-surface-raised'>
                    <Image
                      src={r.image}
                      alt={r.title}
                      layout='fullWidth'
                      height={225}
                      className='h-full w-full object-cover transition-all duration-500 group-hover:scale-105'
                    />
                  </div>
                  <div className='mt-3'>
                    <span className='text-[11px] font-medium tracking-wider text-custom uppercase'>
                      {r.category.name}
                    </span>
                    <h3 className='mt-1 text-base font-serif leading-snug text-foreground transition-colors group-hover:text-custom'>
                      {r.title}
                    </h3>
                    <p className='mt-1 text-[10px] text-muted-foreground'>
                      {r.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
