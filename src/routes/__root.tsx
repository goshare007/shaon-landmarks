import interFontCss from '@fontsource-variable/inter/index.css?url';
import {
  createRootRoute,
  HeadContent,
  Link,
  Scripts,
} from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { LenisProvider } from '@/lib/lenis';
import appCss from '../styles.css?url';

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-devtools').then((m) => ({
        default: m.TanStackDevtools,
      })),
    )
  : null;

const TanStackRouterDevtoolsPanel = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtoolsPanel,
      })),
    )
  : null;

function RootNotFound() {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-surface-container px-4'>
      <div className='mx-auto max-w-2xl py-20 text-center'>
        <h1 className='text-8xl font-serif text-brand'>404</h1>
        <p className='mt-4 text-xl font-serif text-foreground'>
          Page Not Found
        </p>
        <p className='mt-2 text-sm text-muted-foreground'>
          The page you are looking for does not exist or has been moved.
        </p>
        <div className='mt-10'>
          <Link
            to='/'
            className='group relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-brand px-8 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white uppercase transition-colors duration-200 hover:bg-brand/90'
          >
            <div className='absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-500' />
            <span className='relative z-10'>Back to Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRoute({
  notFoundComponent: RootNotFound,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title:
          'Shaon Landmarks — Architectural Integrity | Premium Real Estate Bangladesh',
      },
      {
        name: 'theme-color',
        content: '#0a0a0a',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: interFontCss,
      },
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-brand focus:px-4 focus:py-2 focus:text-[11px] focus:font-semibold focus:tracking-widest focus:text-white focus:uppercase'
        >
          Skip to content
        </a>
        <LenisProvider>
          <Header />

          <div id='main-content'>{children}</div>
          <Footer />
        </LenisProvider>
        {import.meta.env.DEV &&
        TanStackDevtools &&
        TanStackRouterDevtoolsPanel ? (
          <Suspense fallback={null}>
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </Suspense>
        ) : null}
        <Scripts />
      </body>
    </html>
  );
}
