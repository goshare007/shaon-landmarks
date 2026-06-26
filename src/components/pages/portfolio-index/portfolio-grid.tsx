import {
  IconArrowRight,
  IconCheck,
  IconSearch,
  IconX,
} from '@tabler/icons-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useMemo, useRef, useState } from 'react';
import { allProjects } from '@/content/projects';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.portfolio-grid__filter > *', {
        y: 12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.portfolio-grid__card', {
        y: 24,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
      className={`bg-surface-raised py-12 md:py-16 ${selectedIds.length >= 2 ? 'pb-28 md:pb-32' : ''}`}
    >
      <div className='container'>
        <div className='portfolio-grid__filter mb-8 flex items-center justify-between'>
          <span className='text-sm text-muted-foreground'>
            {allProjects.length} Total Projects
          </span>
          {hasActiveFilters && (
            <button
              type='button'
              onClick={() => {
                setSearchInput('');
                onFilterChange({ status: '', location: '', search: '' });
              }}
              className='flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase transition-colors hover:text-custom/80'
            >
              <IconX size={14} />
              Clear Filters
            </button>
          )}
        </div>

        <div className='mb-10 space-y-4 border-b border-border pb-4'>
          {/* Row 1: Status filter buttons */}
          <div className='flex flex-wrap gap-2'>
            {statusFilters.map((f) => (
              <button
                key={f}
                type='button'
                onClick={() => handleFilterClick(f)}
                className={`rounded-sm px-4 py-2 text-[10px] font-medium tracking-[0.15em] uppercase transition-colors ${
                  activeStatus === f
                    ? 'bg-custom text-white'
                    : 'text-muted-foreground hover:text-custom'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Row 2: Location + Search */}
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
            <div className='relative flex-1'>
              <IconSearch
                size={16}
                className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'
              />
              <input
                type='text'
                value={searchInput}
                onChange={(e) => handleSearchInput(e.target.value)}
                placeholder='Search projects...'
                className='w-full rounded-sm border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-custom'
              />
            </div>
            <select
              value={filters.location}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              className='rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-custom'
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
            <p className='text-lg font-serif text-muted-foreground'>
              No projects match your filters
            </p>
            <p className='mt-2 text-sm text-muted-foreground/70'>
              Try different keywords, status, or location
            </p>
            <button
              type='button'
              onClick={() => {
                setSearchInput('');
                onFilterChange({ status: '', location: '', search: '' });
              }}
              className='mt-4 inline-flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase transition-colors hover:text-custom/80'
            >
              <IconX size={14} />
              Clear Filters
            </button>
            <div className='mx-auto mt-12 max-w-lg border-t border-border pt-8'>
              <p className='mb-6 text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase'>
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
                    className='portfolio-grid__card group flex items-center gap-4 rounded-sm border border-border p-4 text-left transition-colors hover:border-custom'
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
                      <p className='font-serif text-sm text-foreground transition-colors group-hover:text-custom'>
                        {p.title}
                      </p>
                      <p className='mt-0.5 text-xs text-muted-foreground/70'>
                        {p.location}
                      </p>
                    </div>
                    <IconArrowRight
                      size={14}
                      className='shrink-0 text-muted-foreground transition-colors group-hover:text-custom'
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {filtered.map((project) => (
              <div key={project.id} className='portfolio-grid__card relative'>
                <button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSelect(project.id);
                  }}
                  className={`absolute left-3 top-3 z-20 flex h-6 w-6 items-center justify-center rounded-sm border-2 transition-colors ${
                    selectedIds.includes(project.id)
                      ? 'border-custom bg-custom'
                      : 'border-white/60 bg-white/10 hover:border-white'
                  }`}
                  aria-label={
                    selectedIds.includes(project.id)
                      ? `Remove ${project.title} from comparison`
                      : `Add ${project.title} to comparison`
                  }
                >
                  {selectedIds.includes(project.id) && (
                    <IconCheck size={14} className='text-white' />
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
                      <div className='mt-3 flex items-center gap-1 text-[10px] font-medium tracking-[0.15em] text-custom uppercase opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0'>
                        View Landmark
                        <IconArrowRight size={14} aria-hidden='true' />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className='mt-10 text-center'>
          <p className='text-sm text-muted-foreground'>
            Viewing {filtered.length} of {allProjects.length} projects
          </p>
        </div>
      </div>

      {selectedIds.length >= 2 && (
        <div className='fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white p-4 shadow-lg md:p-5'>
          <div className='mx-auto flex container items-center justify-between'>
            <p className='text-sm text-muted-foreground'>
              <span className='font-semibold text-custom'>
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
              className='rounded-sm bg-custom px-6 py-3 text-[10px] font-medium tracking-[0.15em] text-white uppercase transition-colors hover:opacity-90'
            >
              Compare
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
