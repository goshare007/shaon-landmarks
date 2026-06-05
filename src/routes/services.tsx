import { createFileRoute, Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import ARCH_IMG from '@/assets/images/services/architecture.webp';
import CONST_IMG from '@/assets/images/services/construction.webp';
import HERO_IMG from '@/assets/images/services/hero.webp';
import INTERIOR_IMG from '@/assets/images/services/interior.webp';
import LAND_IMG from '@/assets/images/services/land-development.webp';
import { fadeUp, stagger } from '@/lib/animations';
import { generateMeta } from '@/lib/seo';

const steps = [
  {
    step: '01',
    title: 'Planning',
    desc: 'Strategic feasibility studies, land acquisition, and environmental impact assessments to ensure longevity.',
  },
  {
    step: '02',
    title: 'Design',
    desc: 'Collaborative architectural conceptualization and interior planning utilizing 3D BIM technology.',
  },
  {
    step: '03',
    title: 'Construction',
    desc: 'Meticulous execution by master craftsmen with strict adherence to safety and material quality standards.',
  },
  {
    step: '04',
    title: 'Handover',
    desc: 'Final inspections, legal compliance certification, and the key delivery of your new landmark.',
  },
];

export const Route = createFileRoute('/services')({
  component: Services,
  head: () =>
    generateMeta({
      title: 'Our Services',
      description:
        'Shaon Landmarks offers land development, architectural design, construction management, and interior design services across Bangladesh.',
    }),
});

function Services() {
  return (
    <main>
      {/* Hero */}
      <section className='relative overflow-hidden bg-surface py-24 md:py-32'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid items-center gap-6 md:grid-cols-12'>
            <motion.div
              className='md:col-span-7'
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
            >
              <motion.span
                className='mb-6 block text-label font-medium tracking-[0.2em] text-secondary uppercase'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                Our Expertise
              </motion.span>
              <motion.h1
                className='heading-hero mb-8 text-primary'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Crafting Excellence Across Every Dimension
              </motion.h1>
              <motion.p
                className='mb-12 max-w-xl text-base leading-relaxed text-on-surface-variant md:text-lg'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45 }}
              >
                From strategic land acquisition to the final touch of interior
                elegance, Shaon Landmarks delivers architectural integrity
                through a multidisciplinary approach.
              </motion.p>
              <Link
                to='/portfolio'
                className='inline-block rounded-sm bg-primary px-8 py-4 text-label font-medium tracking-widest text-on-primary uppercase transition-all hover:opacity-90'
              >
                View Our Portfolio
              </Link>
            </motion.div>

            <motion.div
              className='relative mt-12 md:col-span-5 md:mt-0'
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className='aspect-4/5 overflow-hidden bg-surface-container'>
                <motion.div
                  className='h-full w-full'
                  animate={{ scale: [1, 1.08] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  }}
                >
                  <Image
                    src={HERO_IMG}
                    alt='Shaon Landmark services overview'
                    layout='fullWidth'
                    className='h-full w-full object-cover'
                  />
                </motion.div>
              </div>
              <motion.div
                className='absolute -bottom-6 -left-6 hidden bg-secondary p-8 md:block'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className='text-lg italic font-serif text-on-primary leading-snug'>
                  "Permanent Quality"
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Cards (Bento Grid) */}
      <section className='bg-surface-container-low py-24'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mb-16'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='mb-4 text-4xl leading-[1.2] font-serif md:text-5xl'>
              Core Services
            </h2>
            <div className='h-1 w-24 bg-secondary' />
          </motion.div>

          <motion.div
            className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Land Development */}
            <motion.div
              className='group relative overflow-hidden border border-outline-variant bg-white lg:col-span-8'
              variants={fadeUp}
            >
              <div className='flex h-full flex-col md:flex-row'>
                <div className='flex flex-col justify-between p-10 md:w-1/2'>
                  <div>
                    <span className='material-symbols-outlined mb-6 block text-5xl text-secondary'>
                      landscape
                    </span>
                    <h3 className='mb-4 text-3xl font-serif'>
                      Land Development
                    </h3>
                    <p className='mb-6 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                      Strategic location selection is our foundation. We
                      identify and acquire prime real estate with high
                      appreciation potential, ensuring a solid base for future
                      masterpieces.
                    </p>
                  </div>
                  <Link
                    to='/contact'
                    className='flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase no-underline transition-all group-hover:gap-4'
                  >
                    Explore Strategies
                    <span className='material-symbols-outlined text-base'>
                      arrow_forward
                    </span>
                  </Link>
                </div>
                <motion.div className='aspect-square md:w-1/2 md:aspect-auto'>
                  <Image
                    src={LAND_IMG}
                    alt='Land development project overview'
                    layout='fullWidth'
                    className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Architectural Design */}
            <motion.div
              className='group relative overflow-hidden border border-outline-variant bg-white lg:col-span-4'
              variants={fadeUp}
            >
              <div className='flex h-full flex-col'>
                <div className='aspect-video'>
                  <Image
                    src={ARCH_IMG}
                    alt='Architectural design rendering'
                    layout='fullWidth'
                    className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                  />
                </div>
                <div className='p-8'>
                  <span className='material-symbols-outlined mb-4 block text-4xl text-secondary'>
                    architecture
                  </span>
                  <h3 className='mb-3 text-2xl font-serif'>
                    Architectural Design
                  </h3>
                  <p className='text-sm leading-relaxed text-on-surface-variant'>
                    Functional aesthetics that define modern living. Our designs
                    balance structural rhythm with human-centric flow.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Construction Management */}
            <motion.div
              className='group relative overflow-hidden border border-outline-variant bg-white lg:col-span-4'
              variants={fadeUp}
            >
              <div className='flex h-full flex-col'>
                <div className='aspect-video'>
                  <Image
                    src={CONST_IMG}
                    alt='Construction management site'
                    layout='fullWidth'
                    className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                  />
                </div>
                <div className='p-8'>
                  <span className='material-symbols-outlined mb-4 block text-4xl text-secondary'>
                    engineering
                  </span>
                  <h3 className='mb-3 text-2xl font-serif'>
                    Construction Management
                  </h3>
                  <p className='text-sm leading-relaxed text-on-surface-variant'>
                    Uncompromising structural integrity. We manage every phase
                    with rigorous safety protocols and precision engineering.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Interior Design */}
            <motion.div
              className='group relative overflow-hidden border border-outline-variant bg-white lg:col-span-8'
              variants={fadeUp}
            >
              <div className='flex h-full flex-col md:flex-row-reverse'>
                <div className='flex flex-col justify-between p-10 md:w-1/2'>
                  <div>
                    <span className='material-symbols-outlined mb-6 block text-5xl text-secondary'>
                      format_paint
                    </span>
                    <h3 className='mb-4 text-3xl font-serif'>
                      Interior Design
                    </h3>
                    <p className='mb-6 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                      Bespoke luxury for living spaces that reflect your
                      identity. We combine the warmth of Metallic Bronze with
                      Onyx sophisticated finishes to create a gallery-like home.
                    </p>
                  </div>
                  <Link
                    to='/contact'
                    className='flex items-center gap-2 text-label font-medium tracking-widest text-on-surface uppercase no-underline transition-all group-hover:gap-4'
                  >
                    View Interior Gallery
                    <span className='material-symbols-outlined text-base'>
                      arrow_forward
                    </span>
                  </Link>
                </div>
                <motion.div className='aspect-square md:w-1/2 md:aspect-auto'>
                  <Image
                    src={INTERIOR_IMG}
                    alt='Interior design showcase'
                    layout='fullWidth'
                    className='h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0'
                  />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Shaon Standard */}
      <section className='bg-tertiary py-24 text-on-tertiary'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mb-20 text-center'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <h2 className='mb-4 text-4xl leading-[1.2] font-serif md:text-5xl'>
              The Shaon Standard
            </h2>
            <p className='mx-auto max-w-2xl text-sm leading-relaxed text-on-tertiary-container md:text-base'>
              A systematic approach to perfection. We guide every project
              through a rigorous four-phase lifecycle.
            </p>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-4'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {steps.map((s) => (
              <motion.div
                key={s.step}
                className='group relative border-l border-outline-variant/30 p-8'
                variants={fadeUp}
              >
                <motion.span
                  className='mb-6 block text-3xl font-serif text-secondary opacity-50 transition-opacity md:text-4xl'
                  whileHover={{ opacity: 1 }}
                >
                  {s.step}
                </motion.span>
                <h4 className='mb-4 text-2xl font-serif'>{s.title}</h4>
                <p className='text-sm leading-relaxed text-on-tertiary-container'>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className='relative overflow-hidden bg-surface py-32'>
        {/* Decorative circles */}
        <motion.div
          className='absolute left-1/2 top-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/20'
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className='absolute left-1/2 top-1/2 h-300 w-300 -translate-x-1/2 -translate-y-1/2 rounded-full border border-outline-variant/10'
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />

        <div className='relative z-10 mx-auto max-w-360 px-4 text-center md:px-16'>
          <motion.h2
            className='mb-8 text-4xl leading-[1.2] font-serif md:text-5xl'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            Begin Your Legacy With Us
          </motion.h2>
          <motion.p
            className='mx-auto mb-12 max-w-2xl text-base leading-relaxed text-on-surface-variant md:text-lg'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            Whether you are a landowner looking for development or an investor
            seeking premium real estate, our experts are ready to consult.
          </motion.p>
          <motion.div
            className='flex flex-col justify-center gap-6 md:flex-row'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <Link
              to='/contact'
              className='inline-block rounded-sm bg-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-on-primary uppercase transition-all hover:opacity-90'
            >
              Partner with Us
            </Link>
            <Link
              to='/contact'
              className='inline-block rounded-sm border-2 border-primary px-10 py-5 text-label font-medium tracking-[0.15em] text-primary uppercase transition-all hover:bg-primary hover:text-on-primary'
            >
              Consult our Experts
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
