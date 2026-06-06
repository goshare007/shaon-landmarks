import { writeFileSync } from 'node:fs';

// Generate sitemap.xml for Shaon Landmarks
// Run: bun run scripts/generate-sitemap.ts

const SITE_URL = 'https://shaonlandmarks.vercel.app';

const staticPages: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/career', priority: '0.6', changefreq: 'weekly' },
  { path: '/sustainability', priority: '0.7', changefreq: 'monthly' },
  { path: '/legal', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

const projectSlugs: string[] = [
  'the-obsidian',
  'bronze-heights',
  'the-marble-collection',
  'azure-waterfront',
  'the-skyline-plaza',
  'the-landmark-residency',
];

function url(loc: string, priority: string, changefreq: string): string {
  return `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>\n  </url>`;
}

const urls = [
  ...staticPages.map((p) => url(p.path, p.priority, p.changefreq)),
  ...projectSlugs.map((slug) => url(`/portfolio/${slug}`, '0.7', 'monthly')),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;

writeFileSync('public/sitemap.xml', sitemap, 'utf-8');
process.stdout.write(`Generated sitemap.xml with ${urls.length} URLs\n`);
