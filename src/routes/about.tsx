import { createFileRoute, Link } from '@tanstack/react-router';
import { Image } from '@unpic/react';
import { motion } from 'framer-motion';
import HERO_IMAGE from '@/assets/images/about/hero.webp';
import LEADER_1 from '@/assets/images/about/leader-1.webp';
import LEADER_2 from '@/assets/images/about/leader-2.webp';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.15, 1] } as const,
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const Route = createFileRoute('/about')({
  component: About,
  head: () => ({
    meta: [
      { title: 'About Us — Shaon Landmarks & Housing' },
      {
        name: 'description',
        content:
          "Learn about Shaon Landmarks & Housing's legacy of architectural integrity, visionary leadership, and certified excellence in Bangladesh real estate.",
      },
      { property: 'og:title', content: 'About Us — Shaon Landmarks & Housing' },
      {
        property: 'og:description',
        content:
          'Discover our story of trust, innovation, and premium real estate development across Bangladesh.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
});

function About() {
  return (
    <main>
      {/* Hero */}
      <section className='relative overflow-hidden bg-tertiary'>
        <div className='mx-auto grid min-h-179 max-w-360 md:grid-cols-2'>
          <motion.div
            className='z-10 flex flex-col justify-center px-4 py-20 text-on-tertiary md:px-16'
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <motion.span
              className='mb-4 text-[11px] font-medium tracking-[0.2em] text-secondary-fixed-dim uppercase'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Established Excellence
            </motion.span>
            <motion.h1
              className='text-[40px] leading-[1.1] font-serif md:text-6xl lg:text-7xl tracking-[-0.02em]'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              A Legacy of Integrity
            </motion.h1>
            <motion.p
              className='mt-6 max-w-lg text-base leading-relaxed text-on-tertiary-fixed-variant md:text-lg'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              Crafting landmarks that stand as a testament to architectural
              precision and unwavering commitment in the heart of Bangladesh.
            </motion.p>
            <motion.div
              className='mt-10 flex gap-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className='mt-2 h-px w-12 bg-secondary-fixed-dim' />
              <p className='max-w-sm text-sm italic leading-relaxed text-on-tertiary-container'>
                "We don't just build structures; we cultivate trust through
                every brick laid and every promise kept."
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className='relative h-100 overflow-hidden md:h-full'
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
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
                src={HERO_IMAGE}
                alt=''
                layout='fullWidth'
                className='h-full w-full object-cover'
              />
            </motion.div>
            <div className='absolute inset-0 hidden bg-linear-to-r from-tertiary/60 to-transparent md:block' />
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className='bg-surface py-24'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid gap-6 md:grid-cols-12'>
            <motion.div
              className='mb-12 md:col-span-4 md:mb-0'
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 className='sticky top-32 text-4xl leading-[1.2] font-serif md:text-5xl'>
                Our Story
              </h2>
            </motion.div>
            <motion.div
              className='md:col-span-8'
              variants={stagger}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.p
                className='text-base leading-relaxed text-on-surface-variant md:text-lg'
                variants={fadeUp}
              >
                Founded on the principles of transparency and architectural
                innovation, Shaon Landmarks & Housing began its journey with a
                single vision: to redefine the real estate landscape of
                Bangladesh. For over a decade, we have navigated the
                complexities of urban development with a focus on sustainable
                growth and aesthetic excellence.
              </motion.p>
              <motion.div
                className='my-12 grid grid-cols-2 gap-8 border-y border-outline-variant py-8'
                variants={fadeUp}
              >
                <div>
                  <motion.span
                    className='block text-3xl font-serif text-secondary md:text-4xl'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    15+
                  </motion.span>
                  <span className='text-[11px] font-medium tracking-widest text-on-surface-variant uppercase'>
                    Years of Expertise
                  </span>
                </div>
                <div>
                  <motion.span
                    className='block text-3xl font-serif text-secondary md:text-4xl'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    40+
                  </motion.span>
                  <span className='text-[11px] font-medium tracking-widest text-on-surface-variant uppercase'>
                    Completed Projects
                  </span>
                </div>
              </motion.div>
              <motion.p
                className='text-sm leading-relaxed text-on-surface-variant md:text-base'
                variants={fadeUp}
              >
                Our commitment goes beyond construction. We meticulously select
                locations that offer the perfect balance of serenity and
                connectivity. Every project is a collaborative masterpiece,
                involving the country's finest architects and engineers to
                ensure that "Shaon Landmarks" remains synonymous with prestige.
              </motion.p>
              <Link
                to='/portfolio'
                className='mt-8 flex items-center gap-2 text-[11px] font-medium tracking-widest text-on-surface uppercase transition-colors hover:text-secondary group'
              >
                View Our Portfolio
                <span className='material-symbols-outlined text-base transition-transform group-hover:translate-x-1'>
                  arrow_forward
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className='bg-surface-container-low py-24'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <div className='grid gap-12 md:grid-cols-2'>
            <motion.div
              className='flex flex-col justify-between border border-outline-variant bg-white p-12'
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className='material-symbols-outlined mb-8 text-4xl text-secondary'>
                  track_changes
                </span>
                <h3 className='mb-6 text-3xl font-serif'>Mission</h3>
                <p className='mb-8 text-sm leading-relaxed text-on-surface-variant md:text-base'>
                  To deliver world-class living spaces that harmonize luxury
                  with functionality, ensuring every client experiences the
                  peace of mind that comes with timely handover and
                  uncompromising build quality.
                </p>
              </div>
              <ul className='space-y-4 text-[11px] font-medium tracking-widest text-on-surface uppercase'>
                {[
                  '100% Timely Handover',
                  'Premium Raw Materials',
                  'Transparent Contracts',
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    className='flex items-center gap-3'
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  >
                    <span className='h-1.5 w-1.5 bg-secondary' />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className='flex flex-col justify-between bg-tertiary p-12 text-on-tertiary md:mt-16'
              variants={fadeUp}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <span className='material-symbols-outlined mb-8 text-4xl text-secondary-fixed-dim'>
                  visibility
                </span>
                <h3 className='mb-6 text-3xl font-serif'>Vision</h3>
                <p className='mb-8 text-sm leading-relaxed text-tertiary-fixed-dim md:text-base'>
                  To become the most trusted real estate partner in the region,
                  recognized for setting the gold standard in architectural
                  integrity and customer-centric property management.
                </p>
              </div>
              <div className='border-t border-on-tertiary-container pt-8'>
                <p className='text-2xl italic font-serif leading-snug'>
                  "Building the Future, Preserving the Legacy."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className='bg-surface py-24'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mb-20 text-center'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className='mb-4 block text-[11px] font-medium tracking-[0.2em] text-secondary uppercase'>
              The Board
            </span>
            <h2 className='text-4xl leading-[1.2] font-serif md:text-5xl'>
              Visionary Leadership
            </h2>
          </motion.div>

          <motion.div
            className='grid gap-16 md:grid-cols-2'
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Leader 1 */}
            <motion.div className='group' variants={fadeUp}>
              <motion.div
                className='relative mb-8 overflow-hidden grayscale transition-all duration-700 hover:grayscale-0'
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={LEADER_1}
                  alt='Engr. Mahfuzur Rahman'
                  layout='fullWidth'
                  className='aspect-4/5 w-full object-cover'
                />
              </motion.div>
              <h4 className='mb-1 text-2xl font-serif'>
                Engr. Mahfuzur Rahman
              </h4>
              <p className='mb-4 text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
                Chairman
              </p>
              <div className='mb-6 h-px w-full bg-outline' />
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                With over 25 years in civil engineering, Engr. Rahman provides
                the technical oversight and strategic direction that anchors our
                commitment to structural safety and architectural innovation.
              </p>
            </motion.div>

            {/* Leader 2 */}
            <motion.div className='group' variants={fadeUp}>
              <motion.div
                className='relative mb-8 overflow-hidden grayscale transition-all duration-700 hover:grayscale-0'
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={LEADER_2}
                  alt='Md. Shaon Ahmed'
                  layout='fullWidth'
                  className='aspect-4/5 w-full object-cover'
                />
              </motion.div>
              <h4 className='mb-1 text-2xl font-serif'>Md. Shaon Ahmed</h4>
              <p className='mb-4 text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
                Managing Director
              </p>
              <div className='mb-6 h-px w-full bg-outline' />
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                A visionary in real estate marketing and development, Mr. Ahmed
                leads the company's expansion and ensures that every project
                aligns with the lifestyle aspirations of our elite clientele.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className='bg-surface-container py-20'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='flex flex-col items-center justify-between gap-12 border-y border-outline-variant py-16 md:flex-row'
            variants={fadeUp}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className='max-w-md text-center md:text-left'>
              <h2 className='mb-4 text-3xl font-serif'>Certified Excellence</h2>
              <p className='text-sm leading-relaxed text-on-surface-variant'>
                We adhere to the highest regulatory standards in Bangladesh,
                ensuring every development is legal, secure, and built to last.
              </p>
            </div>
            <motion.div
              className='flex flex-wrap justify-center gap-16 opacity-70 transition-opacity hover:opacity-100'
              variants={stagger}
            >
              {[
                { icon: 'verified', label: 'RAJUK Certified' },
                { icon: 'handshake', label: 'REHAB Member' },
                { icon: 'workspace_premium', label: 'ISO 9001:2015' },
              ].map((cert) => (
                <motion.div
                  key={cert.label}
                  className='flex flex-col items-center gap-4'
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                >
                  <div className='flex h-24 w-24 items-center justify-center border border-outline-variant bg-white'>
                    <span className='material-symbols-outlined text-5xl text-[#000000]'>
                      {cert.icon}
                    </span>
                  </div>
                  <span className='text-[11px] font-medium tracking-widest text-on-surface uppercase'>
                    {cert.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
