import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useRef } from 'react';
import type { Project } from '@/content/projects';

interface CompareTableProps {
  projects: Project[];
}

const labelClass =
  'text-[10px] font-medium tracking-widest text-custom uppercase';

function cellClass(highlight?: boolean) {
  return `p-4 text-sm leading-relaxed text-foreground ${
    highlight ? 'bg-custom/5' : ''
  }`;
}

export function CompareTable({ projects }: CompareTableProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className='overflow-x-auto'>
      <table className='w-full min-w-[600px] border-collapse'>
        <thead>
          <tr className='border-b border-border'>
            <th className='sticky left-0 z-10 min-w-28 bg-white p-4 text-left text-[10px] font-medium tracking-widest text-custom uppercase'>
              Feature
            </th>
            {projects.map((p) => (
              <th key={p.id} className='min-w-44 p-4 text-left'>
                <Link
                  to='/portfolio/$slug'
                  params={{ slug: p.slug }}
                  className='group block'
                >
                  <div className='mb-3 aspect-4/3 overflow-hidden rounded-sm'>
                    <Image
                      src={p.image}
                      alt=''
                      layout='fullWidth'
                      height={225}
                      className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                    />
                  </div>
                  <h3 className='font-serif text-base text-foreground transition-colors group-hover:text-custom md:text-lg'>
                    {p.title}
                  </h3>
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <CompareRow
            label='Status'
            values={projects.map((p) => p.status)}
            keys={projects.map((p) => `status-${p.id}`)}
          />
          <CompareRow
            label='Location'
            values={projects.map((p) => p.location)}
            keys={projects.map((p) => `location-${p.id}`)}
          />
          <CompareRow
            label='Total Area'
            values={projects.map((p) => p.detail?.specs.totalArea)}
            keys={projects.map((p) => `area-${p.id}`)}
          />
          <CompareRow
            label='Units'
            values={projects.map((p) => p.detail?.specs.units)}
            keys={projects.map((p) => `units-${p.id}`)}
          />
          <CompareRow
            label='Floor Count'
            values={projects.map((p) => p.detail?.specs.floorCount)}
            keys={projects.map((p) => `floors-${p.id}`)}
          />
          <CompareRow
            label='Completion'
            values={projects.map((p) => p.detail?.specs.completion ?? p.date)}
            keys={projects.map((p) => `completion-${p.id}`)}
          />
          <CompareRow
            label='Amenities'
            values={projects.map(
              (p) =>
                `${p.detail?.amenities.length ?? 0} amenit${(p.detail?.amenities.length ?? 0) === 1 ? 'y' : 'ies'}`,
            )}
            keys={projects.map((p) => `amenities-${p.id}`)}
          />
          <tr className='compare-table__row border-b border-border'>
            <td className={`${labelClass} sticky left-0 z-10 bg-white p-4`}>
              Key Highlights
            </td>
            {projects.map((p) => (
              <td key={p.id} className={cellClass()}>
                {p.detail ? (
                  <ul className='space-y-1'>
                    {p.detail.amenities.slice(0, 3).map((a) => (
                      <li key={a.title} className='flex items-start gap-2'>
                        <span className='mt-1 h-1 w-1 shrink-0 rounded-full bg-custom' />
                        <span>{a.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className='text-muted-foreground'>—</span>
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function CompareRow({
  label,
  values,
  keys,
}: {
  label: string;
  values: (string | undefined)[];
  keys: string[];
}) {
  const unique = new Set(values.filter(Boolean));
  return (
    <tr className='compare-table__row border-b border-border'>
      <td className={`${labelClass} sticky left-0 z-10 bg-white p-4`}>
        {label}
      </td>
      {values.map((val, colIdx) => (
        <td key={keys[colIdx]} className={cellClass(unique.size > 1)}>
          {val ?? '—'}
        </td>
      ))}
    </tr>
  );
}
