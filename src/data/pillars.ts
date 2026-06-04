export interface Pillar {
	id: string;
	title: string;
	description: string;
	icon: string;
}

export const pillars: Pillar[] = [
	{
		id: "1",
		title: "Integrity",
		description:
			"Our foundations are built on transparency and ethical excellence, ensuring every landmark stands as a testament to our word.",
		icon: "shield",
	},
	{
		id: "2",
		title: "Quality",
		description:
			"Meticulous attention to detail and premium materials converge to create spaces of unparalleled luxury and durability.",
		icon: "architecture",
	},
	{
		id: "3",
		title: "Legacy",
		description:
			"We don't just build structures; we create timeless landmarks that resonate through generations, defining the architectural heritage.",
		icon: "history_edu",
	},
];
