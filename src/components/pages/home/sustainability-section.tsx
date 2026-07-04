import { IconLeaf, IconSolarPanel, IconTree } from '@tabler/icons-react';
import { Image } from '@unpic/react';
import { useEffect, useRef } from 'react';
import energyEfficiency from '@/assets/images/sustainability/energy-efficiency.webp';
import greenSpaces from '@/assets/images/sustainability/green-spaces.webp';
import sustainableMaterials from '@/assets/images/sustainability/sustainable-materials.webp';
import { SectionHeading } from '@/components/ui/section-heading';
import { gsap, MOTION } from '@/lib/gsap';

const sustainabilityData = [
  {
    title: 'Sustainable Materials',
    description:
      'Sourcing eco-friendly materials that minimize environmental impact without compromising luxury.',
    image: sustainableMaterials,
    icon: <IconLeaf size={18} stroke={1.5} />,
    index: '01',
  },
  {
    title: 'Green Spaces',
    description:
      'Integrating lush landscapes and vertical gardens into every development for healthier urban living.',
    image: greenSpaces,
    icon: <IconTree size={18} stroke={1.5} />,
    index: '02',
  },
  {
    title: 'Energy Efficiency',
    description:
      'Smart building systems engineered to reduce energy consumption while maximizing comfort and air quality.',
    image: energyEfficiency,
    icon: <IconSolarPanel size={18} stroke={1.5} />,
    index: '03',
  },
];

export function SustainabilitySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(cardsRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className='bg-surface-container py-20 md:py-28 border-t border-border'
    >
      <div className='site-wrapper'>
        {/* Heading */}
        <div
          ref={headingRef}
          className='mb-14 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6'
        >
          <SectionHeading
            eyebrow='Sustainability & Innovation'
            heading='Building responsibly'
            highlight='for a better tomorrow.'
          />

          {/* Right-side stat pill — gives the heading row visual balance */}
          <div className='flex items-center gap-4 self-end md:self-auto'>
            <div className='flex flex-col items-end gap-1'>
              <span className='font-serif text-3xl font-light text-foreground leading-none'>
                40%
              </span>
              <span className='text-[10px] tracking-[0.18em] uppercase text-muted-foreground'>
                Lower carbon footprint
              </span>
            </div>
            <div className='w-px h-10 bg-border' />
            <div className='flex flex-col items-end gap-1'>
              <span className='font-serif text-3xl font-light text-foreground leading-none'>
                100%
              </span>
              <span className='text-[10px] tracking-[0.18em] uppercase text-muted-foreground'>
                RAJUK compliant
              </span>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className='grid gap-4 md:grid-cols-3'>
          {sustainabilityData.map((item) => (
            <div
              key={item.title}
              className='group relative min-h-88 md:min-h-104 overflow-hidden rounded-sm cursor-pointer'
            >
              {/* Image */}
              <div className='absolute inset-0'>
                <Image
                  src={item.image}
                  alt={item.title}
                  layout='fullWidth'
                  decoding='async'
                  width={900}
                  height={500}
                  loading='lazy'
                  className='h-full w-full object-cover transition-transform duration-900 ease-out group-hover:scale-[1.04]'
                />
              </div>

              {/* Gradient layers */}
              <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

              {/* Border overlay */}
              <div className='absolute inset-0 border border-white/[0.07] transition-colors duration-500 group-hover:border-brand/30 rounded-sm' />

              {/* Top-left: index */}
              <div className='absolute top-5 left-5'>
                <span className='font-serif text-[11px] tracking-[0.22em] text-white/25 uppercase'>
                  {item.index}
                </span>
              </div>

              {/* Top-right: icon pill */}
              <div
                className='absolute top-4 right-4 flex items-center justify-center w-9 h-9 rounded-sm border border-white/10 text-white/50 transition-all duration-300 group-hover:border-brand/40 group-hover:text-brand'
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(8px)',
                  willChange: 'transform',
                }}
              >
                {item.icon}
              </div>

              {/* Bottom content — slides up on hover */}
              <div className='absolute bottom-0 left-0 right-0 p-6 translate-y-1 transition-transform duration-300 group-hover:translate-y-0'>
                <h3 className='font-serif text-lg md:text-xl font-light text-white leading-snug'>
                  {item.title}
                </h3>

                {/* Gold rule expands on hover */}
                <div className='w-6 h-px bg-brand/50 mt-3 mb-0 transition-all duration-400 group-hover:w-10 group-hover:bg-brand' />

                {/* Description: hidden by default, revealed on hover */}
                <p className='mt-3 text-sm leading-relaxed text-white/60 max-h-0 overflow-hidden opacity-0 transition-all duration-400 ease-out group-hover:max-h-24 group-hover:opacity-100'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
