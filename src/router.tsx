import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: false,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => (
      <main className='flex min-h-dvh items-center justify-center bg-surface-container px-4'>
        <div className='mx-auto max-w-2xl py-20 text-center'>
          <h1 className='text-8xl font-serif text-brand'>404</h1>
          <p className='mt-4 text-xl font-serif text-foreground'>
            Page Not Found
          </p>
        </div>
      </main>
    ),
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
