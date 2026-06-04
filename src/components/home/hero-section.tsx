import { motion, useScroll, useTransform } from "framer-motion";
const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuC8BwoMYbrQ28fJaSOuEe1WTlrkDlfMA88vVpBY222NhODQicFYS6DyGBlOgd_PHVThWexPgv-GSa-3s56VDpc4_HW0fILv1rZnccogPrmXSkveZGIB1RF1XBne-SRb9paH9a-dvj7u3pLQUCctm5cJ33NuwaC5uWF1S3sONXSBQDu2UKWhvwJu_tRq4_WPChZGm8BTzRN_glRyQlioVMe3G5t4x6qj0CRdiL_Oj33_cEeqQQnR9pYOmMiKt-1-5-ShIjIjgoZEE9U";

const containerVariants = {
	hidden: { opacity: 1 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: [0.25, 0.1, 0.15, 1] },
	},
};

export function HeroSection() {
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 1000], [0, 300]);
	const opacity = useTransform(scrollY, [0, 600], [1, 0]);

	return (
		<section className="relative h-screen overflow-hidden bg-tertiary">
			<motion.div className="absolute inset-0" style={{ y: bgY, opacity }}>
				<motion.div
					className="h-full w-full bg-cover bg-center will-change-transform"
					style={{
						backgroundImage: `url(${HERO_IMAGE})`,
					}}
					animate={{ scale: [1, 1.15] }}
					transition={{
						duration: 20,
						repeat: Infinity,
						repeatType: "reverse",
						ease: "easeInOut",
					}}
				/>
			</motion.div>
			<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
			<div className="relative z-10 flex h-full items-center">
				<motion.div
					className="mx-auto w-full max-w-[1440px] px-4 md:px-16"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="max-w-3xl">
						<motion.span
							className="text-[11px] font-medium tracking-[0.15em] text-secondary uppercase"
							variants={itemVariants}
						>
							Shaon Landmarks
						</motion.span>
						<motion.h1
							className="mt-6 text-5xl leading-[1.05] tracking-[-0.02em] text-on-tertiary font-serif sm:text-6xl md:text-7xl lg:text-8xl"
							variants={itemVariants}
						>
							Architecting
							<br />
							Tomorrow
						</motion.h1>
						<motion.p
							className="mt-6 max-w-xl text-base leading-relaxed text-[#d6d8d8] sm:text-lg"
							variants={itemVariants}
						>
							Defining the skyline with unyielding integrity and sophisticated
							design. Explore the future of high-end Bangladesh real estate.
						</motion.p>
						<motion.div
							className="mt-8 flex flex-wrap gap-4"
							variants={itemVariants}
						>
							<motion.a
								href="#"
								className="relative overflow-hidden rounded-sm bg-secondary px-6 py-3 text-[11px] font-medium tracking-[0.1em] text-on-secondary no-underline uppercase"
								whileHover="hover"
								initial="rest"
							>
								<motion.div
									className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
									variants={{
										rest: { x: "-100%" },
										hover: { x: "200%" },
									}}
									transition={{ duration: 0.6 }}
								/>
								<span className="relative z-10">Explore Portfolio</span>
							</motion.a>
						</motion.div>
					</div>
				</motion.div>
			</div>
			<motion.div
				className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
				animate={{ y: [0, 8, 0] }}
				transition={{
					duration: 2,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					className="h-5 w-5 text-white/50"
				>
					<path d="M12 5v14M5 12l7 7 7-7" />
				</svg>
			</motion.div>
		</section>
	);
}
