import {
  IconArrowRight,
  IconArrowUp,
  IconMail,
  IconPhone,
} from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { useEffect, useRef, useState } from 'react';
import logo from '@/assets/logo.webp';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/env';
import { gsap, MOTION } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { submitNewsletterSignup } from './newslatter';

const year = new Date().getFullYear();

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
  hideOnMobile?: boolean;
}

const footerSections: FooterSection[] = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Portfolio', href: '/portfolio' },
      { label: 'Blog', href: '/blog' },
      { label: 'EMI Calculator', href: '/emi-calculator' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'RAJUK Certified', href: '/legal' },
      { label: 'REHAB Member', href: '/legal' },
      { label: 'Legal Disclosures', href: '/legal' },
      { label: 'Privacy Policy', href: '/privacy' },
    ],
  },
  {
    title: 'Connect',
    hideOnMobile: true,
    links: [
      {
        label: 'Facebook',
        href: 'https://facebook.com/shaonlandmarks',
        external: true,
      },
      {
        label: 'Instagram',
        href: 'https://instagram.com/shaonlandmarks',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/company/shaonlandmarks',
        external: true,
      },
      {
        label: 'Twitter / X',
        href: 'https://twitter.com/shaonlandmarks',
        external: true,
      },
    ],
  },
];

const socialIcons = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/shaonlandmarks',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-4'
        aria-hidden='true'
      >
        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/shaonlandmarks',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-4'
        aria-hidden='true'
      >
        <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/shaonlandmarks',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-4'
        aria-hidden='true'
      >
        <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    href: 'https://twitter.com/shaonlandmarks',
    icon: (
      <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        className='size-4'
        aria-hidden='true'
      >
        <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.736-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
      </svg>
    ),
  },
];

