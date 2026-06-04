import { motion } from "framer-motion";
import { allProjects } from "@/data/projects";

const sectionVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.1, 0.15, 1] },
	},
};

export function FeaturedProjects() {
	const main = allProjects[0];
	const rightTop = allProjects[1];
	const rightBottom = allProjects[2];
	const secondaryLeft = allProjects[3];
	const secondaryRight = allProjects[4];

	return (
		<section className="bg-white py-20 md:py-28">
			<div className="mx-auto max-w-[1440px] px-4 md:px-16">
				<motion.div
					className="mb-12 flex items-end justify-between"
					variants={sectionVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-80px" }}
				>
					<div>
						<span className="text-[11px] font-medium tracking-[0.15em] text-on-surface-variant uppercase">
							Iconic Developments
						</span>
						<h2 className="mt-3 text-3xl leading-tight text-on-surface font-serif sm:text-4xl">
							A curated selection of our most ambitious projects,
							<br />
							redefined for modern living.
						</h2>
					</div>
					<motion.a
						href="#"
						className="hidden shrink-0 rounded-sm border border-outline-variant px-5 py-2.5 text-[11px] font-medium tracking-[0.1em] text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary md:inline-block uppercase"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
					>
						View All Projects
					</motion.a>
				</motion.div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					{/* The Obsidian — col-span-7 */}
					<motion.div
						key={main.id}
						className="group relative col-span-7 h-[400px] cursor-pointer overflow-hidden rounded-sm md:h-[800px]"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.7, delay: 0.1 }}
					>
						<motion.div
							className="absolute inset-0"
							whileHover={{ scale: 1.1 }}
							transition={{ duration: 0.7 }}
						>
							<img
								src={main.image}
								alt={main.title}
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-[0px] transition-all duration-500 group-hover:border-[16px] border-white/5" />
						<motion.div
							className="absolute bottom-0 left-0 right-0 p-8"
							initial={{ y: 16, opacity: 0 }}
							whileHover={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.4 }}
						>
							<span className="text-[10px] font-medium tracking-[0.15em] text-secondary uppercase">
								{main.tagline}
							</span>
							<h3 className="mt-1 text-3xl font-serif text-white">
								{main.title}
							</h3>
							<p className="mt-2 max-w-md text-sm text-white/70">
								{main.description}
							</p>
						</motion.div>
					</motion.div>

					{/* Right column — col-span-5 */}
					<div className="col-span-5 flex flex-col gap-4">
						{/* Bronze Heights */}
						<motion.div
							key={rightTop.id}
							className="group relative h-[384px] cursor-pointer overflow-hidden rounded-sm"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.7, delay: 0.2 }}
						>
							<motion.div
								className="absolute inset-0"
								whileHover={{ scale: 1.1 }}
								transition={{ duration: 0.7 }}
							>
								<img
									src={rightTop.image}
									alt={rightTop.title}
									className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
								/>
							</motion.div>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
							<div className="absolute inset-0 border-[0px] transition-all duration-500 group-hover:border-[16px] border-white/5" />
							<motion.div
								className="absolute bottom-0 left-0 right-0 p-6"
								initial={{ y: 16, opacity: 0 }}
								whileHover={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.4 }}
							>
								<span className="text-[10px] font-medium tracking-[0.15em] text-secondary uppercase">
									{rightTop.tagline}
								</span>
								<h3 className="mt-1 text-2xl font-serif text-white">
									{rightTop.title}
								</h3>
							</motion.div>
						</motion.div>

						{/* The Marble Collection — text card */}
						<motion.div
							key={rightBottom.id}
							className="flex h-[384px] flex-col justify-center rounded-sm bg-surface-container-low p-8"
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-80px" }}
							transition={{ duration: 0.7, delay: 0.3 }}
						>
							<span className="text-[10px] font-medium tracking-[0.15em] text-secondary uppercase">
								{rightBottom.tagline}
							</span>
							<h3 className="mt-1 text-2xl font-serif text-on-surface">
								{rightBottom.title}
							</h3>
							<p className="mt-2 text-sm text-on-surface-variant">
								{rightBottom.description}
							</p>
							<motion.button
								type="button"
								className="mt-4 inline-block self-start rounded-sm border border-outline-variant px-5 py-2 text-[10px] font-medium tracking-[0.1em] text-on-surface transition-colors hover:border-secondary hover:text-secondary uppercase"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Notify Me
							</motion.button>
						</motion.div>
					</div>

					{/* Azure Waterfront — col-span-6 */}
					<motion.div
						key={secondaryLeft.id}
						className="group relative col-span-6 h-[450px] cursor-pointer overflow-hidden rounded-sm"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.7, delay: 0.3 }}
					>
						<motion.div
							className="absolute inset-0"
							whileHover={{ scale: 1.1 }}
							transition={{ duration: 0.7 }}
						>
							<img
								src={secondaryLeft.image}
								alt={secondaryLeft.title}
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-[0px] transition-all duration-500 group-hover:border-[16px] border-white/5" />
						<motion.div
							className="absolute bottom-0 left-0 right-0 p-8"
							initial={{ y: 16, opacity: 0 }}
							whileHover={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.4 }}
						>
							<span className="text-[10px] font-medium tracking-[0.15em] text-secondary uppercase">
								{secondaryLeft.tagline}
							</span>
							<h3 className="mt-1 text-2xl font-serif text-white">
								{secondaryLeft.title}
							</h3>
							<p className="mt-2 max-w-md text-sm text-white/70">
								{secondaryLeft.description}
							</p>
						</motion.div>
					</motion.div>

					{/* The Skyline Plaza — col-span-6 */}
					<motion.div
						key={secondaryRight.id}
						className="group relative col-span-6 h-[450px] cursor-pointer overflow-hidden rounded-sm"
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-80px" }}
						transition={{ duration: 0.7, delay: 0.3 }}
					>
						<motion.div
							className="absolute inset-0"
							whileHover={{ scale: 1.1 }}
							transition={{ duration: 0.7 }}
						>
							<img
								src={secondaryRight.image}
								alt={secondaryRight.title}
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-[0px] transition-all duration-500 group-hover:border-[16px] border-white/5" />
						<motion.div
							className="absolute bottom-0 left-0 right-0 p-8"
							initial={{ y: 16, opacity: 0 }}
							whileHover={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.4 }}
						>
							<span className="text-[10px] font-medium tracking-[0.15em] text-secondary uppercase">
								{secondaryRight.tagline}
							</span>
							<h3 className="mt-1 text-2xl font-serif text-white">
								{secondaryRight.title}
							</h3>
							<p className="mt-2 max-w-md text-sm text-white/70">
								{secondaryRight.description}
							</p>
						</motion.div>
					</motion.div>
				</div>

				<motion.a
					href="#"
					className="mt-6 inline-block rounded-sm border border-outline-variant px-5 py-2.5 text-[11px] font-medium tracking-[0.1em] text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary md:hidden uppercase"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					View All Projects
				</motion.a>
			</div>
		</section>
	);
}
