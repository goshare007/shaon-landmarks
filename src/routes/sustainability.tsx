import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80';

const pillars = [
  {
    icon: 'ecology',
    title: 'Sustainable Materials',
    description:
      'We source eco-friendly, low-carbon materials from responsible suppliers, ensuring every structure minimizes its environmental footprint without compromising on luxury or durability.',
  },
  {
    icon: 'forest',
    title: 'Green Spaces',
    description:
      'Every Shaon Landmark integrates lush landscapes, vertical gardens, and native flora to promote biodiversity and create healthier urban environments.',
  },
  {
    icon: 'energy_savings_leaf',
    title: 'Energy Efficiency',
    description:
      'Smart building management systems, solar integration, and passive cooling strategies reduce energy consumption while maximizing occupant comfort.',
  },
];

const stats = [
  { value: '40%', label: 'Energy Reduction' },
  { value: '200+', label: 'Green-Certified Units' },
  { value: 'Zero', label: 'Net Carbon Committed' },
];

export const Route = createFileRoute('/sustainability')({
  component: Sustainability,
  head: () => ({
    meta: [
      { title: 'Sustainability — Shaon Landmarks & Housing' },
      {
        name: 'description',
        content:
          'Shaon Landmarks is committed to sustainable architecture — eco-friendly materials, green spaces, and energy-efficient building practices in Bangladesh.',
      },
      {
        property: 'og:title',
        content: 'Sustainability — Shaon Landmarks & Housing',
      },
      {
        property: 'og:description',
        content:
          'Discover our commitment to green building, sustainable materials, and energy-efficient design.',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
});

function Sustainability() {
  return (
    <main>
      <section className='relative h-[50vh] min-h-[24rem] overflow-hidden bg-tertiary'>
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
        <div className='absolute inset-0 bg-gradient-to-b from-black/50 to-black/70' />
        <div className='relative z-10 flex h-full items-center'>
          <motion.div
            className='mx-auto w-full max-w-[1440px] px-4 md:px-16'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
          >
            <span className='text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
              Building Responsibly
            </span>
            <h1 className='mt-3 text-5xl leading-[1.05] tracking-[-0.02em] text-on-tertiary font-serif sm:text-6xl md:text-7xl'>
              Sustainability
            </h1>
            <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
              Committed to a greener future through responsible architecture and
              innovative design.
            </p>
          </motion.div>
        </div>
      </section>

      <section className='bg-surface py-20 md:py-28'>
        <div className='mx-auto max-w-[1440px] px-4 md:px-16'>
          <div className='grid items-center gap-12 md:grid-cols-2'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <span className='text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
                Our Philosophy
              </span>
              <h2 className='mt-3 text-3xl font-serif text-on-surface sm:text-4xl'>
                Designing for Generations
              </h2>
              <p className='mt-4 text-sm leading-relaxed text-on-surface-variant'>
                At Shaon Landmarks, sustainability is not an afterthought — it
                is the foundation. Every project begins with a commitment to
                environmental stewardship, community well-being, and enduring
                value. We believe luxury and responsibility are not mutually
                exclusive.
              </p>
            </motion.div>
            <motion.div
              className='grid grid-cols-3 gap-4'
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {stats.map((s) => (
                <div key={s.label} className='text-center'>
                  <div className='text-3xl font-serif text-secondary sm:text-4xl'>
                    {s.value}
                  </div>
                  <div className='mt-1 text-[10px] font-medium tracking-[0.1em] text-on-surface-variant uppercase'>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className='bg-surface-container-low py-20 md:py-28'>
        <div className='mx-auto max-w-[1440px] px-4 md:px-16'>
          <motion.div
            className='mb-12 text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <span className='text-[11px] font-medium tracking-[0.15em] text-secondary uppercase'>
              Our Initiatives
            </span>
            <h2 className='mt-3 text-3xl font-serif text-on-surface sm:text-4xl'>
              Three Pillars of Sustainability
            </h2>
          </motion.div>
          <div className='grid gap-8 md:grid-cols-3'>
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                className='rounded-sm bg-white p-8'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
              >
                <span className='material-symbols-outlined text-3xl text-secondary'>
                  {p.icon}
                </span>
                <h3 className='mb-3 mt-4 text-lg font-serif text-on-surface'>
                  {p.title}
                </h3>
                <p className='text-sm leading-relaxed text-on-surface-variant'>
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-surface py-20 md:py-28'>
        <div className='mx-auto max-w-[1440px] px-4 md:px-16'>
          <motion.div
            className='mx-auto max-w-2xl text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className='text-3xl font-serif text-on-surface sm:text-4xl'>
              Certifications & Recognition
            </h2>
            <p className='mt-4 text-sm leading-relaxed text-on-surface-variant'>
              Our sustainable practices are recognized by leading industry
              bodies and regulatory authorities.
            </p>
          </motion.div>
          <div className='mt-10 flex flex-wrap justify-center gap-6'>
            {[
              'RAJUK Certified',
              'REHAB Member',
              'ISO 14001',
              'Green Building Council',
            ].map((cert) => (
              <motion.div
                key={cert}
                className='rounded-sm border border-outline-variant bg-white px-6 py-4'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ scale: 1.04 }}
              >
                <span className='text-[11px] font-medium tracking-[0.1em] text-on-surface uppercase'>
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-tertiary py-20 md:py-28'>
        <div className='mx-auto max-w-[1440px] px-4 md:px-16'>
          <motion.div
            className='mx-auto max-w-2xl text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <h2 className='text-3xl font-serif text-on-tertiary sm:text-4xl'>
              Build a Greener Future
            </h2>
            <p className='mt-4 text-base leading-relaxed text-[#9a9c9c]'>
              Discover how Shaon Landmarks can bring sustainable luxury to your
              next development.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to='/contact'
                className='inline-block rounded-sm bg-secondary px-8 py-3.5 text-[11px] font-medium tracking-[0.1em] text-on-secondary no-underline uppercase'
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
