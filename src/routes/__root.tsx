import { createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { TooltipProvider } from '@/components/ui/tooltip';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Shaon Landmarks — Architecting Tomorrow' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
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
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-custom focus:text-white focus:rounded-sm focus:text-sm focus:outline-none'
        >
          Skip to content
        </a>
        <TooltipProvider>
          <Header />
          {children}
          <Footer />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  );
}
