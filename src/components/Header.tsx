import { Link, useRouterState } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
	{ to: "/portfolio", label: "Portfolio" },
	{ to: "/services", label: "Services" },
	{ to: "/sustainability", label: "Sustainability" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
] as const;

type NavLink = (typeof navLinks)[number];

const headerVariants = {
	top: { height: 80 },
	scrolled: { height: 64 },
};

const shineVariants = {
	rest: { x: "-100%" },
	hover: { x: "200%" },
};

// ─── Desktop nav with sliding indicator ──────────────────────────────────────

function DesktopNav({ pathname }: { pathname: string }) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [hoverStyle, setHoverStyle] = useState<React.CSSProperties>({});
	const [activeStyle, setActiveStyle] = useState<React.CSSProperties>({});
	const prevActiveIndexRef = useRef<number | null>(null);
	const isFirstRender = useRef(true);
	const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	const activeIndex = navLinks.findIndex((link) =>
		pathname.startsWith(link.to),
	);

	// Hover pill
	useLayoutEffect(() => {
		if (hoveredIndex === null) return;
		const el = tabRefs.current[hoveredIndex];
		if (!el) return;
		setHoverStyle({ left: el.offsetLeft, width: el.offsetWidth });
	}, [hoveredIndex]);

	// Sliding active underline
	useLayoutEffect(() => {
		const current = activeIndex >= 0 ? activeIndex : null;
		if (current === null) {
			setActiveStyle({ opacity: 0 });
			prevActiveIndexRef.current = null;
			return;
		}
		const el = tabRefs.current[current];
		if (!el) return;

		const { offsetLeft, offsetWidth } = el;

		if (isFirstRender.current) {
			isFirstRender.current = false;
			prevActiveIndexRef.current = current;
			setActiveStyle({
				transform: `translateX(${offsetLeft}px)`,
				width: offsetWidth,
				opacity: 1,
			});
			return;
		}

		const prev = prevActiveIndexRef.current;
		if (prev !== null && prev !== current) {
			const prevEl = tabRefs.current[prev];
			if (prevEl) {
				setActiveStyle({
					transform: `translateX(${prevEl.offsetLeft}px)`,
					width: offsetWidth,
					opacity: 1,
					transition: "none",
				});
				requestAnimationFrame(() => {
					setActiveStyle({
						transform: `translateX(${offsetLeft}px)`,
						width: offsetWidth,
						opacity: 1,
						transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
					});
				});
			}
		} else {
			setActiveStyle({
				transform: `translateX(${offsetLeft}px)`,
				width: offsetWidth,
				opacity: 1,
			});
		}

		prevActiveIndexRef.current = current;
	}, [activeIndex]);

	return (
		<div className="relative hidden md:flex">
			{/* Hover pill */}
			<div
				className="pointer-events-none absolute inset-y-0 rounded-full bg-secondary-fixed-dim/50 transition-all duration-300 ease-out"
				style={{ ...hoverStyle, opacity: hoveredIndex !== null ? 1 : 0 }}
			/>

			{/* Sliding active underline */}
			<div
				className="absolute -bottom-1 h-px rounded-full bg-secondary-fixed-dim"
				style={activeStyle}
			/>

			{/* Links */}
			<div className="relative flex items-center gap-1">
				{navLinks.map((link, index) => (
					<Link
						key={link.to}
						to={link.to}
						ref={(el) => {
							tabRefs.current[index] = el;
						}}
						onMouseEnter={() => setHoveredIndex(index)}
						onMouseLeave={() => setHoveredIndex(null)}
						className={cn(
							"relative rounded-full px-3 py-2 text-xs font-medium tracking-widest uppercase no-underline transition-colors duration-300",
							"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2",
							index === activeIndex
								? "text-secondary-fixed-dim"
								: "text-on-tertiary/70 hover:text-on-tertiary",
						)}
					>
						{link.label}
					</Link>
				))}
			</div>
		</div>
	);
}

// ─── Header ───────────────────────────────────────────────────────────────────

export default function Header() {
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	useMotionValueEvent(scrollY, "change", (latest) => {
		setScrolled(latest > 20);
	});

	const isActive = (link: NavLink) => pathname.startsWith(link.to);

	return (
		<motion.header
			className={cn(
				"fixed top-0 z-50 w-full bg-tertiary/95 backdrop-blur-md transition-[border-color] duration-300",
				scrolled && "border-b border-outline-variant/30",
			)}
			initial="top"
			animate={scrolled ? "scrolled" : "top"}
			variants={headerVariants}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<nav
				aria-label="Main navigation"
				className="mx-auto flex h-full w-full max-w-360 items-center justify-between px-4 md:px-16"
			>
				{/* Logo */}
				<Link
					to="/"
					className="flex items-center md:gap-3 tracking-wide md:tracking-widest  text-on-tertiary no-underline uppercase"
				>
					<Image
						priority
						layout="fullWidth"
						src={logo}
						alt="Logo"
						className="h-12 w-auto mb-2 invert"
					/>

					<span className=" font-extrabold text-secondary-fixed-dim sm:inline">
						Shaon Landmarks
					</span>
				</Link>

				{/* Desktop navigation */}
				<DesktopNav pathname={pathname} />

				{/* Right side: CTA + Mobile toggle */}
				<div className="flex items-center gap-2 md:gap-4">
					<Button
						asChild
						className="relative hidden overflow-hidden rounded bg-secondary px-5 py-2.5 text-xs font-medium tracking-widest text-on-secondary uppercase sm:inline-flex"
					>
						<motion.a href="#inquiry" whileHover="hover" initial="rest">
							<motion.div
								className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
								variants={shineVariants}
								transition={{ duration: 0.6 }}
							/>
							<span className="relative z-10">Inquiry</span>
						</motion.a>
					</Button>

					<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="text-on-tertiary hover:bg-on-tertiary/10 md:hidden"
							>
								<Menu className="h-6 w-6" />
							</Button>
						</SheetTrigger>

						<SheetContent
							side="right"
							className="flex w-full max-w-sm flex-col bg-tertiary px-6 py-6"
						>
							<SheetTitle className="text-sm font-medium text-on-tertiary-variant">
								Menu
							</SheetTitle>

							<nav
								className="flex flex-col gap-4 mt-8"
								aria-label="Mobile navigation"
							>
								{navLinks.map((link, index) => (
									<motion.div
										key={link.to}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.05 }}
									>
										<Button
											variant="ghost"
											asChild
											className={cn(
												"w-full justify-start rounded-lg px-4 py-3 text-base font-medium tracking-wide uppercase",
												isActive(link)
													? "bg-secondary/20 text-secondary-fixed-dim hover:bg-secondary/30"
													: "text-on-tertiary hover:bg-on-tertiary/5",
											)}
										>
											<Link to={link.to} onClick={() => setSheetOpen(false)}>
												{link.label}
											</Link>
										</Button>
									</motion.div>
								))}
							</nav>

							<div className="mt-auto pt-6">
								<Button
									asChild
									className="relative w-full overflow-hidden rounded-lg bg-secondary text-sm font-medium tracking-widest text-on-secondary uppercase"
								>
									<motion.a href="#inquiry" whileHover="hover" initial="rest">
										<motion.div
											className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/20 to-transparent"
											variants={shineVariants}
											transition={{ duration: 0.6 }}
										/>
										<span className="relative z-10">Start Inquiry</span>
									</motion.a>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</motion.header>
	);
}
