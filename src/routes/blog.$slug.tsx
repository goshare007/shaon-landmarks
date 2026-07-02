import { IconArrowLeft } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArticleLayout } from '@/components/pages/blog/article-layout';
import { RouteError } from '@/components/shared/route-error';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { blogArticles } from '@/content/blog';
import { articleLd, breadcrumbLd, generateMeta, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const article = blogArticles.find((a) => a.slug === params.slug);
    return { article: article ?? null };
  },
  component: BlogArticle,
  errorComponent: RouteError,
  pendingMs: 100,
  pendingComponent: RouteSkeleton,
  notFoundComponent: ArticleNotFound,
  head: ({ loaderData, params }) => {
    const article = loaderData?.article ?? null;
    if (!article) return {};

    const meta = generateMeta({
      path: `/blog/${params.slug}`,
      title: article.title,
      description: article.excerpt,
      image: article.image,
      type: 'article',
    });

    const ldMeta: Array<Record<string, unknown>> = [
      {
        'script:ld+json': {
          '@context': 'https://schema.org',
          ...breadcrumbLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Blog', url: `${SITE_URL}/blog` },
            { name: article.title, url: `${SITE_URL}/blog/${article.slug}` },
          ]),
        },
      },
      {
        'script:ld+json': articleLd({
          headline: article.title,
          description: article.excerpt,
          image: article.image,
          url: `${SITE_URL}/blog/${article.slug}`,
          publishedAt: article.publishedAt,
          author: article.author,
        }),
      },
    ];

    return {
      meta: [...meta.meta, ...ldMeta],
      links: [
        { rel: 'canonical', href: `${SITE_URL}/blog/${params.slug}` },
        { rel: 'preload', as: 'image', href: article.image },
      ],
    };
  },
});

function BlogArticle() {
  const { article } = Route.useLoaderData();
  if (!article) return null;

  return (
    <main>
      <div className='site-wrapper pt-6'>
        <Link
          to='/blog'
          className='mb-6 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground transition-colors hover:text-custom'
        >
          <IconArrowLeft size={14} aria-hidden='true' />
          Back to Blog
        </Link>
      </div>
      <ArticleLayout article={article} />
    </main>
  );
}

function ArticleNotFound() {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-surface-raised px-4'>
      <div className='mx-auto max-w-2xl py-20 text-center'>
        <h1 className='text-8xl font-serif text-custom'>404</h1>
        <p className='mt-4 text-xl font-serif text-foreground'>
          Article Not Found
        </p>
        <p className='mt-2 text-sm text-muted-foreground'>
          The article you are looking for does not exist or has been moved.
        </p>
        <div className='mt-10'>
          <Link
            to='/blog'
            className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-custom px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-custom/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10'>Back to Blog</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
