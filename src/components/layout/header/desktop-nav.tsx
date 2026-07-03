import { Link, useLocation } from '@tanstack/react-router';
import { navItems } from '@/content/navigation';
import { cn } from '@/lib/utils';

export default function DesktopNav() {
  const { pathname } = useLocation();

  return (
    <nav className='flex items-center'>
      <ul className='flex items-center gap-0'>
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className='group'>
              <Link
                to={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative inline-flex items-center gap-1.5 px-4 py-2  font-medium  tracking-[0.12em] transition-colors duration-200',
                  isActive
                    ? 'text-custom'
                    : 'text-muted-foreground hover:text-custom',
                )}
              >
                {item.label}

                {/* Active indicator — architectural 1.5px line */}
                <span
                  className={cn(
                    'absolute bottom-0 left-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-custom transition-all duration-200',
                    isActive
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-50',
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
