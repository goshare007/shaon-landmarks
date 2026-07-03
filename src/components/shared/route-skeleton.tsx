const SKELETON_IDS = ['sk-0', 'sk-1', 'sk-2', 'sk-3'];

export function RouteSkeleton() {
  return (
    <main>
      <section className='dark-section bg-background py-24 md:py-32'>
        <div className='site-wrapper'>
          <div className='mb-6 h-6 w-48 animate-pulse rounded bg-muted' />
          <div className='h-12 w-3/4 animate-pulse rounded bg-muted md:h-16' />
          <div className='mt-4 h-4 w-1/2 animate-pulse rounded bg-muted' />
        </div>
      </section>
      <section className='bg-surface-container py-20'>
        <div className='site-wrapper'>
          <div className='grid gap-6 md:grid-cols-2'>
            {SKELETON_IDS.map((id) => (
              <div
                key={id}
                className='space-y-3 rounded-sm border border-border p-8'
              >
                <div className='h-5 w-32 animate-pulse rounded bg-muted' />
                <div className='h-4 w-full animate-pulse rounded bg-muted' />
                <div className='h-4 w-2/3 animate-pulse rounded bg-muted' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
