/** biome-ignore-all lint/suspicious/noConsole: this is fine */
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import sharp from 'sharp';

interface ImageConfig {
  quality: number;
  maxWidth?: number;
  targetWidth?: number;
  targetHeight?: number;
}

const HERO: ImageConfig = { maxWidth: 1200, quality: 75 };
const GALLERY: ImageConfig = { maxWidth: 1000, quality: 65 };
const OTHER: ImageConfig = { maxWidth: 1000, quality: 65 };
const SMALL: ImageConfig = { maxWidth: 512, quality: 65 };
const CARD: ImageConfig = { maxWidth: 600, quality: 65 };

const ROOTS = [resolve('src/assets/images'), resolve('public/images/blog')];

const OVERRIDES: Record<string, ImageConfig> = {
  // Hero images — keep large, moderate compression
  'the-obsidian.webp': HERO,
  'bronze-heights.webp': HERO,
  'azure-waterfront.webp': HERO,
  'the-marble-collection.webp': HERO,
  'the-skyline-plaza.webp': HERO,
  // Card variants (generated alongside hero images)
  'the-obsidian-card.webp': CARD,
  'bronze-heights-card.webp': CARD,
  'azure-waterfront-card.webp': CARD,
  'the-marble-collection-card.webp': CARD,
  'the-skyline-plaza-card.webp': CARD,
  // Gallery images
  'gallery-1.webp': GALLERY,
  'gallery-2.webp': GALLERY,
  'gallery-3.webp': GALLERY,
  'gallery-4.webp': GALLERY,
  // Logo
  'logo.webp': { targetWidth: 56, targetHeight: 64, quality: 80 },
  // SEO
  'default-og.webp': { maxWidth: 1200, quality: 80 },
  // Sustainability cards — keep moderate size, let object-fit crop
  'green-spaces.webp': { maxWidth: 700, quality: 65 },
  'energy-efficiency.webp': { maxWidth: 700, quality: 65 },
  'sustainable-materials.webp': { maxWidth: 600, quality: 65 },
  'sustainability.webp': { maxWidth: 700, quality: 65 },
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

/** Generate a card-sized variant from a hero-size image */
async function generateCardVariant(
  sourcePath: string,
  cardPath: string,
  results: Result[],
  totals: { before: number; after: number },
) {
  try {
    // Card variant already exists — process it like any other file
    await processFile(cardPath, CARD, results, totals);
  } catch {
    // Card variant doesn't exist yet — generate from source
    const { size: srcSize } = await stat(sourcePath);
    const img = sharp(sourcePath);
    const metadata = await img.metadata();
    const currentWidth = metadata.width ?? 0;

    // biome-ignore lint/style/noNonNullAssertion: this is fine
    if (currentWidth <= CARD.maxWidth!) {
      // Source is already small enough — just copy it
      return;
    }

    const buffer = await img
      .resize({ width: CARD.maxWidth, withoutEnlargement: true })
      .webp({ quality: CARD.quality, effort: 6 })
      .toBuffer();

    await mkdir(dirname(cardPath), { recursive: true });
    await writeFile(cardPath, buffer);
    const after = buffer.length;

    totals.before += srcSize;
    totals.after += after;
    results.push({
      file: relative(resolve(), cardPath),
      before: srcSize,
      after,
      skipped: false,
    });
  }
}

async function main() {
  const results: Result[] = [];
  const totals = { before: 0, after: 0 };

  for (const root of ROOTS) {
    for await (const filePath of walk(root)) {
      const basename = filePath.split('/').pop() ?? '';
      const config = OVERRIDES[basename] ?? OTHER;
      await processFile(filePath, config, results, totals);

      // Generate card variant for project hero images
      if (
        basename.endsWith('.webp') &&
        !basename.includes('-card') &&
        !basename.includes('-gallery') &&
        !basename.includes('-vision') &&
        !basename.includes('-map') &&
        !basename.includes('landmark-') &&
        OVERRIDES[basename] === HERO
      ) {
        const cardName = basename.replace('.webp', '-card.webp');
        const cardPath = join(dirname(filePath), cardName);
        await generateCardVariant(filePath, cardPath, results, totals);
      }
    }
  }

  // Process logo.webp
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
