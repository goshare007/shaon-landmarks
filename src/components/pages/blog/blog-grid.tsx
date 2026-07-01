import { useMemo } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
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
        <div className='mb-10 md:mb-12'>
          <SectionHeading
            eyebrow='From Our Blog'
            heading='Latest Articles'
            highlight='Insights'
          />
          <div className='mt-5 flex items-center gap-3'>
            <div className='h-px w-6 bg-custom/40' />
            <span className='text-[10px] font-medium tracking-[0.2em] uppercase text-muted-foreground'>
              {blogArticles.length} Articles
            </span>
          </div>
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
