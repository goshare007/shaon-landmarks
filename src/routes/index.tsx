import { createFileRoute, Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import project3Img from '@/assets/images/projects/azure-waterfront.webp';
import project2Img from '@/assets/images/projects/the-obsidian.webp';
import project1Img from '@/assets/images/projects/the-skyline-plaza.webp';
import architectureImg from '@/assets/images/services/architecture.webp';
import constructionImg from '@/assets/images/services/construction.webp';
import heroImg from '@/assets/images/services/hero.webp';
import interiorImg from '@/assets/images/services/interior.webp';
import landDevImg from '@/assets/images/services/land-development.webp';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedProjects />
      <WhyChooseUs />
      <Testimonials />
      <CtaBanner />
    </main>
  );
}

function Hero() {
  return (
    <section className='relative flex min-h-[85svh] items-center overflow-hidden'>
      <Image
        src={heroImg}
        alt=''
        layout='fullWidth'
        className='absolute inset-0 size-full object-cover'
      />
      <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent' />
      <div className='container-main relative z-10'>
        <div className='max-w-2xl'>
          <span className='inline-block rounded-full border border-custom/40 px-4 py-1 text-xs font-medium uppercase tracking-widest text-custom'>
            Bangladesh&apos;s Premier Developer
          </span>
          <h1 className='mt-6 text-5xl font-bold leading-tight text-white md:text-7xl'>
            Building
            <span className='text-custom'> Landmarks</span>
            <br />
            That Define Cities
          </h1>
          <p className='mt-4 max-w-lg text-lg text-white/70'>
            From visionary architecture to enduring structures — we create
            spaces that inspire, communities that thrive, and icons that stand
            the test of time.
          </p>
          <div className='mt-8 flex flex-wrap gap-4'>
            <Link
              to='/portfolio'
              className={cn(
                buttonVariants({
                  variant: 'custom',
                  size: 'lg',
                  className: 'px-8',
                }),
              )}
            >
              View Our Work
            </Link>
            <Link
              to='/contact'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className:
                    'border-white/30 text-white hover:bg-white/10 hover:text-white px-8',
                }),
              )}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: 'Architecture',
    description:
      "Award-winning design that blends modern aesthetics with functional living, tailored to Bangladesh's unique urban landscape.",
    image: architectureImg,
  },
  {
    title: 'Construction',
    description:
      'End-to-end construction management with uncompromising quality standards, delivered on time and on budget.',
    image: constructionImg,
  },
  {
    title: 'Land Development',
    description:
      'Strategic land acquisition and development, transforming raw parcels into thriving residential and commercial communities.',
    image: landDevImg,
  },
  {
    title: 'Interior Design',
    description:
      'Thoughtful interior spaces that reflect your vision, combining comfort, elegance, and practical sophistication.',
    image: interiorImg,
  },
];

