import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { LenisProvider } from '@/lib/lenis';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
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
          className='sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-sm focus:bg-custom focus:px-4 focus:py-2 focus:text-[11px] focus:font-semibold focus:tracking-widest focus:text-white focus:uppercase'
        >
          Skip to content
        </a>
        <LenisProvider>
          <Header />

          <div id='main-content'>{children}</div>
          <Footer />
        </LenisProvider>
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
        <Scripts />
      </body>
    </html>
  );
}
