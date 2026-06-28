import { useMemo } from 'react';
import { blogArticles } from '@/content/blog';
import { BlogCard } from './blog-card';

export function BlogGrid() {
  const featured = useMemo(() => blogArticles.find((a) => a.featured), []);
  const rest = useMemo(
    () => blogArticles.filter((a) => a.slug !== featured?.slug),
    [featured],
  );

  return (
    <section className='bg-surface-raised py-16 md:py-24'>
      <div className='site-wrapper'>
        <div className='mb-8 flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            {blogArticles.length} Articles
          </p>
        </div>

        {featured && (
          <div className='mb-10'>
            <BlogCard article={featured} featured />
          </div>
        )}

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {rest.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
