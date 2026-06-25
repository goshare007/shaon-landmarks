import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { Link, useLocation } from '@tanstack/react-router';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navItems } from '@/content/navigation';
import { cn } from '@/lib/utils';
import Logo from './logo';

export default function MobileMenu() {
  const { pathname } = useLocation();

  return (
    <div className='md:hidden'>
      <Sheet>
        <SheetTrigger
          render={
            <Button variant='outline' aria-label='Open menu'>
              <IconAdjustmentsHorizontal />
            </Button>
          }
        />
        <SheetContent>
          <SheetHeader>
            <Logo />
          </SheetHeader>

          <hr className='mx-4 border-t' />

          <nav className='flex flex-col gap-1 px-4'>
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <SheetClose
                  key={item.href}
                  render={
                    <Link
                      to={item.href}
                      className={cn(
                        'border-l-2 px-4 py-3 font-medium tracking-[0.12em] transition-colors duration-200',
                        isActive
                          ? 'border-custom text-custom'
                          : 'border-transparent text-on-surface-variant hover:border-custom/50 hover:text-custom',
                      )}
                    >
                      {item.label}
                    </Link>
                  }
                />
              );
            })}
          </nav>

          <SheetFooter>
            <SheetClose
              render={
                <Link
                  to='/contact'
                  className={cn(
                    buttonVariants({ variant: 'custom', className: 'w-full' }),
                  )}
                >
                  Let's Talk
                </Link>
              }
            />
            <p className='text-center text-xs text-muted-foreground'>
              &copy; 2026 Shaon Landmarks
            </p>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
