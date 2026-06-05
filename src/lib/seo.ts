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
