import { Link } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DesktopNav from './desktop-nav';
import Logo from './logo';
import MobileMenu from './mobile-menu';

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY.current;

        if (currentScrollY <= 0) {
          setIsHidden(false);
          lastScrollY.current = 0;
          ticking.current = false;
          return;
        }

        if (Math.abs(delta) < 10) {
          ticking.current = false;
          return;
        }

        setIsHidden(delta > 0);

        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        'sticky top-0 z-50 bg-background transition-transform duration-300 border-b border-brand/10',
        isHidden ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <div className='site-wrapper flex items-center justify-between  py-3 md:py-4'>
        {/* Logo */}
        <Logo />

        {/* Desktop navigation — centered */}
        <div className='hidden md:flex md:flex-1 md:justify-center'>
          <DesktopNav />
        </div>

        {/* Right actions */}
        <div className='flex flex-none items-center justify-end gap-3'>
          {/* Bronze CTA — "Enquire" button, hidden on smallest screens */}

          <Link
            to='/contact'
            className={cn(
              buttonVariants({ size: 'lg', variant: 'brand' }),
              'hidden md:flex px-5',
            )}
          >
            Let's Talk
          </Link>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
