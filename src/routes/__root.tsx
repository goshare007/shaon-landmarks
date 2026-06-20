import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router';
import { AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Header from '@/components/layout/header';
import { RouteTransition } from '@/components/route-transition';
import { CookieConsentBanner } from '@/components/shared/cookie-consent-banner';
import { WhatsAppFab } from '@/components/shared/whatsapp-fab';
import { DEFAULT_OG_IMAGE, ORGANIZATION_JSON_LD, SITE_URL } from '@/lib/seo';
import { LenisScrollProvider } from '@/lib/smooth-scroll';
import appCss from '@/styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#1e1e1e' },
      {
        title:
          'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh',
      },
      {
        name: 'description',
        content:
          'Shaon Landmarks & Housing redefines Bangladesh real estate with architectural integrity, timely handover, and premium quality construction. Explore iconic developments.',
      },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:locale:alternate', content: 'bn_BD' },
      { property: 'og:type', content: 'website' },
      {
        httpEquiv: 'Content-Security-Policy',
        content: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: https://*.basemaps.cartocdn.com",
          "connect-src 'self' https://va.vercel-scripts.com",
          "object-src 'none'",
          "frame-src 'none'",
          "base-uri 'self'",
        ].join('; '),
      },
      { 'script:ld+json': ORGANIZATION_JSON_LD },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: SITE_URL },
      { rel: 'alternate', hrefLang: 'bn', href: `${SITE_URL}/bn` },
      { rel: 'alternate', hrefLang: 'en', href: SITE_URL },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Libre+Caslon+Text:ital@0;1&display=swap',
      },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/logo192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: '/logo512.png',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => (
    <main className='flex min-h-dvh items-center justify-center bg-surface px-4'>
      <div className='mx-auto max-w-2xl py-20 text-center'>
        <h1 className='text-8xl font-serif text-secondary'>404</h1>
        <p className='mt-4 text-xl font-serif text-on-surface'>
          Page Not Found
        </p>
        <p className='mt-2 text-sm text-on-surface-variant'>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className='mt-10 flex items-center justify-center gap-4'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary uppercase transition-all hover:opacity-90'
          >
            Back to Home
          </Link>
          <Link
            to='/portfolio'
            className='inline-flex items-center gap-2 rounded-sm border border-outline-variant px-8 py-3.5 text-label font-medium tracking-widest text-on-surface uppercase transition-all hover:border-secondary hover:text-secondary'
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </main>
  ),
  errorComponent: ({ reset }) => (
    <main className='flex min-h-dvh items-center justify-center bg-surface'>
      <div className='mx-auto max-w-md px-4 text-center'>
        <AlertCircle
          className='mb-4 text-secondary'
          size={48}
          aria-hidden='true'
        />
        <h1 className='text-3xl font-serif text-on-surface'>
          Something Went Wrong
        </h1>
        <p className='mt-2 text-sm text-on-surface-variant'>
          An unexpected error occurred. Please try again or contact support.
        </p>
        <div className='mt-8 flex justify-center gap-4'>
          <button
            type='button'
            onClick={() => reset()}
            className='rounded-sm bg-secondary px-6 py-3 text-label font-medium tracking-widest text-on-secondary uppercase transition-all hover:opacity-90'
          >
            Try Again
          </button>
          <Link
            to='/'
            className='rounded-sm border border-outline-variant px-6 py-3 text-label font-medium tracking-widest text-on-surface uppercase transition-all hover:border-secondary hover:text-secondary'
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className='min-h-dvh bg-surface text-on-surface antialiased'>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-surface focus:text-on-surface focus:outline-2 focus:outline-secondary focus:text-sm focus:font-medium'
        >
          Skip to content
        </a>
        <LenisScrollProvider>
          <div className='print:hidden'>
            <Header />
          </div>
          <div id='main-content' tabIndex={-1} className='pb-16'>
            <RouteTransition>{children}</RouteTransition>
          </div>
          <div className='print:hidden'>
            <Footer />
          </div>
          <div className='print:hidden'>
            <WhatsAppFab />
          </div>
        </LenisScrollProvider>
        <CookieConsentBanner />
        <Scripts />
      </body>
    </html>
  );
}