export default function Footer() {
  const [newsletterState, setNewsletterState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  const footerRef = useRef<HTMLElement>(null);
  const brandColRef = useRef<HTMLDivElement>(null);
  const linkColsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Scroll-triggered footer reveal
  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      tl.from(brandColRef.current, { y: 24, opacity: 0, duration: 0.6 }, 0)
        .from(
          linkColsRef.current ? Array.from(linkColsRef.current.children) : [],
          { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
          0.1,
        )
        .from(bottomBarRef.current, { opacity: 0, duration: 0.5 }, 0.4);
    }, footerRef);

    return () => ctx.revert();
  }, []);

  // Back-to-top visibility, driven by scroll position
  useEffect(() => {
    const threshold = window.innerHeight * 0.75;

    function handleScroll() {
      setShowBackToTop(window.scrollY > threshold);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate the back-to-top button in/out as its visibility changes
  useEffect(() => {
    const el = backToTopRef.current;
    if (!el) return;

    if (!MOTION) {
      el.style.opacity = showBackToTop ? '1' : '0';
      el.style.pointerEvents = showBackToTop ? 'auto' : 'none';
      return;
    }

    gsap.to(el, {
      opacity: showBackToTop ? 1 : 0,
      y: showBackToTop ? 0 : 12,
      scale: showBackToTop ? 1 : 0.9,
      duration: 0.35,
      ease: 'power2.out',
      pointerEvents: showBackToTop ? 'auto' : 'none',
      overwrite: true,
    });
  }, [showBackToTop]);

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewsletterState({ status: 'submitting', message: '' });

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('newsletter-email') as string) || '';

    try {
      const result = await submitNewsletterSignup({ data: { email } });
      if (result.success) {
        setNewsletterState({ status: 'success', message: result.message });
        e.currentTarget.reset();
      } else {
        setNewsletterState({
          status: 'error',
          message: result.message || 'Subscription failed.',
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.';
      setNewsletterState({ status: 'error', message: errorMessage });
    }
  }

  return (
    <footer
      ref={footerRef}
      className='border-t border-white/6 bg-background dark-section'
    >
      {/* Main grid */}
      <div className='site-wrapper py-14 md:py-20'>
        <div className='grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-12'>
          {/* Brand column */}
          <div ref={brandColRef}>
            <p className='mb-5 text-[10px] font-medium uppercase tracking-[0.2em] text-brand'>
              Building Tomorrow, Today
            </p>

            <Link
              to='/'
              className='mb-6 inline-flex items-center gap-3.5 group'
            >
              <div className='flex size-11 items-center justify-center rounded-md border border-brand/20 bg-background dark-section transition-colors duration-300 group-hover:border-brand/40'>
                <Image
                  src={logo}
                  width={24}
                  height={28}
                  alt='Shaon Landmarks'
                  className='h-7 w-auto'
                  loading='lazy'
                />
              </div>
              <div>
                <p className='font-serif text-lg font-light uppercase leading-none tracking-[0.12em] text-neutral-50'>
                  Shaon
                </p>
                <p className='mt-0.5 text-[9px] uppercase tracking-[0.3em] text-brand'>
                  Landmarks
                </p>
              </div>
            </Link>

            <p className='mb-6 max-w-xs text-sm leading-relaxed text-neutral-400'>
              Redefining the skyline through structural precision and unwavering
              aesthetic integrity since 2008.
            </p>

            {/* Contact info */}
            <div className='mb-6 space-y-2 text-sm'>
              <a
                href={`tel:${CONTACT_PHONE}`}
                className='flex items-center gap-2 text-neutral-400 transition-colors duration-200 hover:text-brand'
              >
                <IconPhone className='size-3.5' aria-hidden='true' />
                {CONTACT_PHONE}
              </a>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className='flex items-center gap-2 text-neutral-400 transition-colors duration-200 hover:text-brand'
              >
                <IconMail className='size-3.5' aria-hidden='true' />
                {CONTACT_EMAIL}
              </a>
            </div>

            <div className='mb-6 h-px w-10 origin-left bg-brand opacity-40' />

            <div className='mb-8 flex flex-wrap items-center gap-2'>
              {['RAJUK Certified', 'REHAB Member'].map((badge) => (
                <span
                  key={badge}
                  className='rounded border border-white/7 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400'
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <label
                htmlFor='newsletter-email'
                className='mb-3 block text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400'
              >
                Stay updated
              </label>
              <form onSubmit={handleNewsletterSubmit}>
                <div className='flex items-center overflow-hidden rounded-lg border border-white/8 bg-background dark-section transition-colors duration-200 focus-within:border-brand/30'>
                  <Input
                    id='newsletter-email'
                    name='newsletter-email'
                    type='email'
                    required
                    placeholder='Your email address'
                    aria-describedby={
                      newsletterState.message ? 'newsletter-status' : undefined
                    }
                    className='min-w-0 flex-1 border-0 bg-transparent px-4 py-3 h-auto rounded-none text-sm text-neutral-200 placeholder:text-neutral-500 shadow-none focus-visible:ring-0 focus-visible:border-0'
                  />
                  <Button
                    type='submit'
                    variant='ghost'
                    size='icon'
                    disabled={newsletterState.status === 'submitting'}
                    aria-label='Subscribe'
                    className='h-11 w-11 shrink-0 rounded-none border-l border-white/6 text-neutral-400 hover:bg-transparent hover:text-brand disabled:opacity-40'
                  >
                    <IconArrowRight className='size-4' aria-hidden='true' />
                  </Button>
                </div>
                {newsletterState.message && (
                  <p
                    id='newsletter-status'
                    className={cn(
                      'margin-top-2.5 text-xs',
                      newsletterState.status === 'success'
                        ? 'text-emerald-400'
                        : 'text-red-400',
                    )}
                  >
                    {newsletterState.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div ref={linkColsRef} className='grid grid-cols-2 gap-8 lg:contents'>
            {footerSections.map((section, i) => (
              <div
                key={section.title}
                className={cn(section.hideOnMobile && 'hidden lg:block')}
              >
                <h4 className='mb-6 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400'>
                  {section.title}
                </h4>
                <ul className='space-y-3.5'>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='footer-link group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-200'
                        >
                          {link.label}
                          <span className='link-arrow -translate-x-1 text-xs opacity-0'>
                            ↗
                          </span>
                        </a>
                      ) : (
                        <Link
                          to={link.href}
                          className='footer-link group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors duration-200 hover:text-neutral-200'
                        >
                          {link.label}
                          <span className='link-arrow -translate-x-1 text-xs opacity-0'>
                            &rarr;
                          </span>
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {i === footerSections.length - 1 && (
                  <div className='mt-8 border-t border-white/5 pt-7'>
                    <h4 className='mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400'>
                      Office
                    </h4>
                    <p className='text-sm leading-relaxed text-neutral-400'>
                      Dhaka, Bangladesh
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div ref={bottomBarRef} className='border-t border-white/4'>
        <div className='site-wrapper py-6'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <p className='text-xs text-neutral-400'>
              &copy; {year}{' '}
              <span className='text-neutral-400'>Shaon Landmarks</span>. All
              rights reserved.
            </p>
            <div className='flex items-center gap-5'>
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.name}
                  className='social-icon text-neutral-400 transition-all duration-200 hover:text-brand'
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button nested nicely inside footer */}
      <Button
        ref={backToTopRef}
        type='button'
        variant='outline'
        size='icon'
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label='Back to top'
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
        className='fixed bottom-6 right-6 z-50 size-10 rounded-full border-white/10 bg-background dark-section text-neutral-300 shadow-lg backdrop-blur-sm hover:border-brand/30 hover:text-brand'
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <IconArrowUp className='size-4' aria-hidden='true' />
      </Button>
    </footer>
  );
}
