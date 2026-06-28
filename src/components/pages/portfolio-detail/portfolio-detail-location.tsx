import L from 'leaflet';
import { useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { ProjectDetail } from '@/content/projects';

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

  return (
    <section ref={sectionRef} className='bg-white py-32'>
      <div className='container'>
        <div className='grid items-center gap-16 lg:grid-cols-12'>
          <div className='detail-location__text lg:col-span-5'>
            <h2 className='mb-8 text-3xl leading-tight font-serif text-foreground md:text-4xl lg:text-5xl'>
              The Heart of <br />
              Modern Prestige
            </h2>
            <p className='mb-12 text-base leading-relaxed text-muted-foreground md:text-lg'>
              {location.description}
            </p>
            <div className='space-y-8'>
              {location.points.map((point) => (
                <div key={point.number} className='flex items-start gap-6'>
                  <span className='text-[10px] font-medium tracking-widest text-custom'>
                    {point.number}.
                  </span>
                  <div>
                    <h4 className='mb-1 text-[10px] font-medium tracking-widest text-foreground uppercase'>
                      {point.title}
                    </h4>
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='detail-location__map relative z-0 h-150 overflow-hidden lg:col-span-7'>
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
