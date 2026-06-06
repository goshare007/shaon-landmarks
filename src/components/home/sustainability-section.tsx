import { motion } from 'motion/react';
import energyEfficiency from '@/assets/images/sustainability/energy-efficiency.webp';
import greenSpaces from '@/assets/images/sustainability/green-spaces.jpg';
import sustainableMaterials from '@/assets/images/sustainability/sustainable-materials.jpg';

const sustainabilityData = [
  {
    title: 'Sustainable Materials',
    description:
      'Sourcing eco-friendly materials that minimize environmental impact without compromising luxury.',
    image: sustainableMaterials,
  },
  {
    title: 'Green Spaces',
    description:
      'Integrating lush landscapes and vertical gardens into every development for healthier urban living.',
    image: greenSpaces,
  },
  {
    title: 'Energy Efficiency',
    description:
      'Smart building systems engineered to reduce energy consumption while maximizing comfort and air quality.',
    image: energyEfficiency,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.25, 0.1, 0.15, 1],
    } as const,
  }),
};

export function SustainabilitySection() {
  return (
    <section className='bg-surface py-20 md:py-28'>
      <div className='mx-auto max-w-360 px-4 md:px-16'>
        <motion.div
          className='mb-12 max-w-2xl'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <span className='text-label font-medium tracking-[0.15em] text-secondary uppercase'>
            Sustainability & Innovation
          </span>
          <h2 className='mt-3 text-3xl leading-tight text-on-surface font-serif sm:text-4xl'>
            Building responsibly for a better tomorrow.
          </h2>
        </motion.div>

        <div className='grid gap-6 md:grid-cols-3'>
          {sustainabilityData.map((item, i) => (
            <motion.div
              key={item.title}
              className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'
              custom={i}
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.div
                className='absolute inset-0 bg-cover bg-center'
                style={{ backgroundImage: `url(${item.image})` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.7 }}
              />
              <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
              <div className='absolute bottom-0 left-0 right-0 p-6'>
                <h3 className='text-lg font-serif text-white'>{item.title}</h3>
                <motion.p
                  className='mt-2 text-sm text-white/70'
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
