import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuC8BwoMYbrQ28fJaSOuEe1WTlrkDlfMA88vVpBY222NhODQicFYS6DyGBlOgd_PHVThWexPgv-GSa-3s56VDpc4_HW0fILv1rZnccogPrmXSkveZGIB1RF1XBne-SRb9paH9a-dvj7u3pLQUCctm5cJ33NuwaC5uWF1S3sONXSBQDu2UKWhvwJu_tRq4_WPChZGm8BTzRN_glRyQlioVMe3G5t4x6qj0CRdiL_Oj33_cEeqQQnR9pYOmMiKt-1-5-ShIjIjgoZEE9U";

const stagger = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.4 },
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.1, 0.15, 1] as const },
	},
};

const slideUp = {
	hidden: { opacity: 0, y: "100%" },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.9, ease: [0.25, 0.1, 0.15, 1] as const },
	},
};

const STATS = [
	{ num: "48", label: "Projects" },
	{ num: "16", label: "Years" },
	{ num: "3.2M", label: "Sq. Feet" },
];

export function HeroSection() {
	const rightPanelRef = useRef<HTMLDivElement>(null);

	// Mouse positions for the parallax effect
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	// Smooth out the mouse values
	const smoothX = useSpring(x, { damping: 25, stiffness: 150 });
	const smoothY = useSpring(y, { damping: 25, stiffness: 150 });

	// Map mouse positions to slight movement offsets
	const imageX = useTransform(smoothX, [-0.5, 0.5], ["-3%", "3%"]);
	const imageY = useTransform(smoothY, [-0.5, 0.5], ["-3%", "3%"]);

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!rightPanelRef.current) return;
		const { width, height, left, top } =
			rightPanelRef.current.getBoundingClientRect();

		const mouseX = (e.clientX - left) / width - 0.5;
		const mouseY = (e.clientY - top) / height - 0.5;

		x.set(mouseX);
		y.set(mouseY);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		// Changed grid-cols-2 to grid-cols-1 on mobile, grid-cols-2 on desktop (md:)
		// Changed h-screen to min-h-screen on mobile to accommodate stacked content safely
		<section className="relative min-h-screen md:h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
			{/* LEFT PANEL */}
			{/* Adjusted padding for smaller screens (px-6 py-10 vs px-14 py-12) */}
			<motion.div className="relative z-10 bg-[#0a0a0a] flex flex-col justify-between px-6 py-10 md:px-14 md:py-12 overflow-hidden order-2 md:order-1">
				{/* Border divider hidden on mobile, visible on desktop */}
				<div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-secondary to-transparent opacity-60" />

				<motion.div
					variants={stagger}
					initial="hidden"
					animate="visible"
					className="flex flex-col h-full justify-between gap-12 md:gap-0"
				>
					{/* Main content */}
					<div className="flex-1 flex flex-col justify-center py-4 md:py-8">
						{/* Eyebrow */}
						<motion.div
							variants={fadeUp}
							className="flex items-center gap-4 mb-6 md:mb-9"
						>
							<div className="w-10 h-px bg-secondary" />
							<span className="text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-secondary-fixed-dim">
								Est. 2008 — Dhaka, Bangladesh
							</span>
						</motion.div>

						{/* Headline */}
						<h1 className="font-serif text-[clamp(36px,6vw,68px)] font-normal leading-[1.1] md:leading-[1.05] tracking-[-0.02em] text-white overflow-hidden">
							<motion.span className="block" variants={slideUp}>
								Architecting
							</motion.span>
							<motion.span
								className="block italic"
								style={{
									color: "transparent",
									WebkitTextStroke: "1px rgba(255,255,255,0.35)",
								}}
								variants={slideUp}
							>
								Tomorrow
							</motion.span>
						</h1>

						{/* Descriptor */}
						<motion.div
							variants={fadeUp}
							className="flex items-start gap-5 mt-6 md:mt-9"
						>
							<div className="w-0.5 min-h-14 bg-secondary shrink-0 mt-0.5" />
							<p className="text-xs md:text-sm leading-relaxed text-white/50 max-w-xs font-light">
								Defining the skyline with unyielding integrity and sophisticated
								design. Crafting the future of high-end real estate.
							</p>
						</motion.div>

						{/* Stats (Flex-wrap added for safety on narrow screens) */}
						<motion.div
							variants={fadeUp}
							className="flex flex-wrap items-center gap-6 md:gap-8 mt-8 md:mt-11"
						>
							{STATS.map((stat, i) => (
								<div
									key={stat.label}
									className="flex items-center gap-6 md:gap-8"
								>
									{i > 0 && <div className="w-px h-8 bg-white/10" />}
									<div className="flex flex-col gap-1">
										<span className="font-serif text-[22px] md:text-[26px] text-white leading-none">
											{stat.num}
										</span>
										<span className="text-[8px] md:text-[9px] tracking-[0.18em] uppercase text-white/35 font-medium">
											{stat.label}
										</span>
									</div>
								</div>
							))}
						</motion.div>
					</div>

					{/* Bottom Controls */}
					<motion.div
						variants={fadeUp}
						className="flex justify-between items-end mt-4 md:mt-0"
					>
						<div className="flex flex-col gap-4">
							<Link
								to="/portfolio"
								className="relative overflow-hidden inline-flex items-center gap-4 bg-secondary text-on-secondary px-6 py-3 md:px-7 md:py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase no-underline rounded-sm w-fit hover:bg-[#8f6438] transition-colors duration-200"
							>
								<motion.div
									className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
									initial={{ x: "-100%" }}
									whileHover={{ x: "200%" }}
									transition={{ duration: 0.5 }}
								/>
								<span className="relative z-10">Explore Portfolio</span>
								{/** biome-ignore lint/a11y/noSvgWithoutTitle: this is fine */}
								<svg
									className="relative z-10 w-4 h-4"
									viewBox="0 0 16 16"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
								>
									<path d="M2 8h12M9 3l5 5-5 5" />
								</svg>
							</Link>
						</div>

						{/* Scroll indicator hidden on mobile to avoid layout crowding */}
						<div className="hidden md:flex flex-col items-center gap-2">
							<span
								className="text-[9px] tracking-[0.2em] uppercase text-white/25"
								style={{ writingMode: "vertical-rl" }}
							>
								Scroll
							</span>
							<motion.div
								className="w-px h-10 bg-linear-to-b from-white/20 to-transparent"
								animate={{ scaleY: [1, 0.6, 1], opacity: [0.4, 1, 0.4] }}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							/>
						</div>
					</motion.div>
				</motion.div>
			</motion.div>

			{/* RIGHT PANEL */}
			{/* Set a fixed height (like h-[45vh]) on mobile so both segments are cleanly visible, md:h-full on desktop */}
			{/** biome-ignore lint/a11y/noStaticElementInteractions: this is fine */}
			<div
				ref={rightPanelRef}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				className="relative h-[45vh] md:h-full overflow-hidden order-1 md:order-2"
			>
				<motion.div
					className="w-full h-full will-change-transform scale-[1.15]"
					style={{ x: imageX, y: imageY }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.2, delay: 0.2 }}
				>
					<Image
						src={HERO_IMAGE}
						alt="Architectural landmark"
						layout="fullWidth"
						className="h-full w-full object-cover object-center"
					/>
				</motion.div>

				<div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent pointer-events-none" />
				<div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent pointer-events-none" />

				{/* Location tag */}
				<motion.div
					className="absolute bottom-6 left-6 md:bottom-12 md:left-9 z-10"
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1.5 }}
				>
					<div
						className="flex items-center gap-3 px-4 py-3 rounded-sm border border-secondary/40"
						style={{
							background: "rgba(0,0,0,0.6)",
							backdropFilter: "blur(12px)",
						}}
					>
						<motion.div
							className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim shrink-0"
							animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
							transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
						/>
						<span className="text-[10px] tracking-[0.12em] uppercase text-white/70 font-medium">
							Dhaka Central — Tower IV
						</span>
					</div>
				</motion.div>

				{/* Year strip */}
				<motion.div
					className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 1.6 }}
				>
					<span
						className="text-[10px] font-medium tracking-[0.2em] text-white/50 uppercase"
						style={{ writingMode: "vertical-rl" }}
					>
						2025
					</span>
					<div className="w-px h-12 bg-linear-to-b from-secondary to-transparent" />
				</motion.div>
			</div>
		</section>
	);
}
