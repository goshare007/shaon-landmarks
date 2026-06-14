import { statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { allProjects } from '@/data/projects';

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
    path: '/career',
    priority: '0.6',
    changefreq: 'weekly',
    file: 'career.tsx',
  },
  {
    path: '/sustainability',
    priority: '0.7',
    changefreq: 'monthly',
    file: 'sustainability.tsx',
  },
  { path: '/legal', priority: '0.3', changefreq: 'yearly', file: 'legal.tsx' },
  {
    path: '/privacy',
    priority: '0.3',
    changefreq: 'yearly',
    file: 'privacy.tsx',
  },
];

function url(
  loc: string,
  priority: string,
  changefreq: string,
  lm: string,
  image?: string,
): string {
  let entry = `  <url>\n    <loc>${SITE_URL}${loc}</loc>\n    <lastmod>${lm}</lastmod>\n    <priority>${priority}</priority>\n    <changefreq>${changefreq}</changefreq>`;
  if (image) {
    entry += `\n    <image:image>\n      <image:loc>${SITE_URL}${image}</image:loc>\n    </image:image>`;
  }
  entry += `\n  </url>`;
  return entry;
}

const dataMod = lastmod('../src/data/projects.ts');
const urls = [
  ...staticPages.map((p) =>
    url(p.path, p.priority, p.changefreq, lastmod(p.file)),
  ),
  ...allProjects.map((project) =>
    url(`/portfolio/${project.slug}`, '0.7', 'monthly', dataMod, project.image),
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>\n`;

writeFileSync('public/sitemap.xml', sitemap, 'utf-8');
writeFileSync(
  'public/robots.txt',
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  'utf-8',
);
process.stdout.write(`Generated sitemap.xml with ${urls.length} URLs\n`);
