import {
  IconBeach,
  IconBell,
  IconBuildingArch,
  IconCoffee,
  IconDeviceMobile,
  IconDumbbell,
  IconLeaf,
  IconMoonStars,
  IconParking,
  IconPool,
  IconSailboat,
  IconSeedling,
  IconShieldLock,
  IconSnowflake,
  IconTree,
  IconWifi,
} from '@tabler/icons-react';
import { useEffect, useRef } from 'react';
import type { ProjectDetail } from '@/content/projects';
import { gsap, MOTION } from '@/lib/gsap';

const iconMap: Record<string, typeof IconLeaf> = {
  dark_mode: IconMoonStars,
  ac_unit: IconSnowflake,
  security: IconShieldLock,
  spa: IconLeaf,
  deck: IconBeach,
  local_parking: IconParking,
  wifi: IconWifi,
  fitness_center: IconDumbbell,
  pool: IconPool,
  directions_boat: IconSailboat,
  local_cafe: IconCoffee,
  nature: IconTree,
  smartphone: IconDeviceMobile,
  architecture: IconBuildingArch,
  concierge: IconBell,
};

export function PortfolioDetailAmenities({
  amenities,
}: {
  amenities: ProjectDetail['amenities'];
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!MOTION) return;

    const ctx = gsap.context(() => {
      gsap.from(Array.from(headingRef.current?.children ?? []), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      });

      gsap.from(Array.from(gridRef.current?.children ?? []), {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        scrollTrigger: {
          trigger: gridRef.current,
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
      className='relative bg-surface-brand py-32 overflow-hidden'
    >
      {/* Corner accents */}
      <div className='absolute top-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute top-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute top-0 right-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 left-0 w-px h-10 bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-10 h-px bg-custom/30' />
      <div className='absolute bottom-0 right-0 w-px h-10 bg-custom/30' />

      <div className='site-wrapper'>
        <div
          ref={headingRef}
          className='detail-amenities__heading mb-24 max-w-2xl'
        >
          <h2 className='mb-6 text-3xl font-serif text-white md:text-4xl lg:text-5xl'>
            Elevating the <br />
            Daily Experience
          </h2>
          <p className='text-base leading-relaxed text-white/55 md:text-lg'>
            We have curated a selection of amenities that mirror the needs of a
            global citizen, focusing on wellness, security, and effortless
            service.
          </p>
        </div>
        <div
          ref={gridRef}
          className='grid gap-12 md:grid-cols-2 lg:grid-cols-4'
        >
          {amenities.map((a) => {
            const Icon = iconMap[a.icon] ?? IconSeedling;
            return (
              <div
                key={a.title}
                className='detail-amenities__card border-l border-white/6 py-4 pl-8'
              >
                <Icon size={36} stroke={1.5} className='mb-6 text-custom' />
                <h3 className='mb-4 font-serif text-xl text-white md:text-2xl'>
                  {a.title}
                </h3>
                <p className='text-sm leading-relaxed text-white/55 md:text-base'>
                  {a.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
