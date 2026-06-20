'use client';

import { Link, useLocation } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { navItems } from '@/data/navigation';
import { loadGsap } from '@/lib/gsap-loader';
import { cn } from '@/lib/utils';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [renderOverlay, setRenderOverlay] = useState(false);
  const { pathname } = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setRenderOverlay(true);
    } else {
      const id = window.setTimeout(() => setRenderOverlay(false), 400);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  useEffect(() => {
    if (!renderOverlay) return;

    let killed = false;

    loadGsap().then(({ gsap }) => {
      if (killed || !overlayRef.current) return;

      if (open) {
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
        );
        tl.fromTo(
          navRef.current?.querySelectorAll('li') ?? [],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.08,
            ease: 'power3.out',
          },
          '-=0.1',
        );
      } else {
        const tl = gsap.timeline();
        tl.fromTo(
          navRef.current?.querySelectorAll('li') ?? [],
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: 24,
            duration: 0.2,
            stagger: 0.04,
            ease: 'power3.in',
          },
        );
        tl.to(overlayRef.current, { opacity: 0, duration: 0.15 }, '-=0.1');
      }
    });

    return () => {
      killed = true;
    };
  }, [open, renderOverlay]);

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
    }, 400);

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
        ref={toggleRef}
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

      {renderOverlay && (
        <div
          ref={overlayRef}
          className='fixed inset-0 z-40 flex items-center justify-center bg-surface px-4'
        >
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
