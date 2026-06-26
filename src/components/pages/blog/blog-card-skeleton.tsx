export function BlogCardSkeleton() {
  return (
    <div className='flex animate-pulse flex-col overflow-hidden border border-border bg-white'>
      <div className='aspect-[16/10] bg-gradient-to-br from-surface-brand to-surface-raised' />
      <div className='flex flex-1 flex-col p-6'>
        <div className='h-3 w-1/2 rounded bg-muted-foreground/20' />
        <div className='mt-3 h-6 w-full rounded bg-muted-foreground/20' />
        <div className='mt-3 space-y-2'>
          <div className='h-3 w-full rounded bg-muted-foreground/20' />
          <div className='h-3 w-4/5 rounded bg-muted-foreground/20' />
          <div className='h-3 w-3/5 rounded bg-muted-foreground/20' />
        </div>
      </div>
    </div>
  );
}
