import {
  IconArrowRight,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconBrandX,
  IconCheck,
  IconLink,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useState } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  XShareButton,
} from 'react-share';
import { buttonVariants } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import type { BlogArticle } from '@/content/blog';
import { getRecentArticles } from '@/content/blog';
import { renderMarkdown } from '@/lib/markdown';
import { cn } from '@/lib/utils';

const SHARE_PLATFORMS = [
  {
    Component: FacebookShareButton,
    Icon: IconBrandFacebook,
    label: 'Facebook',
  },
  { Component: XShareButton, Icon: IconBrandX, label: 'X' },
  {
    Component: LinkedinShareButton,
    Icon: IconBrandLinkedin,
    label: 'LinkedIn',
  },
  {
    Component: WhatsappShareButton,
    Icon: IconBrandWhatsapp,
    label: 'WhatsApp',
  },
  {
    Component: TelegramShareButton,
    Icon: IconBrandTelegram,
    label: 'Telegram',
  },
] as const;

export function ArticleLayout({ article }: { article: BlogArticle }) {
  const recent = getRecentArticles(article.slug, 3);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <>
      <section>
        <article className='site-wrapper pb-24'>
          <div className='mx-auto max-w-3xl'>
            <div className='article-layout__header'>
              <span className='inline-block rounded-sm border border-custom/30 px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase text-custom'>
                {article.category.name}
              </span>

              <h1 className='mt-4 text-[clamp(1.8rem,3.5vw,2.8rem)] font-serif font-light leading-tight text-foreground'>
                {article.title}
              </h1>

              <div className='mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
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

            <div className='article-layout__image relative mx-auto mt-8 overflow-hidden rounded-sm bg-linear-to-br from-surface-brand to-surface-raised'>
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

            {/* Social Share */}

            <div className='mx-auto mt-12 max-w-3xl'>
              <div className='border-t border-border pt-6'>
                <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground'>
                  Share this article
                </span>
                <div className='mt-4 flex flex-wrap items-center gap-6 md:gap-12'>
                  {SHARE_PLATFORMS.map(({ Component, Icon, label }) => (
                    <Component
                      key={label}
                      url={shareUrl}
                      title={article.title}
                      aria-label={`Share on ${label}`}
                    >
                      <div className='rounded-full border p-3 bg-custom/5 pointer-events-none'>
                        <Icon size={20} color='black' />
                      </div>
                    </Component>
                  ))}

                  <button
                    type='button'
                    aria-label={copied ? 'Copied!' : 'Copy link'}
                    onClick={() => {
                      navigator.clipboard.writeText(shareUrl);
                      setCopied(true);
                    }}
                    className={cn(
                      'rounded-full transition-colors bg-custom/5 p-3 border',
                      copied && 'border-custom/40 bg-custom/5 text-custom',
                    )}
                  >
                    {copied ? <IconCheck size={20} /> : <IconLink size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
              <div className='mx-auto mt-8 flex max-w-3xl flex-wrap gap-2'>
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-sm border border-border px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase text-muted-foreground'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio */}
            <div className='mx-auto mt-8 max-w-3xl'>
              <div className='flex items-center gap-4 rounded-sm border border-border bg-muted p-6'>
                <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-custom/10'>
                  <span className='text-sm font-medium text-custom'>
                    {article.author
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
                <div className='min-w-0'>
                  <p className='text-sm font-medium text-foreground'>
                    {article.author}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    Shaon Landmarks & Housing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* Recent Articles */}
      {recent.length > 0 && (
        <section className='border-t border-border bg-surface-raised py-20'>
          <div className='site-wrapper'>
            <SectionHeading
              eyebrow='Read More'
              heading='Recent'
              highlight='Articles'
              highlightStyle='muted'
              className='mb-10'
            />
            <div className='grid gap-6 md:grid-cols-3'>
              {recent.map((r) => (
                <Link
                  key={r.slug}
                  to='/blog/$slug'
                  params={{ slug: r.slug }}
                  className='group relative flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-xs ring-1 ring-foreground/10 transition-all duration-500 hover:ring-custom/25'
                >
                  <div className='absolute top-0 left-0 right-0 z-10 h-0.5 origin-left scale-x-0 bg-custom transition-transform duration-500 ease-out group-hover:scale-x-100' />

                  <div className='relative aspect-video overflow-hidden bg-linear-to-br from-surface-brand to-surface-raised'>
                    <Image
                      src={r.image}
                      alt={r.title}
                      layout='fullWidth'
                      height={225}
                      className='h-full w-full object-cover transition-all duration-900 ease-out group-hover:scale-[1.04]'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/20 to-transparent' />
                    <span className='absolute top-3 left-3 rounded-sm border border-white/30 bg-black/45 px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] text-white/80 uppercase backdrop-blur-sm'>
                      {r.category.name}
                    </span>
                  </div>

                  <div className='flex flex-1 flex-col p-6 translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
                    <p className='text-[10px] text-muted-foreground'>
                      {r.readingTime} min read
                    </p>
                    <h3 className='mt-2 text-base font-serif leading-snug text-foreground transition-colors group-hover:text-custom'>
                      {r.title}
                    </h3>
                    <div className='my-2 h-px w-6 bg-custom/40 transition-all duration-300 group-hover:w-10 group-hover:bg-custom' />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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
            align='center'
            className='mb-6'
            headingClassName='text-white'
          />

          <div className='flex flex-col items-center justify-center gap-4 md:flex-row'>
            <div className='group'>
              <Link
                to='/contact'
                className={buttonVariants({
                  variant: 'custom',
                  size: 'lg',
                  className: 'px-10 py-5',
                })}
              >
                <span className='relative z-10 inline-flex items-center gap-3'>
                  Contact Us
                  <IconArrowRight className='w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
                </span>
              </Link>
            </div>
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
    </>
  );
}
