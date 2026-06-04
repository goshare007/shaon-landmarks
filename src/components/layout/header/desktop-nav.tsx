import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const navItems = [
	{ label: "Home", href: "/" as const },
	{ label: "Portfolio", href: "/portfolio" as const },
	{ label: "Services", href: "/services" as const },
	{ label: "About", href: "/about" as const },
	{ label: "Contact", href: "/contact" as const },
] as const;

export default function DesktopNav() {
	const { pathname } = useLocation();

	return (
		<nav className="flex items-center">
			<ul className="flex items-center gap-0">
				{navItems.map((item) => {
					const isActive =
						item.href === "/"
							? pathname === "/"
							: pathname.startsWith(item.href);

					return (
						<li key={item.href} className="group">
							<Link
								to={item.href}
								className={cn(
									"relative inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-200",
									isActive
										? "text-primary"
										: "text-on-surface-variant hover:text-primary",
								)}
							>
								{item.label}

								{/* Active indicator — architectural 1.5px line */}
								<span
									className={cn(
										"absolute bottom-0 left-1/2 h-[1.5px] w-5 -translate-x-1/2 bg-primary transition-all duration-200",
										isActive
											? "opacity-100"
											: "opacity-0 group-hover:opacity-50",
									)}
								/>
							</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
}
