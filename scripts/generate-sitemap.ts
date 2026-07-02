import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allProjects } from '@/content/projects';

const SITE_URL = process.env.SITE_URL ?? 'https://shaonlandmarks.vercel.app';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const routeDir = path.resolve(scriptDir, '../src/routes');

function lastmod(file: string): string {
  try {
    const mtime = statSync(path.resolve(routeDir, file)).mtime;
    return mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

const staticPages: {
  path: string;
  priority: string;
  changefreq: string;
  file: string;
}[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly', file: '__root.tsx' },
  { path: '/about', priority: '0.8', changefreq: 'monthly', file: 'about.tsx' },
  {
    path: '/services',
    priority: '0.8',
    changefreq: 'monthly',
    file: 'services.tsx',
  },
  {
    path: '/portfolio',
    priority: '0.9',
    changefreq: 'weekly',
    file: 'portfolio.tsx',
  },
  {
    path: '/contact',
    priority: '0.6',
    changefreq: 'monthly',
    file: 'contact.tsx',
  },
  {
    path: '/blog',
    priority: '0.7',
    changefreq: 'weekly',
    file: 'blog.index.tsx',
  },
  {
    path: '/sustainability',
    priority: '0.7',
    changefreq: 'monthly',
    file: 'sustainability.tsx',
  },
  {
    path: '/emi-calculator',
    priority: '0.5',
    changefreq: 'monthly',
    file: 'emi-calculator.tsx',
  },
  { path: '/legal', priority: '0.5', changefreq: 'yearly', file: 'legal.tsx' },
  {
    path: '/privacy',
    priority: '0.5',
    changefreq: 'yearly',
    file: 'privacy.tsx',
  },
];

const blogDir = path.resolve(scriptDir, '../src/content/blog');

function parseBlogPost(filePath: string): {
  slug: string;
  publishedAt: string;
} | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const slug = content.match(/^slug:\s*(.+)$/m)?.[1]?.trim();
    const publishedAt = content.match(/^publishedAt:\s*(.+)$/m)?.[1]?.trim();
    if (!slug || !publishedAt) return null;
    return { slug, publishedAt };
  } catch {
    return null;
  }
}

function getBlogArticles() {
  try {
    const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));
    return files
      .map((f) => parseBlogPost(path.resolve(blogDir, f)))
      .filter((a): a is { slug: string; publishedAt: string } => a !== null)
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      );
  } catch {
    return [];
  }
}

function url(
  loc: string,
  priority: string,
  changefreq: string,
  lm: string,
): string {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lm}</lastmod>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>\n  </url>`;
}

const dataMod = lastmod('../src/content/projects.ts');
const blogArticles = getBlogArticles();
const urls = [
  ...staticPages.map((p) =>
    url(p.path, p.priority, p.changefreq, lastmod(p.file)),
  ),
  ...allProjects.map((project) =>
    url(`/portfolio/${project.slug}`, '0.7', 'monthly', dataMod),
  ),
  ...blogArticles.map((article) =>
    url(`/blog/${article.slug}`, '0.6', 'monthly', article.publishedAt),
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>\n`;

writeFileSync('public/sitemap.xml', sitemap, 'utf-8');
writeFileSync(
  'public/robots.txt',
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  'utf-8',
);
process.stdout.write(`Generated sitemap.xml with ${urls.length} URLs\n`);
