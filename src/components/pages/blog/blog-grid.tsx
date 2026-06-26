import { useEffect, useMemo, useRef } from 'react';
import { blogArticles } from '@/content/blog';
import { gsap, MOTION } from '@/lib/gsap';
import { BlogCard } from './blog-card';
import { BlogCardSkeleton } from './blog-card-skeleton';

export function BlogGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isPending = false;

  useEffect(() => {
    if (!MOTION) return;
    const cards = sectionRef.current?.querySelectorAll('.blog-card');
    if (!cards?.length) return;

    gsap.set(cards, { y: 24, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          gsap.to(cards, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
            ease: 'power2.out',
            clearProps: 'transform',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    // biome-ignore lint/style/noNonNullAssertion: this is fine
    observer.observe(sectionRef.current!);
    return () => observer.disconnect();
  }, []);

  const featured = useMemo(() => blogArticles.find((a) => a.featured), []);
  const rest = useMemo(
    () => blogArticles.filter((a) => a.slug !== featured?.slug),
    [featured],
  );

  return (
    <section ref={sectionRef} className='bg-surface-raised py-16 md:py-24'>
      <div className='container'>
        <div className='mb-8 flex items-center justify-between'>
          <p className='text-sm text-muted-foreground'>
            {blogArticles.length} Articles
          </p>
        </div>

        {featured && (
          <div className='mb-10'>
            {isPending ? (
              <BlogCardSkeleton />
            ) : (
              <BlogCard article={featured} featured />
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
    </section>
  );
}
