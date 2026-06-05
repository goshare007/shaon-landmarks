import { createFileRoute, Link } from '@tanstack/react-router';
import { LayoutGroup, motion } from 'framer-motion';
import { useState } from 'react';
import img from '@/assets/images/projects/the-obsidian.webp';
import { allProjects } from '@/data/projects';
import { generateMeta } from '@/lib/seo';

type Filter = 'All' | 'Ongoing' | 'Upcoming' | 'Completed';

const filters: Filter[] = ['All', 'Ongoing', 'Upcoming', 'Completed'];

const statusColors: Record<string, string> = {
  Completed: 'bg-emerald-900/60 text-emerald-100 border-emerald-700',
  Ongoing: 'bg-amber-900/60 text-amber-100 border-amber-700',
  Upcoming: 'bg-sky-900/60 text-sky-100 border-sky-700',
};

export const Route = createFileRoute('/portfolio')({
  component: Portfolio,
  head: () =>
    generateMeta({
      title: 'Our Portfolio',
      description:
        "Explore Shaon Landmarks' portfolio of premium residential and commercial projects across Dhaka and Chattogram.",
    }),
});

function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered =
    activeFilter === 'All'
      ? allProjects
      : allProjects.filter((p) => p.status === activeFilter);

  return (
    <main>
      <section className='relative h-[50vh] min-h-120 overflow-hidden bg-tertiary'>
        <motion.div
          className='absolute inset-0 bg-cover bg-center will-change-transform'
          style={{ backgroundImage: `url(${img})` }}
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
              Selected Works
            </span>
            <h1 className='heading-hero mt-3 text-on-tertiary'>
              Our Landmarks
            </h1>
            <p className='mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]'>
              A curated portfolio of architectural excellence across Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      <section className='bg-surface py-12 md:py-16'>
        <div className='mx-auto max-w-360 px-4 md:px-16'>
          <motion.div
            className='mb-8 flex items-center justify-between'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className='text-body-sm font-medium text-on-surface-variant'>
              {allProjects.length} Total Projects
            </span>
          </motion.div>

          <motion.div
            className='mb-10 flex flex-wrap gap-2 border-b border-outline-variant pb-4'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {filters.map((f) => (
              <button
                key={f}
                type='button'
                onClick={() => setActiveFilter(f)}
                className={`rounded-sm px-4 py-2 text-label font-medium tracking-widest uppercase transition-colors ${
                  activeFilter === f
                    ? 'bg-secondary text-on-secondary'
                    : 'text-on-surface-variant hover:text-secondary'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          <LayoutGroup>
            <motion.div
              className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'
              layout
            >
              {filtered.map((project, i) => (
                <Link
                  key={project.id}
                  to='/projects/$slug'
                  params={{ slug: project.slug }}
                  className='block'
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className='group relative min-h-88 cursor-pointer overflow-hidden rounded-sm'
                  >
                    <motion.div
                      className='absolute inset-0 bg-cover bg-center'
                      style={{ backgroundImage: `url(${project.image})` }}
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent' />
                    <div className='absolute right-3 top-3'>
                      <span
                        className={`rounded-sm border px-2.5 py-1 text-caption font-medium tracking-widest uppercase ${statusColors[project.status] ?? ''}`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <div className='absolute bottom-0 left-0 right-0 p-6'>
                      <h3 className='text-lg font-serif text-white'>
                        {project.title}
                      </h3>
                      <p className='mt-1 text-sm text-white/60'>
                        {project.location}
                      </p>
                      <p className='mt-0.5 text-label text-white/40'>
                        {project.date}
                      </p>
                      <motion.div
                        className='mt-3 flex items-center gap-1 text-label font-medium tracking-widest text-secondary uppercase'
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                      >
                        View Landmark
                        <span className='material-symbols-outlined text-sm'>
                          arrow_right_alt
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </LayoutGroup>

          <motion.div
            className='mt-10 text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className='text-body-sm text-on-surface-variant'>
              Viewing {filtered.length} of {allProjects.length} projects
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
