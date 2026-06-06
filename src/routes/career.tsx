import { createFileRoute, Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'motion/react';
import HERO_IMAGE from '@/assets/images/career/hero.webp';
import CAREER_TEAM from '@/assets/images/career/team.webp';

import { fadeUp, staggerShort as stagger } from '@/lib/animations';

const openPositions = [
  {
    title: 'Senior Architect',
    type: 'Full-time',
    location: 'Gulshan, Dhaka',
    description:
      'We are looking for an experienced architect with 8+ years in residential and commercial design to lead our design team.',
  },
  {
    title: 'Project Manager',
    type: 'Full-time',
    location: 'Gulshan, Dhaka',
    description:
      'Seeking a seasoned project manager to oversee large-scale development projects from conception through handover.',
  },
  {
    title: 'Junior Architect',
    type: 'Full-time',
    location: 'Agrabad, Chattogram',
    description:
      'An exciting opportunity for a recent architecture graduate to work on landmark projects across Bangladesh.',
  },
  {
    title: 'Interior Designer',
    type: 'Contract',
    location: 'Gulshan, Dhaka',
    description:
      'Join our interiors team to create bespoke luxury living spaces for our high-end residential projects.',
  },
];

import { generateMeta } from '@/lib/seo';

export const Route = createFileRoute('/career')({
  component: Career,
  head: () => ({
    ...generateMeta({
      path: '/career',
      title: 'Careers',
      description:
        'Join Shaon Landmarks & Housing. Explore career opportunities in architecture, project management, interior design, and more.',
      image: HERO_IMAGE,
    }),
    links: [{ rel: 'preload', as: 'image', href: HERO_IMAGE }],
  }),
});

function Career() {
  return (
    <main>
      {/* Hero */}
      <section className='relative h-[50vh] min-h-96 overflow-hidden bg-tertiary'>
        <motion.div
          className='absolute inset-0 bg-cover bg-center will-change-transform'
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          animate={{ scale: [1, 1.1] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
        <div className='absolute inset-0 bg-linear-to-b from-black/50 to-black/70' />
        <div className='relative z-10 flex h-full items-center'>
          <motion.div
            className='mx-auto w-full max-w-360 px-4 md:px-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
              Join the Team
            </span>
            <h1 className='heading-hero mt-3 text-on-tertiary'>
              Building Careers
            </h1>

            <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
              Build your future with Shaon Landmarks. We are always looking for
              talent that shares our commitment to architectural integrity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className='bg-surface py-20 md:py-28'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid items-center gap-12 md:grid-cols-2'>
            <motion.div
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
            >
              <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
                Why Shaon Landmarks
              </span>
              <h2 className='mt-3 text-3xl leading-tight font-serif text-on-surface sm:text-4xl'>
                Shape the Skyline of Tomorrow
              </h2>
              <p className='mt-4 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                At Shaon Landmarks, we believe that great architecture is built
                by great people. We offer a collaborative environment where
                creativity meets precision, and every team member contributes to
                landmarks that define generations.
              </p>
              <div className='mt-8 space-y-4'>
                {[
                  'Work on iconic projects across Bangladesh',
                  'Collaborate with industry-leading architects and engineers',
                  'Competitive compensation and growth opportunities',
                  'Culture of innovation and continuous learning',
                ].map((item) => (
                  <div key={item} className='flex items-start gap-3'>
                    <span className='mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary' />
                    <span className='text-sm text-on-surface-variant'>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              className='aspect-4/3 overflow-hidden border border-outline-variant bg-surface-container-low'
              initial={{ opacity: 0, scale: 1.03 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <Image
                src={CAREER_TEAM}
                alt='Team collaboration'
                layout='fullWidth'
                className='h-full w-full object-cover'
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className='bg-surface-container-low py-20 md:py-28'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mb-16'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='text-3xl font-serif text-on-surface sm:text-4xl'>
              Open Positions
            </h2>
            <div className='mt-4 h-px w-24 bg-secondary' />
          </motion.div>

          <motion.div
            className='grid gap-6 md:grid-cols-2'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {openPositions.map((position) => (
              <motion.div
                key={position.title}
                className='border border-outline-variant bg-white p-8'
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <div className='mb-4 flex items-center gap-3'>
                  <span className='rounded-sm border border-secondary bg-secondary/10 px-2.5 py-1 text-caption font-medium tracking-widest text-secondary uppercase'>
                    {position.type}
                  </span>
                  <span className='text-label font-medium text-on-surface-variant'>
                    {position.location}
                  </span>
                </div>
                <h3 className='mb-3 text-xl font-serif text-on-surface'>
                  {position.title}
                </h3>
                <p className='mb-6 text-sm leading-relaxed text-on-surface-variant'>
                  {position.description}
                </p>
                <Link
                  to='/contact'
                  className='inline-flex items-center gap-2 text-label font-medium tracking-widest text-secondary uppercase transition-colors hover:gap-4'
                >
                  Apply Now
                  <span className='material-symbols-outlined text-base'>
                    arrow_forward
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-tertiary py-20 md:py-28'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mx-auto max-w-2xl text-center'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Don't See the Right Role?
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              We are always on the lookout for exceptional talent. Send us your
              CV and we will keep you in mind for future opportunities.
            </p>
            <Link
              to='/contact'
              className='mt-8 inline-flex items-center gap-2 rounded-sm bg-secondary px-8 py-3.5 text-label font-medium tracking-widest text-on-secondary no-underline uppercase transition-all hover:opacity-90'
            >
              Get in Touch
              <span className='material-symbols-outlined text-base'>
                arrow_forward
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
