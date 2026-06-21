import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/navigation';
import { cn } from '@/lib/utils';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = '';
      return;
    }

    const previousActiveElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (e.key === 'Tab') {
        const focusableElements =
          navRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    const timer = window.setTimeout(() => {
      navRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className='relative z-50 flex h-8 w-8 items-center justify-center md:hidden'
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <div className='flex flex-col items-center justify-center gap-[4.5px]'>
          <span
            className={cn(
              'block h-[1.5px] w-5 bg-primary transition-all duration-300',
              open && 'translate-y-1.5 rotate-45',
            )}
          />
          <span
            className={cn(
              'block h-[1.5px] w-5 bg-primary transition-all duration-300',
              open && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block h-[1.5px] w-5 bg-primary transition-all duration-300',
              open && '-translate-y-1.5 -rotate-45',
            )}
          />
        </div>
      </button>

      {open && (
        <div className='fixed inset-0 z-40 flex items-center justify-center bg-surface px-4 animate-fade-in'>
          <nav>
            <ul ref={navRef} className='space-y-6 text-center'>
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'inline-block text-[28px] font-serif tracking-tight transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-secondary',
                        isActive
                          ? 'text-primary'
                          : 'text-on-surface-variant hover:text-primary',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
