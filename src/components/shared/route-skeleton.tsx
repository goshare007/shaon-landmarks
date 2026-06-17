const SKELETON_IDS = ['sk-0', 'sk-1', 'sk-2', 'sk-3'];

export function RouteSkeleton() {
  return (
    <main>
      <section className='bg-surface py-24 md:py-32'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='mb-6 h-6 w-48 animate-pulse rounded bg-surface-container-high' />
          <div className='h-12 w-3/4 animate-pulse rounded bg-surface-container-higher md:h-16' />
          <div className='mt-4 h-4 w-1/2 animate-pulse rounded bg-surface-container-high' />
        </div>
      </section>
      <section className='bg-surface-container-low py-20'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid gap-6 md:grid-cols-2'>
            {SKELETON_IDS.map((id) => (
              <div
                key={id}
                className='space-y-3 rounded-sm border border-outline-variant p-8'
              >
                <div className='h-5 w-32 animate-pulse rounded bg-surface-container-high' />
                <div className='h-4 w-full animate-pulse rounded bg-surface-container-higher' />
                <div className='h-4 w-2/3 animate-pulse rounded bg-surface-container-higher' />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
