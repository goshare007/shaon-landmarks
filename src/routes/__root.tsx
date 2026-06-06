import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router';
import Footer from '#/components/Footer';
import Header from '#/components/layout/header';
import { WhatsAppFab } from '#/components/shared/whatsapp-fab';
import { allProjects } from '#/data/projects';
import { DEFAULT_OG_IMAGE, ORGANIZATION_JSON_LD, SITE_URL } from '#/lib/seo';
import appCss from '#/styles.css?url';

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
      { property: 'og:type', content: 'website' },
      { 'script:ld+json': ORGANIZATION_JSON_LD },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'canonical', href: SITE_URL },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
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
  notFoundComponent: () => {
    const suggestions = allProjects.filter((p) => p.detail).slice(0, 3);
    return (
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
          {suggestions.length > 0 && (
            <div className='mt-16'>
              <p className='mb-6 text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                Explore Our Projects
              </p>
              <div className='flex flex-wrap justify-center gap-4'>
                {suggestions.map((p) => (
                  <Link
                    key={p.slug}
                    to='/portfolio/$slug'
                    params={{ slug: p.slug }}
                    className='group rounded-sm border border-outline-variant px-6 py-4 text-left transition-all hover:border-secondary hover:bg-secondary/5'
                  >
                    <p className='text-label font-medium tracking-widest text-secondary uppercase'>
                      {p.title}
                    </p>
                    <p className='mt-1 text-xs text-on-surface-variant line-clamp-1'>
                      {p.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    );
  },
  errorComponent: ({ reset }) => (
    <main className='flex min-h-dvh items-center justify-center bg-surface'>
      <div className='mx-auto max-w-md px-4 text-center'>
        <span className='material-symbols-outlined mb-4 text-6xl text-secondary'>
          error_outline
        </span>
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
        <Header />
        {children}
        <Footer />
        <WhatsAppFab />
        <Scripts />
      </body>
    </html>
  );
}
