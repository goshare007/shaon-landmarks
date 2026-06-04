import { motion } from "framer-motion";

const leftVariants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.8, ease: [0.25, 0.1, 0.15, 1] },
	},
};

const rightVariants = {
	hidden: { opacity: 0, x: 40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.15, 1] },
	},
};

export function CtaSection() {
	return (
		<section className="bg-surface py-20 md:py-28">
			<div className="mx-auto max-w-[1440px] px-4 md:px-16">
				<div className="grid items-center gap-12 md:grid-cols-2">
					<motion.div
						variants={leftVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-80px" }}
					>
						<h2 className="text-4xl leading-tight text-on-surface font-serif sm:text-5xl">
							Begin Your Legacy
						</h2>
						<p className="mt-4 max-w-md text-base leading-relaxed text-on-surface-variant">
							Schedule a private consultation with our portfolio managers to
							discuss your future investment in timeless landmarks.
						</p>
						<motion.div
							className="mt-6 h-px w-16 bg-secondary"
							initial={{ width: 0 }}
							whileInView={{ width: 64 }}
							viewport={{ once: true }}
							transition={{ duration: 0.8, delay: 0.3 }}
						/>
						<div className="mt-6 flex items-center gap-3">
							<span className="material-symbols-outlined text-lg text-secondary">
								lock
							</span>
							<span className="text-[11px] font-medium tracking-[0.1em] text-on-surface-variant uppercase">
								Exclusive Portfolio Access
							</span>
						</div>
					</motion.div>

					<motion.div
						className="border border-outline-variant bg-white p-8"
						variants={rightVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-80px" }}
					>
						<h3 className="mb-6 text-[11px] font-medium tracking-[0.1em] text-on-surface-variant uppercase">
							Exclusive Portfolio Access
						</h3>
						<form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
							<motion.div
								className="group"
								whileFocus={{ scale: 1.01 }}
								transition={{ duration: 0.2 }}
							>
								<label
									htmlFor="name"
									className="mb-1 block text-[11px] font-medium tracking-[0.05em] text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary"
								>
									Full Name
								</label>
								<input
									id="name"
									type="text"
									placeholder="Your full name"
									className="w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface outline-none transition-colors focus:border-secondary"
								/>
							</motion.div>
							<motion.div
								className="group"
								whileFocus={{ scale: 1.01 }}
								transition={{ duration: 0.2 }}
							>
								<label
									htmlFor="cta-email"
									className="mb-1 block text-[11px] font-medium tracking-[0.05em] text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary"
								>
									Email Address
								</label>
								<input
									id="cta-email"
									type="email"
									placeholder="your@email.com"
									className="w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface outline-none transition-colors focus:border-secondary"
								/>
							</motion.div>
							<motion.div
								className="group"
								whileFocus={{ scale: 1.01 }}
								transition={{ duration: 0.2 }}
							>
								<label
									htmlFor="interest"
									className="mb-1 block text-[11px] font-medium tracking-[0.05em] text-on-surface-variant uppercase transition-colors group-focus-within:text-secondary"
								>
									Interest Area
								</label>
								<select
									id="interest"
									className="w-full border-0 border-b border-outline-variant bg-transparent px-0 pb-2 pt-1 text-[13px] text-on-surface-variant outline-none transition-colors focus:border-secondary"
								>
									<option>Residential Penthouses</option>
									<option>Commercial Landmarks</option>
									<option>Investment Opportunities</option>
								</select>
							</motion.div>
							<motion.button
								type="submit"
								className="w-full rounded-sm bg-primary py-3 text-[11px] font-medium tracking-[0.1em] text-on-primary transition-colors hover:bg-secondary uppercase"
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								Request Consultation
							</motion.button>
						</form>
					</motion.div>
				</div>

				<motion.div
					className="mt-16 overflow-hidden rounded-sm"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.8, delay: 0.4 }}
				>
					<div className="flex h-64 items-center justify-center bg-surface-container-low md:h-80">
						<div className="text-center">
							<span className="material-symbols-outlined block text-4xl text-secondary">
								map
							</span>
							<p className="mt-2 text-[11px] font-medium tracking-[0.1em] text-on-surface-variant uppercase">
								Gulshan Avenue, Dhaka — Prime Landmark Locations
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
