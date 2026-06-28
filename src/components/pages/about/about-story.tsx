import { SectionHeading } from '@/components/ui/section-heading';

const MILESTONES = [
  {
    year: '2008',
    title: 'Founded',
    description:
      'Shaon Landmarks & Housing was established with a single vision: to redefine the real estate landscape of Bangladesh through transparency and architectural innovation.',
  },
  {
    year: '2012',
    title: 'First Landmark Delivered',
    description:
      'Completed our first residential project, setting the standard for build quality and timely handover that would become our hallmark.',
  },
  {
    year: '2016',
    title: '10 Projects Milestone',
    description:
      'Reached a decade of expertise with 10 completed projects, earning the trust of hundreds of families across Dhaka.',
  },
  {
    year: '2020',
    title: 'REHAB Membership',
    description:
      'Joined the Real Estate & Housing Association of Bangladesh, reinforcing our commitment to ethical practices and industry standards.',
  },
  {
    year: '2024',
    title: '48+ Projects & Growing',
    description:
      'Expanded our portfolio to over 48 landmark projects, serving more than 500 families with uncompromising quality.',
  },
];

export function AboutStory() {
  return (
    <section className='bg-white py-24 border-t border-border'>
      <div className='site-wrapper'>
        <SectionHeading
          eyebrow='Our Journey'
          heading='Built on'
          highlight='Experience'
          headingClassName='text-[clamp(2rem,4vw,3rem)]'
          className='mb-16'
        />

        <div className='relative pl-8 md:pl-0 md:max-w-3xl md:mx-auto'>
          <div className='absolute left-3 md:left-1/2 top-2 bottom-2 w-px bg-border md:-translate-x-px' />

          <div className='space-y-16'>
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className='relative grid md:grid-cols-2 gap-4 md:gap-12 items-start'
              >
                <div className='md:text-right md:pr-12 hidden md:block'>
                  <span className='font-serif text-[clamp(1.2rem,2vw,1.6rem)] text-custom font-light'>
                    {m.year}
                  </span>
                </div>

                <div className='pl-8 md:pl-12'>
                  <div className='absolute left-[3px] md:left-1/2 w-[18px] h-[18px] rounded-full bg-custom border-[3px] border-white -translate-x-1/2 top-0.5 shadow-sm' />

                  <span className='font-serif text-lg text-custom font-light md:hidden mb-1 block'>
                    {m.year}
                  </span>
                  <h3 className='font-serif text-xl font-light text-foreground'>
                    {m.title}
                  </h3>
                  <p className='text-sm leading-relaxed text-muted-foreground mt-3 max-w-md'>
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
