import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useLocation,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { useEffect } from 'react';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import SmoothScroll from '@/context/smooth-scroll';
import { ScrollTrigger } from '@/lib/gsap'; // ← registers plugins as a side-effect
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

/**
 * Kills all ScrollTrigger instances when the route changes so that triggers
 * from the previous page don't fire on the incoming page.
 * Each page/component creates its own triggers inside useEffect — they get
 * re-created on mount and cleaned up via ctx.revert() on unmount.
 */
function ScrollTriggerCleaner() {
  const location = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: triggers cleanup on every route change
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        t.kill();
      });
    };
  }, [location.pathname]);

  return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-custom focus:text-white focus:rounded-sm focus:text-sm focus:outline-none'
        >
          Skip to content
        </a>
        <Header />
        <SmoothScroll>
          <ScrollTriggerCleaner />
          {children}
        </SmoothScroll>
        <Footer />
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
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
