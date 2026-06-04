import { motion } from "framer-motion";
import { pillars } from "@/data/pillars";

const iconMap: Record<string, string> = {
	shield: "shield",
	architecture: "architecture",
	history_edu: "history_edu",
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.7, ease: [0.25, 0.1, 0.15, 1] },
	},
};

export function PillarsSection() {
	return (
		<section className="bg-surface-container-low py-20 md:py-28">
			<div className="mx-auto max-w-[1440px] px-4 md:px-16">
				<motion.div
					className="grid gap-12 md:grid-cols-3"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-80px" }}
				>
					{pillars.map((pillar) => (
						<motion.div
							key={pillar.id}
							className="group"
							variants={cardVariants}
							whileHover="hover"
						>
							<span className="inline-flex items-center justify-center text-2xl text-secondary">
								<span className="material-symbols-outlined text-3xl">
									{iconMap[pillar.icon] || pillar.icon}
								</span>
							</span>
							<h3 className="mb-3 mt-4 text-lg font-serif text-on-surface">
								{pillar.title}
							</h3>
							<motion.div
								className="mb-4 h-px bg-secondary"
								initial={{ width: "3rem" }}
								whileHover={{ width: "100%" }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
							/>
							<p className="text-sm leading-relaxed text-on-surface-variant">
								{pillar.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
