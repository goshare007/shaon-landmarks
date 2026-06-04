import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import DesktopNav from "./desktop-nav";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";

export default function Header() {
	const [isScrollHidden, setIsScrollHidden] = useState(false);
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			const scrollDiff = currentScrollY - lastScrollY.current;

			if (scrollDiff > 10 && currentScrollY > 80) {
				setIsScrollHidden(true);
			} else if (scrollDiff < -10 || currentScrollY <= 80) {
				setIsScrollHidden(false);
			}

			lastScrollY.current = currentScrollY;
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"sticky top-0 z-50 w-full border-b border-outline-variant bg-surface transition-transform duration-300",
				isScrollHidden && "-translate-y-full",
			)}
		>
			<div className="mx-auto flex max-w-360 items-center justify-between px-4 py-3 md:px-16 md:py-4">
				{/* Logo */}
				<Logo />

				{/* Desktop navigation — centered */}
				<div className="hidden md:flex md:flex-1 md:justify-center">
					<DesktopNav />
				</div>

				{/* Right actions */}
				<div className="flex flex-none items-center justify-end gap-3">
					{/* Bronze CTA — "Enquire" button, hidden on smallest screens */}
					<Link
						to="/contact"
						className="hidden sm:inline-flex items-center justify-center rounded bg-secondary px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-on-secondary transition-opacity duration-200 hover:opacity-85"
					>
						Let's Talk
					</Link>

					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
