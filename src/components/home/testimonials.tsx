import { motion } from "framer-motion";

export function TestimonialSection() {
	return (
		<section className="relative bg-tertiary py-20 md:py-28">
			<div className="absolute inset-0 overflow-hidden">
				<div className="grid h-full grid-cols-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="border-r border-white/5" />
					))}
				</div>
				<div className="grid h-full grid-rows-6">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="border-b border-white/5" />
					))}
				</div>
			</div>
			<div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-16">
				<motion.blockquote
					className="mx-auto max-w-3xl text-center"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.15, 1] }}
				>
					<motion.span
						className="material-symbols-outlined inline-block text-5xl text-secondary"
						initial={{ opacity: 0, scale: 0.5 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						format_quote
					</motion.span>
					<p className="mt-6 text-2xl leading-relaxed text-on-tertiary font-serif italic md:text-3xl">
						&ldquo;Shaon Landmarks doesn&rsquo;t just build housing; they curate
						an environment of dignity and permanence. Their commitment to
						architectural integrity in the heart of Dhaka is truly
						transformative.&rdquo;
					</p>
					<footer className="mt-8">
						<strong className="text-[13px] font-medium tracking-[0.1em] text-on-tertiary uppercase">
							S. Rahman
						</strong>
						<p className="mt-1 text-[13px] text-white/60">
							Chief Architect, Urbana Bangladesh
						</p>
					</footer>
				</motion.blockquote>
			</div>
		</section>
	);
}
