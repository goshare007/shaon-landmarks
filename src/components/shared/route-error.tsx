import { Link } from '@tanstack/react-router';

export function RouteError({ error }: { error: Error }) {
  return (
    <main className='flex min-h-[60vh] items-center justify-center bg-surface-container'>
      <div className='text-center'>
        <h1 className='text-4xl font-serif text-foreground'>
          Something went wrong
        </h1>
        <p className='mt-4 text-muted-foreground'>{error.message}</p>
        <Link
          to='/'
          className='mt-8 inline-block rounded-sm border border-border px-6 py-3 text-[10px] font-medium tracking-widest text-foreground uppercase transition-colors hover:border-brand hover:text-brand'
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
