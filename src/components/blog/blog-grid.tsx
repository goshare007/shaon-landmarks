import { useMemo } from 'react';
import { BLOG_CATEGORIES, blogArticles } from '@/data/blog';
import { BlogCard } from './blog-card';
import { BlogCardSkeleton } from './blog-card-skeleton';

interface BlogGridProps {
  category: string;
  onCategoryChange: (category: string) => void;
}

export function BlogGrid({ category, onCategoryChange }: BlogGridProps) {
  const isPending = false;

  const filtered = useMemo(() => {
    if (!category) return blogArticles;
    return blogArticles.filter((a) => a.category.slug === category);
  }, [category]);

  const featured = useMemo(() => filtered.find((a) => a.featured), [filtered]);

  const rest = useMemo(
    () => filtered.filter((a) => a.slug !== featured?.slug),
    [filtered, featured],
  );

  return (
    <section className='bg-surface py-16 md:py-24'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-12 flex flex-wrap gap-3'>
          <button
            type='button'
            onClick={() => onCategoryChange('')}
            className={`rounded-sm border px-4 py-2 text-caption font-medium tracking-wider uppercase transition-all ${
              !category
                ? 'border-secondary bg-secondary text-on-secondary'
                : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
            }`}
          >
            All
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type='button'
              onClick={() => onCategoryChange(cat.slug)}
              className={`rounded-sm border px-4 py-2 text-caption font-medium tracking-wider uppercase transition-all ${
                category === cat.slug
                  ? 'border-secondary bg-secondary text-on-secondary'
                  : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-secondary'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className='py-12 text-center text-sm text-on-surface-variant'>
            No articles found in this category.
          </p>
        ) : (
          <div className='space-y-8'>
            {featured && (
              <div className='lg:w-2/3'>
                {isPending ? (
                  <BlogCardSkeleton />
                ) : (
                  <BlogCard article={featured} />
                )}
              </div>
            )}
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {rest.map((article) =>
                isPending ? (
                  <BlogCardSkeleton key={article.slug} />
                ) : (
                  <BlogCard key={article.slug} article={article} />
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
