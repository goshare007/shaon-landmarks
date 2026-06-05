import DEFAULT_OG_IMAGE_SRC from '@/assets/images/seo/default-og.webp';

export const SITE_URL = 'https://shaonlandmarks.com';
export const DEFAULT_OG_IMAGE = DEFAULT_OG_IMAGE_SRC;

export const ORGANIZATION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Shaon Landmarks & Housing',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
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
  ],
  foundingDate: '2008',
};

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateMeta({
  title: pageTitle,
  description: pageDescription,
  image,
  type = 'website',
}: SeoProps) {
  const title = pageTitle
    ? `${pageTitle} — Shaon Landmarks & Housing`
    : 'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh';
  const description =
    pageDescription ??
    'Shaon Landmarks & Housing redefines Bangladesh real estate with architectural integrity, timely handover, and premium quality construction. Explore iconic developments.';

  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image ?? DEFAULT_OG_IMAGE },
      { property: 'og:type', content: type },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image ?? DEFAULT_OG_IMAGE },
    ],
  };
}
