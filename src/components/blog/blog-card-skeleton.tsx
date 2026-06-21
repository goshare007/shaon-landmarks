export function BlogCardSkeleton() {
  return (
    <div className='flex animate-pulse flex-col overflow-hidden border border-outline-variant bg-white'>
      <div className='aspect-[16/10] bg-surface-container-high' />
      <div className='flex flex-1 flex-col gap-3 p-6'>
        <div className='h-3 w-2/3 rounded-sm bg-surface-container-high' />
        <div className='h-5 w-full rounded-sm bg-surface-container-high' />
        <div className='mt-auto space-y-2'>
          <div className='h-3 w-full rounded-sm bg-surface-container-high' />
          <div className='h-3 w-4/5 rounded-sm bg-surface-container-high' />
        </div>
      </div>
    </div>
  );
}
