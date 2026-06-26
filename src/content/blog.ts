export interface BlogCategory {
  slug: string;
  name: string;
}

export const BLOG_CATEGORIES: BlogCategory[] = [
  { slug: 'market-trends', name: 'Market Trends' },
  { slug: 'buying-guide', name: 'Buying Guide' },
  { slug: 'architecture', name: 'Architecture & Design' },
  { slug: 'lifestyle', name: 'Lifestyle & Living' },
];

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

interface BlogFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  publishedAt: string;
  author: string;
  category: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Record<string, unknown> = {};
  const lines = match[1].split('\n');
  let currentKey = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed === '---') continue;

    const listMatch = trimmed.match(/^-\s+(.+)$/);
    if (listMatch) {
      if (currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        (data[currentKey] as string[]).push(listMatch[1]);
      }
      continue;
    }

    if (trimmed.endsWith(':')) {
      currentKey = trimmed.slice(0, -1);
      continue;
    }

    const sep = trimmed.indexOf(': ');
    if (sep > 0) {
      currentKey = trimmed.slice(0, sep);
      let val: unknown = trimmed.slice(sep + 2);
      if (typeof val === 'string') {
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        } else if (val === 'true') {
          val = true;
        } else if (val === 'false') {
          val = false;
        } else if (/^\d+$/.test(val)) {
          val = parseInt(val, 10);
        }
      }
      data[currentKey] = val;
    }
  }

  return { data, content: match[2] };
}

const blogModules = import.meta.glob('./blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function resolveCategory(slug: string): BlogCategory {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) ?? BLOG_CATEGORIES[0];
}

export const blogArticles: BlogArticle[] = Object.values(blogModules)
  .map((raw) => {
    const { data, content } = parseFrontmatter(raw);
    const f = data as unknown as BlogFrontmatter;
    return {
      slug: f.slug,
      title: f.title,
      excerpt: f.excerpt,
      content,
      image: f.image,
      publishedAt: f.publishedAt,
      author: f.author,
      category: resolveCategory(f.category),
      tags: f.tags,
      readingTime: f.readingTime,
      featured: f.featured,
    };
  })
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): BlogArticle[] {
  if (!categorySlug) return blogArticles;
  return blogArticles.filter((a) => a.category.slug === categorySlug);
}

export function getRecentArticles(
  excludeSlug?: string,
  limit = 3,
): BlogArticle[] {
  return blogArticles
    .filter((a) => a.slug !== excludeSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);
}
