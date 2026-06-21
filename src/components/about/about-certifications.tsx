import { DynamicIcon } from '@/lib/icon-map';

const CERTIFICATIONS = [
  { icon: 'verified', label: 'RAJUK Certified' },
  { icon: 'handshake', label: 'REHAB Member' },
  { icon: 'workspace_premium', label: 'ISO 9001:2015' },
];

export function AboutCertifications() {
  return (
    <section className='bg-surface-container py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='flex flex-col items-center justify-between gap-12 border-y border-outline-variant py-16 md:flex-row'>
          <div className='max-w-md text-center md:text-left'>
            <h2 className='mb-4 text-3xl font-serif'>Certified Excellence</h2>
            <p className='text-sm leading-relaxed text-on-surface-variant'>
              We adhere to the highest regulatory standards in Bangladesh,
              ensuring every development is legal, secure, and built to last.
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-16 opacity-70 transition-opacity hover:opacity-100'>
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.label}
                className='flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-1'
              >
                <div className='flex h-24 w-24 items-center justify-center border border-outline-variant bg-white'>
                  <DynamicIcon
                    name={cert.icon}
                    size={40}
                    className='text-[#000000]'
                  />
                </div>
                <span className='text-label font-medium tracking-widest text-on-surface uppercase'>
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
