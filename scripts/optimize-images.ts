/** biome-ignore-all lint/suspicious/noConsole: this is fine */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import sharp from 'sharp';

interface ImageConfig {
  maxWidth: number;
  quality: number;
}

const PROJECTS_HERO: ImageConfig = { maxWidth: 1200, quality: 80 };
const PROJECTS_GALLERY: ImageConfig = { maxWidth: 1000, quality: 80 };
const OTHER: ImageConfig = { maxWidth: 1000, quality: 80 };
const SMALL: ImageConfig = { maxWidth: 512, quality: 80 };

const ROOTS = [resolve('src/assets/images'), resolve('public/images/blog')];

const OVERRIDES: Record<string, ImageConfig> = {
  // Hero-scale project images: cap at 1600px
  'the-obsidian.webp': PROJECTS_HERO,
  'bronze-heights.webp': PROJECTS_HERO,
  'azure-waterfront.webp': PROJECTS_HERO,
  'the-marble-collection.webp': PROJECTS_HERO,
  'the-skyline-plaza.webp': PROJECTS_HERO,
  // Gallery images: keep at 1200px
  'gallery-1.webp': PROJECTS_GALLERY,
  'gallery-2.webp': PROJECTS_GALLERY,
  'gallery-3.webp': PROJECTS_GALLERY,
  'gallery-4.webp': PROJECTS_GALLERY,
  // Logo
  'logo.webp': SMALL,
  // SEO
  'default-og.webp': { maxWidth: 1200, quality: 80 },
  // Blog images
  'market-2026.webp': { maxWidth: 1000, quality: 80 },
  'location-matters.webp': { maxWidth: 1000, quality: 80 },
  'sustainable-architecture.webp': { maxWidth: 1000, quality: 80 },
  'smart-home.webp': { maxWidth: 1000, quality: 80 },
  'rajuk-approval.webp': { maxWidth: 1000, quality: 80 },
  'home-buying-guide.webp': { maxWidth: 1000, quality: 80 },
};

interface Result {
  file: string;
  before: number;
  after: number;
  skipped: boolean;
}

async function* walk(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.name.endsWith('.webp')) {
      yield full;
    }
  }
}

async function main() {
  const results: Result[] = [];
  let totalBefore = 0;
  let totalAfter = 0;

  for (const root of ROOTS) {
    for await (const filePath of walk(root)) {
      const { size: before } = await stat(filePath);
      const basename = filePath.split('/').pop() ?? '';
      const config = OVERRIDES[basename] ?? OTHER;

      const img = sharp(filePath);
      const metadata = await img.metadata();
      const currentWidth = metadata.width ?? 0;

      if (currentWidth <= config.maxWidth && before < 100_000) {
        results.push({
          file: relative(resolve(), filePath),
          before,
          after: before,
          skipped: true,
        });
        continue;
      }

      let pipeline = img;
      if (currentWidth > config.maxWidth) {
        pipeline = pipeline.resize({
          width: config.maxWidth,
          withoutEnlargement: true,
        });
      }

      const buffer = await pipeline
        .webp({ quality: config.quality, effort: 6 })
        .toBuffer();

      // Only write if output is actually smaller
      if (buffer.length >= before) {
        results.push({
          file: relative(resolve(), filePath),
          before,
          after: before,
          skipped: true,
        });
        continue;
      }

      await writeFile(filePath, buffer);
      const after = buffer.length;

      totalBefore += before;
      totalAfter += after;
      results.push({
        file: relative(resolve(), filePath),
        before,
        after,
        skipped: false,
      });
    }
  }

  console.log('\nImage optimization results:\n');
  for (const r of results) {
    if (r.skipped) {
      console.log(
        `  ✓ ${r.file}  (${(r.before / 1024).toFixed(0)}K — skipped, already small)`,
      );
    } else {
      const saved = ((1 - r.after / r.before) * 100).toFixed(0);
      console.log(
        `  ✓ ${r.file}  ${(r.before / 1024).toFixed(0)}K → ${(r.after / 1024).toFixed(0)}K  (-${saved}%)`,
      );
    }
  }

  if (totalBefore > 0) {
    const pct = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
    console.log(
      `\n  Total: ${(totalBefore / 1024).toFixed(0)}K → ${(totalAfter / 1024).toFixed(0)}K  (-${pct}%)\n`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