function Services() {
  return (
    <section className='bg-muted/30 py-24'>
      <div className='container-main'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-medium uppercase tracking-[0.2em] text-custom'>
            What We Do
          </span>
          <h2 className='mt-3 text-4xl font-bold tracking-tight md:text-5xl'>
            Full-Service Real Estate
            <br />
            <span className='text-custom'>Excellence</span>
          </h2>
          <p className='mt-4 text-muted-foreground'>
            Every project begins with a deep understanding of the land, the
            community, and the vision. Here&apos;s how we bring it to life.
          </p>
        </div>

        <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {services.map((s) => (
            <div
              key={s.title}
              className='group overflow-hidden rounded-xl bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
            >
              <div className='aspect-[4/3] overflow-hidden'>
                <Image
                  src={s.image}
                  alt={s.title}
                  layout='fullWidth'
                  className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-lg font-semibold'>{s.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projects = [
  {
    title: 'The Skyline Plaza',
    tag: 'Commercial',
    location: 'Gulshan, Dhaka',
    image: project1Img,
  },
  {
    title: 'The Obsidian',
    tag: 'Residential',
    location: 'Banani, Dhaka',
    image: project2Img,
  },
  {
    title: 'Azure Waterfront',
    tag: 'Mixed-Use',
    location: 'Cox&apos;s Bazar',
    image: project3Img,
  },
];

function FeaturedProjects() {
  return (
    <section className='py-24'>
      <div className='container-main'>
        <div className='flex items-end justify-between'>
          <div>
            <span className='text-xs font-medium uppercase tracking-[0.2em] text-custom'>
              Our Portfolio
            </span>
            <h2 className='mt-3 text-4xl font-bold tracking-tight md:text-5xl'>
              Featured
              <span className='text-custom'> Landmarks</span>
            </h2>
          </div>
          <Link
            to='/portfolio'
            className={cn(
              buttonVariants({
                variant: 'link',
                className: 'hidden md:inline-flex',
              }),
            )}
          >
            View All Projects &rarr;
          </Link>
        </div>

        <div className='mt-12 grid gap-8 md:grid-cols-3'>
          {projects.map((p) => (
            <Link
              key={p.title}
              to='/portfolio'
              className='group overflow-hidden rounded-xl bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md'
            >
              <div className='aspect-[4/3] overflow-hidden'>
                <Image
                  src={p.image}
                  alt={p.title}
                  layout='fullWidth'
                  className='size-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <div className='p-6'>
                <span className='text-xs font-medium uppercase tracking-wider text-custom'>
                  {p.tag}
                </span>
                <h3 className='mt-1 text-lg font-semibold'>{p.title}</h3>
                <p className='mt-1 text-sm text-muted-foreground'>
                  {p.location}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-8 text-center md:hidden'>
          <Link
            to='/portfolio'
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            View All Projects &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: '25+', label: 'Years Experience' },
  { value: '120+', label: 'Projects Delivered' },
  { value: '8,500+', label: 'Families Served' },
  { value: '15+', label: 'Design Awards' },
];

const values = [
  {
    title: 'Uncompromising Quality',
    description:
      'We source premium materials and work with master craftsmen to deliver structures that stand strong for generations.',
  },
  {
    title: 'Sustainable Building',
    description:
      'Every project integrates green building practices, energy-efficient systems, and environmentally responsible materials.',
  },
  {
    title: 'Client-First Approach',
    description:
      'From first consultation to final handover, you partner directly with our senior team every step of the way.',
  },
  {
    title: 'On-Time Delivery',
    description:
      'Rigorous project management and decades of local expertise ensure we deliver on schedule, every time.',
  },
];

function WhyChooseUs() {
  return (
    <section className='bg-muted/30 py-24'>
      <div className='container-main'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-medium uppercase tracking-[0.2em] text-custom'>
            Why Shaon Landmarks
          </span>
          <h2 className='mt-3 text-4xl font-bold tracking-tight md:text-5xl'>
            Built on
            <span className='text-custom'> Trust</span>
          </h2>
        </div>

        <div className='mt-16 grid grid-cols-2 gap-8 md:grid-cols-4'>
          {stats.map((s) => (
            <div key={s.label} className='text-center'>
              <p className='text-4xl font-bold text-custom md:text-5xl'>
                {s.value}
              </p>
              <p className='mt-2 text-sm text-muted-foreground'>{s.label}</p>
            </div>
          ))}
        </div>

        <div className='mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {values.map((v) => (
            <div key={v.title} className='text-center md:text-left'>
              <div className='mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-custom/10 md:mx-0'>
                <div className='size-3 rounded-full bg-custom' />
              </div>
              <h3 className='font-semibold'>{v.title}</h3>
              <p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      'Working with Shaon Landmarks was a dream. They transformed our vision into a home that exceeds every expectation. The attention to detail is remarkable.',
    name: 'Farhana Rahman',
    role: 'Homeowner, The Obsidian',
  },
  {
    quote:
      'Professional, transparent, and truly committed to quality. Our commercial complex was delivered three weeks ahead of schedule without compromising on a single detail.',
    name: 'Kamal Hossain',
    role: 'CEO, Crescent Group',
  },
  {
    quote:
      'What sets Shaon apart is their integrity. In an industry full of shortcuts, they never compromise. Our project stands as a testament to their craftsmanship.',
    name: 'Dr. Ayesha Siddiqua',
    role: 'Architect & Partner',
  },
];

function Testimonials() {
  return (
    <section className='py-24'>
      <div className='container-main'>
        <div className='mx-auto max-w-2xl text-center'>
          <span className='text-xs font-medium uppercase tracking-[0.2em] text-custom'>
            Testimonials
          </span>
          <h2 className='mt-3 text-4xl font-bold tracking-tight md:text-5xl'>
            What Our
            <span className='text-custom'> Clients</span> Say
          </h2>
        </div>

        <div className='mt-12 grid gap-8 md:grid-cols-3'>
          {testimonials.map((t) => (
            <div
              key={t.name}
              className='flex flex-col rounded-xl border bg-background p-8'
            >
              <div className='flex gap-1 text-custom'>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>&#9733;</span>
                ))}
              </div>
              <blockquote className='mt-4 flex-1 text-sm leading-relaxed text-muted-foreground'>
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className='mt-6 flex items-center gap-3 border-t pt-4'>
                <div className='flex size-10 items-center justify-center rounded-full bg-custom/10 text-sm font-semibold text-custom'>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className='text-sm font-medium'>{t.name}</p>
                  <p className='text-xs text-muted-foreground'>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className='bg-custom py-20'>
      <div className='container-main'>
        <div className='mx-auto max-w-3xl text-center'>
          <h2 className='text-4xl font-bold tracking-tight text-white md:text-5xl'>
            Ready to Build Something
            <span className='text-primary'> Extraordinary</span>?
          </h2>
          <p className='mt-4 text-lg text-white/70'>
            Whether you&apos;re dreaming of a new home, planning a commercial
            project, or exploring land opportunities — let&apos;s start the
            conversation.
          </p>
          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Link
              to='/contact'
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'lg',
                  className: 'bg-primary text-white hover:bg-primary/90 px-8',
                }),
              )}
            >
              Start Your Project
            </Link>
            <Link
              to='/about'
              className={cn(
                buttonVariants({
                  variant: 'outline',
                  size: 'lg',
                  className:
                    'border-white/30 text-white hover:bg-white/10 hover:text-white px-8',
                }),
              )}
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
