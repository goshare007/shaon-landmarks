const statusConfig: Record<
  string,
  { dot: string; text: string; border: string }
> = {
  Completed: {
    dot: 'bg-emerald-400',
    text: 'text-emerald-100',
    border: 'border-emerald-700/60',
  },
  Ongoing: {
    dot: 'bg-amber-400',
    text: 'text-amber-100',
    border: 'border-amber-700/60',
  },
  Upcoming: {
    dot: 'bg-sky-400',
    text: 'text-sky-100',
    border: 'border-sky-700/60',
  },
};

export function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 text-[9px] font-medium tracking-[0.18em] uppercase backdrop-blur-sm ${cfg?.border ?? ''} ${cfg?.text ?? ''}`}
      style={{ background: 'rgba(0,0,0,0.45)' }}
    >
      <span className={`size-1.5 rounded-full ${cfg?.dot ?? ''}`} />
      {status}
    </span>
  );
}
