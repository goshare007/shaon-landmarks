import { Link } from "@tanstack/react-router";
import { cn } from "#/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import DesktopNav from "./desktop-nav";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
			<div className="mx-auto flex  items-center justify-between border-b border-custom/10 px-4 py-3 md:px-16 md:py-4">
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
						className={cn(
							buttonVariants({ size: "lg" }),
							"hidden md:flex px-5",
						)}
					>
						Let's Talk
					</Link>

					<MobileMenu />
				</div>
			</div>
		</header>
	);
}
