'use client';

import { Link } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { loadGsap } from '@/lib/gsap-loader';

const STORAGE_KEY = 'cookie-consent-v1';

type ConsentStatus = 'accepted' | 'rejected' | null;

function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY) as ConsentStatus;
}

function setStoredConsent(status: ConsentStatus) {
  if (status) {
    localStorage.setItem(STORAGE_KEY, status);
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function CookieConsentBanner() {
  const [consent, setConsent] = useState<ConsentStatus>(getStoredConsent);
  const [show, setShow] = useState(consent === null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    const el = bannerRef.current;
    if (!el) return;

    loadGsap().then(({ gsap }) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      );
    });
  }, [show]);

  const accept = useCallback(() => {
    setStoredConsent('accepted');
    setConsent('accepted');
    setShow(false);
  }, []);

  const reject = useCallback(() => {
    setStoredConsent('rejected');
    setConsent('rejected');
    setShow(false);
  }, []);

  return (
    <>
      {consent === 'accepted' && <Analytics />}

      {show && (
        <div
          ref={bannerRef}
          role='dialog'
          aria-label='Cookie consent'
          className='fixed inset-x-0 bottom-0 z-[100] border-t border-outline-variant bg-surface p-4 shadow-lg md:p-6'
        >
          <div className='mx-auto flex max-w-360 flex-col items-start gap-4 md:flex-row md:items-center md:gap-6'>
            <p className='flex-1 text-sm leading-relaxed text-on-surface-variant'>
              We use cookies to understand how you use our site and to improve
              your experience.{' '}
              <Link
                to='/privacy'
                className='text-secondary underline underline-offset-2 transition-colors hover:text-secondary-fixed-dim'
              >
                Learn more
              </Link>
            </p>
            <div className='flex shrink-0 gap-3'>
              <button
                type='button'
                onClick={reject}
                className='rounded-sm border border-outline-variant px-5 py-2.5 text-label font-medium tracking-wider text-on-surface uppercase transition-colors hover:border-secondary hover:text-secondary'
              >
                Reject
              </button>
              <button
                type='button'
                onClick={accept}
                className='rounded-sm bg-secondary px-5 py-2.5 text-label font-medium tracking-wider text-on-secondary uppercase transition-colors hover:opacity-90'
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
