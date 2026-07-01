import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  highlight?: string;
  highlightStyle?: 'muted' | 'stroke';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  headingClassName?: string;
}

export const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  (
    {
      eyebrow,
      heading,
      highlight,
      highlightStyle = 'muted',
      align = 'left',
      as: Tag = 'h2',
      className,
      headingClassName,
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={className}>
        <div
          className={cn(
            'flex items-center gap-4 mb-5',
            align === 'center' && 'justify-center',
          )}
        >
          <div className='w-8 h-px bg-custom' />
          <span className='text-[10px] font-medium tracking-[0.22em] uppercase text-custom'>
            {eyebrow}
          </span>
          {align === 'center' && <div className='w-8 h-px bg-custom' />}
        </div>
        <Tag
          className={cn(
            'font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-tight',
            align === 'center' && 'text-center',
            headingClassName,
          )}
        >
          {heading}{' '}
          {highlight && highlightStyle === 'stroke' ? (
            <span
              className='italic'
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,255,255,0.28)',
              }}
            >
              {highlight}
            </span>
          ) : highlight ? (
            <span className='italic text-custom'>{highlight}</span>
          ) : null}
        </Tag>
      </div>
    );
  },
);

SectionHeading.displayName = 'SectionHeading';
