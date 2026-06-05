import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
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
			<div className="mx-auto max-w-360 px-4 md:px-16">
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
					<motion.div
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="hidden md:inline-block"
					>
						<Link
							to="/portfolio"
							className="inline-block rounded-sm border border-outline-variant px-5 py-2.5 text-[11px] font-medium tracking-widest text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary uppercase"
						>
							View All Projects
						</Link>
					</motion.div>
				</motion.div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
					{/* The Obsidian — col-span-7 */}
					<motion.div
						key={main.id}
						className="group relative col-span-7 h-100 cursor-pointer overflow-hidden rounded-sm md:h-200"
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
							<Image
								src={main.image}
								alt={main.title}
								layout="fullWidth"
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-0 transition-all duration-500 group-hover:border-16 border-white/5" />
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
							className="group relative h-96 cursor-pointer overflow-hidden rounded-sm"
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
								<Image
									src={rightTop.image}
									alt={rightTop.title}
									layout="fullWidth"
									className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
								/>
							</motion.div>
							<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
							<div className="absolute inset-0 border-0 transition-all duration-500 group-hover:border-16 border-white/5" />
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
							className="flex h-96 flex-col justify-center rounded-sm bg-surface-container-low p-8"
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
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<Link
									to="/contact"
									className="mt-4 inline-block self-start rounded-sm border border-outline-variant px-5 py-2 text-[10px] font-medium tracking-widest text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary uppercase"
								>
									Notify Me
								</Link>
							</motion.div>
						</motion.div>
					</div>

					{/* Azure Waterfront — col-span-6 */}
					<motion.div
						key={secondaryLeft.id}
						className="group relative col-span-6 h-112.5 cursor-pointer overflow-hidden rounded-sm"
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
							<Image
								src={secondaryLeft.image}
								alt={secondaryLeft.title}
								layout="fullWidth"
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-0 transition-all duration-500 group-hover:border-16 border-white/5" />
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
						className="group relative col-span-6 h-112.5 cursor-pointer overflow-hidden rounded-sm"
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
							<Image
								src={secondaryRight.image}
								alt={secondaryRight.title}
								layout="fullWidth"
								className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100"
							/>
						</motion.div>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 transition-all duration-500 group-hover:opacity-40" />
						<div className="absolute inset-0 border-0 transition-all duration-500 group-hover:border-16 border-white/5" />
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

				<motion.div
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="mt-6 md:hidden"
				>
					<Link
						to="/portfolio"
						className="inline-block rounded-sm border border-outline-variant px-5 py-2.5 text-[11px] font-medium tracking-widest text-on-surface no-underline transition-colors hover:border-secondary hover:text-secondary uppercase"
					>
						View All Projects
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
