import { Link, useLocation } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";
import logoUrl from "@/assets/logo.png";

const navLinks = [
	{ to: "/portfolio", label: "Portfolio" },
	{ to: "/services", label: "Services" },
	{ to: "/sustainability", label: "Sustainability" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
] as const;

const headerVariants = {
	top: { height: 80 },
	scrolled: { height: 64 },
};

const linkVariants = {
	hover: { color: "#eebd8e" },
};

const underlineVariants = {
	rest: { width: "0%" },
	hover: { width: "100%" },
};

const shineVariants = {
	rest: { x: "-100%" },
	hover: { x: "200%" },
};

export default function Header() {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const { pathname } = useLocation();

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 20);
	});

	// Close mobile menu on route change
	// biome-ignore lint/correctness/useExhaustiveDependencies: closes menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	// Lock body scroll when mobile menu is open
	useEffect(() => {
		if (mobileOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
		return () => {
			document.body.style.overflow = "";
		};
	}, [mobileOpen]);

	const isActive = (to: string) => pathname === to;

	return (
		<>
			<motion.header
				className={`fixed top-0 z-50 w-full bg-tertiary/95 backdrop-blur-md transition-[border-color] duration-300 ${
					scrolled ? "border-b border-outline-variant/30" : ""
				}`}
				initial="top"
				animate={scrolled ? "scrolled" : "top"}
				variants={headerVariants}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<nav
					aria-label="Main navigation"
					className="mx-auto flex h-full max-w-360 items-center justify-between px-4 md:px-16"
				>
					{/* Logo */}
					<motion.div whileHover="hover" variants={linkVariants}>
						<Link
							to="/"
							className="flex items-center gap-3 font-serif tracking-[0.15em] text-on-tertiary no-underline uppercase"
						>
							<Image
								src={logoUrl}
								alt="Shaon Landmarks"
								className="h-10 w-auto brightness-0 invert-[1]"
								width={40}
								height={40}
								priority
							/>
							<span className="hidden font-extrabold text-secondary-fixed-dim sm:inline">
								Shaon Landmarks
							</span>
						</Link>
					</motion.div>

					{/* Desktop navigation */}
					<div className="hidden items-center gap-10 md:flex">
						{navLinks.map((link) => {
							const active = isActive(link.to);
							return (
								<motion.div
									key={link.to}
									initial="rest"
									whileHover="hover"
									variants={linkVariants}
								>
									<Link
										to={link.to}
										className={`relative text-xs font-medium tracking-widest text-on-tertiary no-underline uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
											active ? "text-secondary-fixed-dim" : ""
										}`}
									>
										{link.label}
										<motion.div
											className="absolute -bottom-1 left-0 h-px bg-secondary-fixed-dim"
											variants={underlineVariants}
											transition={{ duration: 0.3 }}
										/>
									</Link>
								</motion.div>
							);
						})}
					</div>

					{/* Right side: CTA + Mobile toggle */}
					<div className="flex items-center gap-4">
						<motion.a
							href="#inquiry"
							className="relative overflow-hidden rounded bg-secondary px-5 py-2.5 text-xs font-medium tracking-widest text-on-secondary no-underline uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
							whileHover="hover"
							initial="rest"
						>
							<motion.div
								className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
								variants={shineVariants}
								transition={{ duration: 0.6 }}
							/>
							<span className="relative z-10">Inquiry</span>
						</motion.a>

						<button
							type="button"
							onClick={() => setMobileOpen(true)}
							className="flex h-8 w-8 items-center justify-center text-on-tertiary md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
							aria-label="Open menu"
							aria-expanded={mobileOpen}
							aria-controls="mobile-menu"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="1.5"
								className="h-5 w-5"
							>
								<title>Open menu</title>
								<path d="M3 6h18M3 12h18M3 18h18" />
							</svg>
						</button>
					</div>
				</nav>
			</motion.header>

			{/* Mobile menu drawer */}
			<AnimatePresence>
				{mobileOpen && (
					<>
						<motion.div
							key="mobile-overlay"
							className="fixed inset-0 z-40 bg-tertiary/60 md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							onClick={() => setMobileOpen(false)}
							aria-hidden="true"
						/>

						<motion.aside
							id="mobile-menu"
							role="dialog"
							aria-modal="true"
							aria-label="Mobile navigation"
							className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-tertiary px-6 py-6 md:hidden"
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ duration: 0.3, ease: [0.25, 0.1, 0.15, 1] }}
						>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setMobileOpen(false)}
									className="flex h-8 w-8 items-center justify-center text-on-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
									aria-label="Close menu"
								>
									<svg
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.5"
										className="h-5 w-5"
									>
										<title>Close menu</title>
										<path d="M6 6l12 12M18 6L6 18" />
									</svg>
								</button>
							</div>

							<nav
								className="mt-12 flex flex-col gap-8"
								aria-label="Mobile navigation"
							>
								{navLinks.map((link) => {
									const active = isActive(link.to);
									return (
										<motion.div
											key={link.to}
											initial="rest"
											whileHover="hover"
											variants={linkVariants}
										>
											<Link
												to={link.to}
												className={`relative text-xl font-serif tracking-wider text-on-tertiary no-underline uppercase ${
													active ? "text-secondary-fixed-dim" : ""
												}`}
											>
												{link.label}
											</Link>
										</motion.div>
									);
								})}
							</nav>

							<div className="mt-auto">
								<motion.a
									href="#inquiry"
									className="relative flex w-full items-center justify-center overflow-hidden rounded bg-secondary px-5 py-3 text-xs font-medium tracking-widest text-on-secondary no-underline uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
									whileHover="hover"
									initial="rest"
								>
									<motion.div
										className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
										variants={shineVariants}
										transition={{ duration: 0.6 }}
									/>
									<span className="relative z-10">Inquiry</span>
								</motion.a>
							</div>
						</motion.aside>
					</>
				)}
			</AnimatePresence>
		</>
	);
}
