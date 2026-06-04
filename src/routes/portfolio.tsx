import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { allProjects } from "@/data/projects";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDH0UUTwjdUCB4t4iubpCsXTtABjLNyo_5lY7WBisXBpFWKK0aGOq7qMJHgsaaUgxsGpES7LZ_T_hkCxyUglZows8EroJJshqhCbsDpxE3OgWSOqFXJGDX_EhaqlikVhKKXXE6awesI88VafUzN4DyoJUip4nc2P05--xRhWfnafehhcR9FoDcZv1Q2aeD3WbuQ-jVRs4OJFnXqCUvpm24L-Vh6oqW2jbgbeL_fpHiqgRdG2xHF3rGMRgwXWioSCs9ACZd2l__88FM";

type Filter = "All" | "Ongoing" | "Upcoming" | "Completed";

const filters: Filter[] = ["All", "Ongoing", "Upcoming", "Completed"];

const statusColors: Record<string, string> = {
	Completed: "bg-emerald-900/60 text-emerald-100 border-emerald-700",
	Ongoing: "bg-amber-900/60 text-amber-100 border-amber-700",
	Upcoming: "bg-sky-900/60 text-sky-100 border-sky-700",
};

export const Route = createFileRoute("/portfolio")({
	component: Portfolio,
});

function Portfolio() {
	const [activeFilter, setActiveFilter] = useState<Filter>("All");

	const filtered =
		activeFilter === "All"
			? allProjects
			: allProjects.filter((p) => p.status === activeFilter);

	return (
		<main>
			<section className="relative h-[50vh] min-h-[24rem] overflow-hidden bg-tertiary">
				<motion.div
					className="absolute inset-0 bg-cover bg-center will-change-transform"
					style={{ backgroundImage: `url(${HERO_IMAGE})` }}
					animate={{ scale: [1, 1.1] }}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70" />
				<div className="relative z-10 flex h-full items-center">
					<motion.div
						className="mx-auto w-full max-w-[1440px] px-4 md:px-16"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
					>
						<span className="text-[11px] font-medium tracking-[0.15em] text-secondary uppercase">
							Selected Works
						</span>
						<h1 className="mt-3 text-5xl leading-[1.05] tracking-[-0.02em] text-on-tertiary font-serif sm:text-6xl md:text-7xl">
							Our Landmarks
						</h1>
						<p className="mt-4 max-w-xl text-base leading-relaxed text-[#d6d8d8]">
							A curated portfolio of architectural excellence across Bangladesh.
						</p>
					</motion.div>
				</div>
			</section>

			<section className="bg-surface py-12 md:py-16">
				<div className="mx-auto max-w-[1440px] px-4 md:px-16">
					<motion.div
						className="mb-8 flex items-center justify-between"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<span className="text-[13px] font-medium text-on-surface-variant">
							{allProjects.length} Total Projects
						</span>
					</motion.div>

					<motion.div
						className="mb-10 flex flex-wrap gap-2 border-b border-outline-variant pb-4"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5, delay: 0.1 }}
					>
						{filters.map((f) => (
							<button
								key={f}
								type="button"
								onClick={() => setActiveFilter(f)}
								className={`rounded-sm px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-colors ${
									activeFilter === f
										? "bg-secondary text-on-secondary"
										: "text-on-surface-variant hover:text-secondary"
								}`}
							>
								{f}
							</button>
						))}
					</motion.div>

					<motion.div
						className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
						layout
					>
						{filtered.map((project, i) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-60px" }}
								transition={{ duration: 0.5, delay: i * 0.08 }}
								className="group relative min-h-[22rem] cursor-pointer overflow-hidden rounded-sm"
							>
								<motion.div
									className="absolute inset-0 bg-cover bg-center"
									style={{ backgroundImage: `url(${project.image})` }}
									whileHover={{ scale: 1.08 }}
									transition={{ duration: 0.6 }}
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
								<div className="absolute right-3 top-3">
									<span
										className={`rounded-sm border px-2.5 py-1 text-[10px] font-medium tracking-[0.1em] uppercase ${statusColors[project.status]}`}
									>
										{project.status}
									</span>
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-6">
									<h3 className="text-lg font-serif text-white">
										{project.title}
									</h3>
									<p className="mt-1 text-sm text-white/60">
										{project.location}
									</p>
									<p className="mt-0.5 text-[11px] text-white/40">
										{project.date}
									</p>
									<motion.div
										className="mt-3 flex items-center gap-1 text-[11px] font-medium tracking-[0.1em] text-secondary uppercase"
										initial={{ opacity: 0, x: -10 }}
										whileHover={{ opacity: 1, x: 0 }}
									>
										View Landmark
										<span className="material-symbols-outlined text-sm">
											arrow_right_alt
										</span>
									</motion.div>
								</div>
							</motion.div>
						))}
					</motion.div>

					<motion.div
						className="mt-10 text-center"
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
					>
						<p className="mb-4 text-[13px] text-on-surface-variant">
							Viewing {filtered.length} of {allProjects.length} projects
						</p>
						<motion.button
							type="button"
							className="rounded-sm border border-outline-variant px-6 py-3 text-[11px] font-medium tracking-[0.1em] text-on-surface transition-colors hover:border-secondary hover:text-secondary uppercase"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
						>
							Load More Landmarks
						</motion.button>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
