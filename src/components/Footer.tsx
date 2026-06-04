import { motion } from "framer-motion";
import logoUrl from "@/assets/logo.png";

const year = new Date().getFullYear();

const colVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.15, 1] },
	}),
};

const footerLinks = [
	{
		title: "Company",
		items: ["About Us", "Our Portfolio", "Sustainability", "Careers"],
	},
	{
		title: "Legal",
		items: [
			"RAJUK Certified",
			"REHAB Member",
			"Legal Disclosures",
			"Privacy Policy",
		],
	},
];

export default function Footer() {
	return (
		<footer className="bg-tertiary px-4 pb-6 pt-16">
			<div className="mx-auto max-w-[1440px]">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
					<motion.div
						className="space-y-4"
						custom={0}
						variants={colVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
					>
						<motion.img
							src={logoUrl}
							alt="Shaon Landmarks"
							className="h-10 w-auto brightness-0 invert"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
						/>
						<p className="text-[13px] leading-relaxed text-[#9a9c9c]">
							Redefining the skyline through structural precision and unwavering
							aesthetic integrity since 2008.
						</p>
					</motion.div>

					{footerLinks.map((col, i) => (
						<motion.div
							key={col.title}
							custom={i + 1}
							variants={colVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-60px" }}
						>
							<h4 className="mb-4 text-[11px] font-medium tracking-[0.1em] text-on-tertiary uppercase">
								{col.title}
							</h4>
							<ul className="space-y-3">
								{col.items.map((item) => (
									<motion.li
										key={item}
										whileHover={{ x: 4 }}
										transition={{ duration: 0.2 }}
									>
										<a
											href="#"
											className="text-[13px] text-[#9a9c9c] no-underline transition-colors hover:text-on-tertiary"
										>
											{item}
										</a>
									</motion.li>
								))}
							</ul>
						</motion.div>
					))}

					<motion.div
						custom={3}
						variants={colVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-60px" }}
					>
						<h4 className="mb-4 text-[11px] font-medium tracking-[0.1em] text-on-tertiary uppercase">
							Newsletter
						</h4>
						<p className="mb-3 text-[13px] text-[#9a9c9c]">
							Receive exclusive insights into our upcoming landmark
							developments.
						</p>
						<form
							className="flex border-b border-[#9a9c9c] pb-1"
							onSubmit={(e) => e.preventDefault()}
						>
							<input
								type="email"
								placeholder="Your email"
								className="min-w-0 flex-1 border-0 bg-transparent px-0 py-2 text-[12px] text-on-tertiary outline-none placeholder:text-[#9a9c9c]"
							/>
							<motion.button
								type="submit"
								className="flex items-center justify-center text-on-tertiary"
								whileHover={{ x: 4, color: "#eebd8e" }}
								transition={{ duration: 0.2 }}
							>
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
									className="h-4 w-4"
								>
									<path d="M5 12h14M12 5l7 7-7 7" />
								</svg>
							</motion.button>
						</form>
					</motion.div>
				</div>

				<motion.div
					className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#454747] pt-6 md:flex-row"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.5 }}
				>
					<p className="text-[11px] text-[#9a9c9c]">
						&copy; {year} Shaon Landmarks. Architectural Integrity. All Rights
						Reserved.
					</p>
					<div className="flex gap-5">
						<motion.a
							href="#"
							className="text-[#9a9c9c] transition-colors hover:text-on-tertiary"
							aria-label="Leaderboard"
							whileHover={{ scale: 1.2, color: "#eebd8e" }}
							whileTap={{ scale: 0.9 }}
						>
							<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
								<path d="M7.5 21H2V9l3-3 2.5 2.5V21zm0 0V8.5L4.5 6 2 8.5V21h5.5zM16 21h-4V3l2.5-2.5L17 3v18zm0 0V3l-2.5-2.5L11 3v18h5zM22 21h-5V10l2.5-2.5L22 10v11z" />
							</svg>
						</motion.a>
						<motion.a
							href="#"
							className="text-[#9a9c9c] transition-colors hover:text-on-tertiary"
							aria-label="Camera"
							whileHover={{ scale: 1.2, color: "#eebd8e" }}
							whileTap={{ scale: 0.9 }}
						>
							<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
								<path d="M12 17.5c2.33 0 4.5-1.87 4.5-4.5S14.33 8.5 12 8.5 7.5 10.37 7.5 13s1.87 4.5 4.5 4.5zm0-2c-1.29 0-2.5-1.03-2.5-2.5s1.21-2.5 2.5-2.5 2.5 1.03 2.5 2.5-1.21 2.5-2.5 2.5zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z" />
							</svg>
						</motion.a>
						<motion.a
							href="#"
							className="text-[#9a9c9c] transition-colors hover:text-on-tertiary"
							aria-label="Link"
							whileHover={{ scale: 1.2, color: "#eebd8e" }}
							whileTap={{ scale: 0.9 }}
						>
							<svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
								<path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
							</svg>
						</motion.a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
