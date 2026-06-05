import { Link, useLocation } from '@tanstack/react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Home', href: '/' as const },
  { label: 'Portfolio', href: '/portfolio' as const },
  { label: 'Services', href: '/services' as const },
  { label: 'About', href: '/about' as const },
  { label: 'Contact', href: '/contact' as const },
] as const;

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      {/* Hamburger button — three architectural lines animating to X */}
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

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-40 flex items-center justify-center bg-surface px-4'
          >
            <nav>
              <ul className='space-y-6 text-center'>
                {navItems.map((item, i) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.08,
                        ease: [0.25, 0.1, 0.15, 1],
                      }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'inline-block text-[28px] font-serif tracking-tight transition-colors duration-200',
                          isActive
                            ? 'text-primary'
                            : 'text-on-surface-variant hover:text-primary',
                        )}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
