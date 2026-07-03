import { useEffect, useMemo, useRef } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { blogArticles } from '@/content/blog';
import { gsap, MOTION } from '@/lib/gsap';
import { BlogCard } from './blog-card';

export function BlogGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const featured = useMemo(() => blogArticles.find((a) => a.featured), []);
  const rest = useMemo(
    () => blogArticles.filter((a) => a.slug !== featured?.slug),
    [featured],
  );

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(headingRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      if (featuredRef.current) {
        gsap.from(featuredRef.current, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: featuredRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface-raised py-16 md:py-24'>
      <div className='site-wrapper'>
        <div ref={headingRef} className='mb-10 md:mb-12'>
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
          <div ref={featuredRef} className='mb-10'>
            <BlogCard article={featured} featured />
          </div>
        )}

        <div ref={gridRef} className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {rest.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
