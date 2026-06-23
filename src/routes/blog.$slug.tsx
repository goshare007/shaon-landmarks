import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { ArticleLayout } from '@/components/blog/article-layout';
import { RouteSkeleton } from '@/components/shared/route-skeleton';
import { blogArticles } from '@/content/blog';
import { articleLd, breadcrumbLd, generateMeta, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const article = blogArticles.find((a) => a.slug === params.slug);
    return { article: article ?? null };
  },
  component: BlogArticle,
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
      links: [{ rel: 'preload', as: 'image', href: article.image }],
    };
  },
});

function BlogArticle() {
  const { article } = Route.useLoaderData();
  if (!article) return null;

  return (
    <main>
      <div className='mx-auto max-w-360 px-4 pt-6 md:px-16'>
        <Link
          to='/blog'
          search={{ category: '' }}
          className='mb-6 inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-secondary'
        >
          <ArrowLeft size={16} aria-hidden='true' />
          Back to Blog
        </Link>
      </div>
      <ArticleLayout article={article} />
    </main>
  );
}

function ArticleNotFound() {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-surface px-4'>
      <div className='mx-auto max-w-2xl py-20 text-center'>
        <h1 className='text-8xl font-serif text-secondary'>404</h1>
        <p className='mt-4 text-xl font-serif text-on-surface'>
          Article Not Found
        </p>
        <p className='mt-2 text-sm text-on-surface-variant'>
          The article you are looking for does not exist or has been moved.
        </p>
        <div className='mt-10'>
          <Link
            to='/blog'
            search={{ category: '' }}
            className='inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary uppercase transition-all hover:opacity-90'
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
