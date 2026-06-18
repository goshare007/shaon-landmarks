'use client';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { ProjectDetail } from '@/data/projects';
import { useGsapAnimation } from '@/hooks/use-gsap-animation';

const markerIcon = L.divIcon({
  className: '',
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#886a43;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3)"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
  popupAnchor: [0, -12],
});

export function PortfolioDetailLocation({
  location,
}: {
  location: ProjectDetail['location'];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGsapAnimation((gsap) => {
    const section = sectionRef.current;
    if (!section) return [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        section.querySelector('[data-location-text]'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      );

      tl.fromTo(
        section.querySelectorAll('[data-location-point]'),
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
        '-=0.3',
      );

      tl.fromTo(
        section.querySelector('[data-location-map]'),
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.5',
      );
    }, section);

    return [() => ctx.revert()];
  }, []);

  return (
    <section ref={sectionRef} className='bg-surface py-32'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-16 lg:grid-cols-12'>
          <div data-location-text className='lg:col-span-5'>
            <h2 className='mb-8 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
              The Heart of <br />
              Modern Prestige
            </h2>
            <p className='mb-12 text-base leading-relaxed text-on-surface-variant md:text-lg'>
              {location.description}
            </p>
            <div className='space-y-8'>
              {location.points.map((point) => (
                <div
                  key={point.number}
                  data-location-point
                  className='flex items-start gap-6'
                >
                  <span className='text-label font-medium tracking-widest text-secondary'>
                    {point.number}.
                  </span>
                  <div>
                    <h4 className='mb-1 text-label font-medium tracking-widest text-primary uppercase'>
                      {point.title}
                    </h4>
                    <p className='text-sm leading-relaxed text-on-surface-variant'>
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            data-location-map
            className='relative z-0 h-150 overflow-hidden lg:col-span-7'
          >
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              className='h-full w-full'
              zoomControl={false}
              dragging={false}
              scrollWheelZoom={false}
              attributionControl={false}
            >
              <TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
              <Marker position={[location.lat, location.lng]} icon={markerIcon}>
                <Popup>
                  <span className='text-sm font-medium'>Shaon Landmarks</span>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
