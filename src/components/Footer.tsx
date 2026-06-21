import { Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import logo from '@/assets/logo.png';
import { submitNewsletterSignup } from '@/lib/forms';
import { Button } from './ui/button';

const year = new Date().getFullYear();

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
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
      { label: 'Careers', href: '/career' },
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
        label: 'Twitter',
        href: 'https://twitter.com/shaonlandmarks',
        external: true,
      },
    ],
  },
];

export default function Footer() {
  const [newsletterState, setNewsletterState] = useState<{
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });

  async function handleNewsletterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewsletterState({ status: 'submitting', message: '' });

    const formData = new FormData(e.currentTarget);
    const email = (formData.get('newsletter-email') as string) || '';

    try {
      const result = await submitNewsletterSignup({ data: { email } });
      if (result.success) {
        setNewsletterState({
          status: 'success',
          message: result.message,
        });
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
    <footer className='border-t border-outline-variant/20 bg-tertiary'>
      <div className='mx-auto max-w-6xl px-4 py-16 md:py-24'>
        <div className='grid gap-12 md:gap-16 lg:grid-cols-5'>
          <div className='lg:col-span-2'>
            <Link to='/' className='inline-block group'>
              <div className='flex items-center gap-3 mb-6 transition-all duration-300 hover:scale-[1.02]'>
                <div className='h-12 w-12 rounded-lg bg-linear-to-br from-secondary via-secondary to-secondary-fixed-dim flex items-center justify-center font-serif font-bold text-tertiary text-lg'>
                  <Image
                    src={logo}
                    height={30}
                    width={20}
                    alt='Shaon'
                    className='h-8 w-8'
                  />
                </div>
                <div className='uppercase'>
                  <h3 className='font-serif text-lg font-light text-on-tertiary leading-tight'>
                    Shaon
                  </h3>
                  <p className='font-serif text-xs text-secondary-fixed-dim tracking-wider'>
                    LANDMARKS
                  </p>
                </div>
              </div>
            </Link>
            <p className='text-sm text-white/65 leading-relaxed mb-8'>
              Redefining the skyline through structural precision and unwavering
              aesthetic integrity since 2008. Transforming visions into
              architectural masterpieces.
            </p>
            <div>
              <label
                htmlFor='newsletter-email'
                className='text-xs font-medium text-secondary-fixed-dim uppercase tracking-widest mb-4 block'
              >
                Subscribe to Updates
              </label>
              <form onSubmit={handleNewsletterSubmit} className='space-y-3'>
                <div className='relative'>
                  <input
                    id='newsletter-email'
                    name='newsletter-email'
                    type='email'
                    required
                    placeholder='Enter your email'
                    aria-describedby='newsletter-form-status'
                    className='w-full bg-surface-container-low border border-outline-variant/30 text-black rounded-lg px-4 py-3 text-sm placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all'
                  />
                  <Button
                    type='submit'
                    disabled={newsletterState.status === 'submitting'}
                    variant='ghost'
                    className='absolute right-1.5 top-1/2 -translate-y-1/2 p-2 text-on-tertiary hover:text-secondary-fixed-dim disabled:opacity-50 transition-all duration-200 hover:scale-110 active:scale-95'
                  >
                    <ArrowRight className='text-black' />
                  </Button>
                </div>
                {newsletterState.message && (
                  <p
                    id='newsletter-form-status'
                    className={`text-xs ${
                      newsletterState.status === 'success'
                        ? 'text-emerald-500'
                        : 'text-red-500'
                    }`}
                  >
                    {newsletterState.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className='text-xs font-medium text-secondary-fixed-dim uppercase tracking-widest mb-6'>
                {section.title}
              </h4>
              <ul className='space-y-4'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-sm text-white/65 hover:text-secondary-fixed-dim transition-colors duration-300 group inline-flex items-center gap-2'
                      >
                        {link.label}
                        <span className='opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0'>
                          →
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className='text-sm text-white/65 hover:text-secondary-fixed-dim transition-colors duration-300 group inline-flex items-center gap-2'
                      >
                        {link.label}
                        <span className='opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0'>
                          →
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-outline-variant/20' />

      <div className='mx-auto max-w-6xl px-4 py-8 md:py-12'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
          <p className='text-xs text-white/65'>
            &copy; {year} Shaon Landmarks. Architectural Excellence. All Rights
            Reserved.
          </p>

          <div className='flex items-center gap-6'>
            {[
              {
                name: 'Facebook',
                href: 'https://facebook.com/shaonlandmarks',
                icon: (
                  <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4'
                  >
                    <title>Facebook</title>
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
                    className='w-4 h-4'
                  >
                    <title>Instagram</title>
                    <path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 15.892c-1.002 1.541-2.678 2.59-4.591 2.59-3.051 0-5.518-2.467-5.518-5.518 0-1.913 1.049-3.589 2.59-4.591.779-.506 1.704-.8 2.698-.8 3.051 0 5.518 2.467 5.518 5.518 0 .994-.294 1.919-.8 2.698zm-4.591-9.052c-1.974 0-3.575 1.601-3.575 3.575 0 1.974 1.601 3.575 3.575 3.575 1.974 0 3.575-1.601 3.575-3.575 0-1.974-1.601-3.575-3.575-3.575zm5.535-1.807c-.713 0-1.291.578-1.291 1.291s.578 1.291 1.291 1.291 1.291-.578 1.291-1.291-.578-1.291-1.291-1.291z' />
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
                    className='w-4 h-4'
                  >
                    <title>LinkedIn</title>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z' />
                  </svg>
                ),
              },
              {
                name: 'Twitter',
                href: 'https://twitter.com/shaonlandmarks',
                icon: (
                  <svg
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-4 h-4'
                  >
                    <title>Twitter</title>
                    <path d='M23.953 4.57a10 10 0 002.856-3.515 10 10 0 01-2.836.774 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={social.name}
                className='text-white/65 hover:text-secondary-fixed-dim transition-all duration-200 hover:scale-125 active:scale-95'
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
