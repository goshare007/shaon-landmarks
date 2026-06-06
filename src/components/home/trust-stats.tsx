import { motion } from 'motion/react';
import { TRUST_STATS as stats } from '@/data/home';

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.15, 1],
    } as const,
  }),
};

export function TrustStats() {
  return (
    <section className='border-b border-t border-outline-variant bg-surface-container-low py-16 md:py-20'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <div className='grid gap-8 md:grid-cols-4'>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className='text-center'
              custom={i}
              variants={statVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className='text-4xl font-serif text-secondary sm:text-5xl'>
                {stat.value}
              </div>
              <div className='mt-2 text-label font-medium tracking-widest text-on-surface-variant uppercase'>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
