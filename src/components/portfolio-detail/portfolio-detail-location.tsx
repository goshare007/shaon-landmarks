import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import type { ProjectDetail } from '@/data/projects';

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
  return (
    <section className='bg-surface py-32'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid items-center gap-16 lg:grid-cols-12'>
          <div className='lg:col-span-5'>
            <h2 className='mb-8 text-3xl leading-tight font-serif text-primary md:text-4xl lg:text-5xl'>
              The Heart of <br />
              Modern Prestige
            </h2>
            <p className='mb-12 text-base leading-relaxed text-on-surface-variant md:text-lg'>
              {location.description}
            </p>
            <div className='space-y-8'>
              {location.points.map((point) => (
                <div key={point.number} className='flex items-start gap-6'>
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
          <div className='relative z-0 h-150 overflow-hidden lg:col-span-7'>
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
