import { Link, useNavigate } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { ArrowRight, Check, Search, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { allProjects } from '@/data/projects';

const statusFilters = ['All', 'Completed', 'Ongoing', 'Upcoming'] as const;
type StatusFilter = (typeof statusFilters)[number];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-900/60 text-emerald-100 border-emerald-700',
  Ongoing: 'bg-amber-900/60 text-amber-100 border-amber-700',
  Upcoming: 'bg-sky-900/60 text-sky-100 border-sky-700',
};

const ALL_LOCATIONS = [...new Set(allProjects.map((p) => p.location))].sort();

interface PortfolioGridProps {
  filters: { status: string; location: string; search: string };
  onFilterChange: (updates: Record<string, string>) => void;
}

export function PortfolioGrid({ filters, onFilterChange }: PortfolioGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [searchInput, setSearchInput] = useState(filters.search);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const navigate = useNavigate();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 4
          ? [...prev, id]
          : prev,
    );
  };

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchStatus =
        !filters.status || filters.status === 'All'
          ? true
          : p.status === filters.status;
      const matchLocation = !filters.location
        ? true
        : p.location === filters.location;
      const matchSearch = !filters.search
        ? true
        : p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.location.toLowerCase().includes(filters.search.toLowerCase());
      return matchStatus && matchLocation && matchSearch;
    });
  }, [filters.status, filters.location, filters.search]);

  const handleSearchInput = (value: string) => {
    setSearchInput(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFilterChange({ search: value });
    }, 250);
  };

  const handleFilterClick = (f: StatusFilter) => {
    const newStatus = f === 'All' ? '' : f;
    onFilterChange({ status: newStatus });
  };

  const activeStatus: StatusFilter = (filters.status as StatusFilter) || 'All';

  const hasActiveFilters = filters.status || filters.location || filters.search;

  return (
    <section
      ref={sectionRef}
      className={`bg-surface py-12 md:py-16 ${selectedIds.length >= 2 ? 'pb-28 md:pb-32' : ''}`}
    >
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='mb-8 flex items-center justify-between'>
          <span className='text-body-sm font-medium text-on-surface-variant'>
            {allProjects.length} Total Projects
          </span>
          {hasActiveFilters && (
            <button
              type='button'
              onClick={() => {
                setSearchInput('');
                onFilterChange({ status: '', location: '', search: '' });
              }}
              className='flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase transition-colors hover:text-secondary-fixed-dim'
            >
              <X className='h-3 w-3' />
              Clear Filters
            </button>
          )}
        </div>

        <div className='mb-10 space-y-4 border-b border-outline-variant pb-4'>
          {/* Row 1: Status filter buttons */}
          <div className='flex flex-wrap gap-2'>
            {statusFilters.map((f) => (
              <button
                key={f}
                type='button'
                onClick={() => handleFilterClick(f)}
                className={`rounded-sm px-4 py-2 text-label font-medium tracking-widest uppercase transition-colors ${
                  activeStatus === f
                    ? 'bg-secondary text-on-secondary'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Row 2: Location + Search */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='relative flex-1'>
              <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline' />
              <input
                type='text'
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder='Search projects...'
                className='w-full rounded-sm border border-outline-variant bg-surface py-2 pl-9 pr-3 text-sm text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary'
              />
            </div>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className='rounded-sm border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface outline-none transition-colors focus:border-secondary'
            >
              <option value=''>All Locations</option>
              {ALL_LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className='py-20 text-center'>
            <p className='text-lg font-serif text-on-surface-variant'>
              No projects match your filters
            </p>
            <p className='mt-2 text-sm text-on-surface-variant/70'>
              Try different keywords, status, or location
            </p>
            <button
              type='button'
              onClick={() => {
                setSearchInput('');
                onFilterChange({ status: '', location: '', search: '' });
              }}
              className='mt-4 inline-flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase transition-colors hover:text-secondary-fixed-dim'
            >
              <X className='h-3 w-3' />
              Clear Filters
            </button>
            <div className='mx-auto mt-12 max-w-lg border-t border-outline-variant pt-8'>
              <p className='mb-6 text-caption font-medium tracking-[0.15em] text-on-surface-variant uppercase'>
                Featured Projects
              </p>
              <div className='flex flex-col gap-4'>
                {allProjects.slice(0, 3).map((p) => (
                  <Link
                    key={p.id}
                    to='/portfolio/$slug'
                    params={{ slug: p.slug }}
                    onClick={() => {
                      setSearchInput('');
                      onFilterChange({ status: '', location: '', search: '' });
                    }}
                    className='group flex items-center gap-4 rounded-sm border border-outline-variant p-4 text-left transition-colors hover:border-secondary'
                  >
                    <div className='h-14 w-14 shrink-0 overflow-hidden rounded-sm'>
                      <Image
                        src={p.image}
                        alt=''
                        layout='fullWidth'
                        height={56}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='font-serif text-sm text-on-surface group-hover:text-secondary transition-colors'>
                        {p.title}
                      </p>
                      <p className='mt-0.5 text-xs text-on-surface-variant/70'>
                        {p.location}
                      </p>
                    </div>
                    <ArrowRight
                      size={14}
                      className='shrink-0 text-on-surface-variant transition-colors group-hover:text-secondary'
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filtered.map((project) => (
              <div key={project.id} className='relative'>
                <button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSelect(project.id);
                  }}
                  className={`absolute left-3 top-3 z-20 flex h-6 w-6 items-center justify-center rounded-sm border-2 transition-colors ${
                    selectedIds.includes(project.id)
                      ? 'border-secondary bg-secondary'
                      : 'border-white/60 bg-white/10 hover:border-white'
                  }`}
                  aria-label={
                    selectedIds.includes(project.id)
                      ? `Remove ${project.title} from comparison`
                      : `Add ${project.title} to comparison`
                  }
                >
                  {selectedIds.includes(project.id) && (
                    <Check size={14} className='text-on-secondary' />
                  )}
                </button>

                <Link
                  to='/portfolio/$slug'
                  params={{ slug: project.slug }}
                  className='block'
                >
                  <div className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'>
                    <div className='absolute inset-0 overflow-hidden transition-all duration-[600ms] group-hover:scale-105'>
                      <Image
                        src={project.image}
                        alt=''
                        layout='fullWidth'
                        height={400}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
                    <div className='absolute right-3 top-3'>
                      <span
                        className={`rounded-sm border px-2.5 py-1 text-caption font-medium tracking-widest uppercase ${statusColors[project.status] ?? ''}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3 className='text-lg font-serif text-white'>
                        {project.title}
                      </h3>
                      <p className='mt-1 text-sm text-white/60'>
                        {project.location}
                      </p>
                      <p className='mt-0.5 text-label text-white/40'>
                        {project.date}
                      </p>
                      <div className='mt-3 flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
                        View Landmark
                        <ArrowRight size={14} aria-hidden='true' />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className='mt-10 text-center'>
          <p className='text-body-sm text-on-surface-variant'>
            Viewing {filtered.length} of {allProjects.length} projects
          </p>
        </div>
      </div>

      {selectedIds.length >= 2 && (
        <div className='fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant bg-surface p-4 shadow-lg md:p-5'>
          <div className='mx-auto flex max-w-360 items-center justify-between px-4 md:px-16'>
            <p className='text-sm text-on-surface-variant'>
              <span className='font-semibold text-secondary'>
                {selectedIds.length}
              </span>{' '}
              project{selectedIds.length > 1 ? 's' : ''} selected
            </p>
            <button
              type='button'
              onClick={() =>
                navigate({
                  to: '/portfolio/compare',
                  search: { ids: selectedIds.join(',') },
                })
              }
              className='rounded-sm bg-secondary px-6 py-3 text-label font-medium tracking-widest text-on-secondary uppercase transition-colors hover:opacity-90'
            >
              Compare
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
