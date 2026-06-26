import DEFAULT_OG_IMAGE_SRC from '@/assets/images/seo/default-og.webp';

export const SITE_URL =
  process.env.SITE_URL ?? 'https://shaonlandmarks.vercel.app';
export const DEFAULT_OG_IMAGE = DEFAULT_OG_IMAGE_SRC;
export const DEFAULT_OG_IMAGE_ALT =
  'Shaon Landmarks & Housing — Architectural Integrity';

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Shaon Landmarks & Housing',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: DEFAULT_OG_IMAGE,
  description:
    'Premium real estate developer in Bangladesh with architectural integrity, timely handover, and premium quality construction.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gulshan Avenue',
    addressLocality: 'Dhaka',
    addressRegion: 'Dhaka',
    postalCode: '1212',
    addressCountry: 'BD',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+880-2-987-6543',
    contactType: 'sales',
  },
  knowsAbout: [
    'Real Estate Development',
    'Architecture',
    'Construction',
    'Interior Design',
    'Property Management',
  ],
  foundingDate: '2008',
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 50,
    maxValue: 200,
  },
  areaServed: [
    { '@type': 'City', name: 'Dhaka' },
    { '@type': 'City', name: 'Chattogram' },
  ],
  priceRange: '$$$',
};

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  path?: string;
}

export function generateMeta({
  title: pageTitle,
  description: pageDescription,
  image,
  imageAlt,
  type = 'website',
  path,
}: SeoProps) {
  const title = pageTitle
    ? `${pageTitle} — Shaon Landmarks & Housing`
    : 'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh';
  const description =
    pageDescription ??
    'Shaon Landmarks & Housing — architectural integrity, timely handover, and premium quality construction in Bangladesh real estate.';
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const ogImageAlt = imageAlt ?? pageDescription ?? DEFAULT_OG_IMAGE_ALT;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: 'Shaon Landmarks & Housing' },
      { property: 'og:url', content: url },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: ogImageAlt },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@shaonlandmarks' },
      { name: 'twitter:creator', content: '@shaonlandmarks' },
      { name: 'twitter:image:alt', content: ogImageAlt },
    ],
  };
}

// ── Structured Data Helpers ──────────────────────────────────────────

export function ldScript(data: Record<string, unknown>): string {
  return JSON.stringify({ '@context': 'https://schema.org', ...data });
}

export function productLd({
  name,
  description,
  image,
  url,
  status,
  location,
  area,
  units,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  status: string;
  location: string;
  area: string;
  units: string;
}) {
  return {
    '@type': 'RealEstateListing',
    name,
    description,
    image,
    url,
    category: 'Real Estate Development',
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Status', value: status },
      { '@type': 'PropertyValue', name: 'Location', value: location },
      { '@type': 'PropertyValue', name: 'Total Area', value: area },
      { '@type': 'PropertyValue', name: 'Number of Units', value: units },
    ],
  };
}

export function webpageLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@type': 'WebPage',
    name,
    description,
    url,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name, item: url },
      ],
    },
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function articleLd(article: {
  headline: string;
  description: string;
  image: string;
  url: string;
  publishedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    url: article.url,
    datePublished: article.publishedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Shaon Landmarks & Housing',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` },
    },
  };
}

export function faqLd(questions: { question: string; answer: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}
