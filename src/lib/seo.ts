export const SITE_URL = 'https://shaonlandmarks.com';

export const DEFAULT_OG_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8BwoMYbrQ28fJaSOuEe1WTlrkDlfMA88vVpBY222NhODQicFYS6DyGBlOgd_PHVThWexPgv-GSa-3s56VDpc4_HW0fILv1rZnccogPrmXSkveZGIB1RF1XBne-SRb9paH9a-dvj7u3pLQUCctm5cJ33NuwaC5uWF1S3sONXSBQDu2UKWhvwJu_tRq4_WPChZGm8BTzRN_glRyQlioVMe3G5t4x6qj0CRdiL_Oj33_cEeqQQnR9pYOmMiKt-1-5-ShIjIjgoZEE9U';

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
