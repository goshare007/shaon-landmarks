/** biome-ignore-all lint/suspicious/noConsole: this is fine */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import sharp from 'sharp';

interface ImageConfig {
  quality: number;
  /** Resize to fit within this width, preserving aspect ratio */
  maxWidth?: number;
  /** Exact target dimensions — will crop to fill if aspect ratio differs */
  targetWidth?: number;
  targetHeight?: number;
}

const HERO: ImageConfig = { maxWidth: 1200, quality: 80 };
const GALLERY: ImageConfig = { maxWidth: 1000, quality: 75 };
const OTHER: ImageConfig = { maxWidth: 1000, quality: 75 };
const SMALL: ImageConfig = { maxWidth: 512, quality: 75 };

const ROOTS = [resolve('src/assets/images'), resolve('public/images/blog')];

const OVERRIDES: Record<string, ImageConfig> = {
  // Home hero — keep large but compress
  'the-obsidian.webp': HERO,
  // Featured project cards (displayed ~432x288 in grid, ~full-width hero card)
  'bronze-heights.webp': HERO,
  'azure-waterfront.webp': HERO,
  'the-marble-collection.webp': HERO,
  'the-skyline-plaza.webp': HERO,
  // Gallery images
  'gallery-1.webp': GALLERY,
  'gallery-2.webp': GALLERY,
  'gallery-3.webp': GALLERY,
  'gallery-4.webp': GALLERY,
  // Logo — displayed at ~28x32, resize to 2x for retina
  'logo.webp': { targetWidth: 56, targetHeight: 64, quality: 80 },
  // SEO
  'default-og.webp': { maxWidth: 1200, quality: 80 },
  // Sustainability cards — displayed in 3-col grid, crop to landscape 3:2
  'green-spaces.webp': { targetWidth: 900, targetHeight: 600, quality: 75 },
  'energy-efficiency.webp': {
    targetWidth: 900,
    targetHeight: 600,
    quality: 75,
  },
  'sustainable-materials.webp': {
    targetWidth: 600,
    targetHeight: 750,
    quality: 75,
  },
  // Blog images
  'market-2026.webp': GALLERY,
  'location-matters.webp': GALLERY,
  'sustainable-architecture.webp': GALLERY,
  'smart-home.webp': GALLERY,
  'rajuk-approval.webp': GALLERY,
  'home-buying-guide.webp': GALLERY,
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

async function processFile(
  filePath: string,
  config: ImageConfig,
  results: Result[],
  totals: { before: number; after: number },
) {
  const { size: before } = await stat(filePath);
  const img = sharp(filePath);
  const metadata = await img.metadata();
  const currentWidth = metadata.width ?? 0;
  const currentHeight = metadata.height ?? 0;

  // Skip if image has exact target dimensions and is already small enough
  if (config.targetWidth && config.targetHeight) {
    if (
      currentWidth === config.targetWidth &&
      currentHeight === config.targetHeight &&
      before < 100_000
    ) {
      results.push({
        file: relative(resolve(), filePath),
        before,
        after: before,
        skipped: true,
      });
      return;
    }
  } else if (config.maxWidth) {
    if (currentWidth <= config.maxWidth && before < 100_000) {
      results.push({
        file: relative(resolve(), filePath),
        before,
        after: before,
        skipped: true,
      });
      return;
    }
  }

  let pipeline = img;

  if (config.targetWidth && config.targetHeight) {
    pipeline = pipeline.resize({
      width: config.targetWidth,
      height: config.targetHeight,
      fit: 'cover',
      position: 'center',
    });
  } else if (config.maxWidth && currentWidth > config.maxWidth) {
    pipeline = pipeline.resize({
      width: config.maxWidth,
      withoutEnlargement: true,
    });
  }

  const buffer = await pipeline
    .webp({ quality: config.quality, effort: 6 })
    .toBuffer();

  if (buffer.length >= before) {
    results.push({
      file: relative(resolve(), filePath),
      before,
      after: before,
      skipped: true,
    });
    return;
  }

  await writeFile(filePath, buffer);
  const after = buffer.length;

  totals.before += before;
  totals.after += after;
  results.push({
    file: relative(resolve(), filePath),
    before,
    after,
    skipped: false,
  });
}

async function main() {
  const results: Result[] = [];
  const totals = { before: 0, after: 0 };

  for (const root of ROOTS) {
    for await (const filePath of walk(root)) {
      const basename = filePath.split('/').pop() ?? '';
      const config = OVERRIDES[basename] ?? OTHER;
      await processFile(filePath, config, results, totals);
    }
  }

  // Process logo.webp (not under images/ subdirectory)
  const logoPath = resolve('src/assets/logo.webp');
  try {
    await stat(logoPath);
    await processFile(
      logoPath,
      OVERRIDES['logo.webp'] ?? SMALL,
      results,
      totals,
    );
  } catch {
    // logo not found
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

  if (totals.before > 0) {
    const pct = ((1 - totals.after / totals.before) * 100).toFixed(0);
    console.log(
      `\n  Total: ${(totals.before / 1024).toFixed(0)}K → ${(totals.after / 1024).toFixed(0)}K  (-${pct}%)\n`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
