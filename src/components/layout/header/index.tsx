import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import DesktopNav from './desktop-nav';
import Logo from './logo';
import MobileMenu from './mobile-menu';

export default function Header() {
  return (
    <header>
      <div className='mx-auto flex max-w-360 items-center justify-between px-4 py-3 md:px-16 md:py-4'>
        {/* Logo */}
        <Logo />

        {/* Desktop navigation — centered */}
        <div className='hidden md:flex md:flex-1 md:justify-center'>
          <DesktopNav />
        </div>

        {/* Right actions */}
        <div className='flex flex-none items-center justify-end gap-3'>
          {/* Bronze CTA — "Enquire" button, hidden on smallest screens */}
          <Button asChild className='hidden sm:inline-flex'>
            <Link to='/contact' className='text-white'>
              Let's Talk
            </Link>
          </Button>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
