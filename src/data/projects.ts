export interface Project {
	id: string;
	title: string;
	slug: string;
	tagline: string;
	description: string;
	status: "Completed" | "Ongoing" | "Upcoming";
	location: string;
	date: string;
	image: string;
}

const HERO_IMAGE =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuC8BwoMYbrQ28fJaSOuEe1WTlrkDlfMA88vVpBY222NhODQicFYS6DyGBlOgd_PHVThWexPgv-GSa-3s56VDpc4_HW0fILv1rZnccogPrmXSkveZGIB1RF1XBne-SRb9paH9a-dvj7u3pLQUCctm5cJ33NuwaC5uWF1S3sONXSBQDu2UKWhvwJu_tRq4_WPChZGm8BTzRN_glRyQlioVMe3G5t4x6qj0CRdiL_Oj33_cEeqQQnR9pYOmMiKt-1-5-ShIjIjgoZEE9U";

const PROJ_IMAGE_1 =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuCPgx4ZZVXEQeU7To_9RxhQoQtr9PSe2DRVJqvwFU-iwdE8vMYAW9fG4TqcCqMQTQOWmS1Wqc0w1mtP7-Ro2BCDMGkUY4p4AkClwDtLZWDGhoqDMguVyCFinp8_e6z64wfcRH5LUkuJLmjb9t_NzWoQJkF7jzJytWNrE0LgrkIOO3vVYq4g2wM4OWEZ4Kj1L7d_dnT9UHFJJvhbyw8pLD6TM7sWS_KzQgTl6jNniNHccfnFH1VDvgXz7x0zwWUA4nlwNaKGrudhdss";

const PROJ_IMAGE_2 =
	"https://lh3.googleusercontent.com/aida-public/AB6AXuDH0UUTwjdUCB4t4iubpCsXTtABjLNyo_5lY7WBisXBpFWKK0aGOq7qMJHgsaaUgxsGpES7LZ_T_hkCxyUglZows8EroJJshqhCbsDpxE3OgWSOqFXJGDX_EhaqlikVhKKXXE6awesI88VafUzN4DyoJUip4nc2P05--xRhWfnafehhcR9FoDcZv1Q2aeD3WbuQ-jVRs4OJFnXqCUvpm24L-Vh6oqW2jbgbeL_fpHiqgRdG2xHF3rGMRgwXWioSCs9ACZd2l__88FM";

const PROJ_IMAGE_3 = HERO_IMAGE;

const PROJ_IMAGE_4 = PROJ_IMAGE_1;

export const allProjects: Project[] = [
	{
		id: "1",
		title: "The Obsidian",
		slug: "the-obsidian",
		tagline: "Residential Milestone",
		description: "A masterclass in dark aesthetics and light-filled spaces.",
		status: "Completed",
		location: "Gulshan, Dhaka",
		date: "Handed Over: Oct 2023",
		image: PROJ_IMAGE_1,
	},
	{
		id: "2",
		title: "Bronze Heights",
		slug: "bronze-heights",
		tagline: "Luxury Penthouse",
		description:
			"Elevated living with panoramic views and bronze-accented interiors.",
		status: "Ongoing",
		location: "Nasirabad, Chattogram",
		date: "Est: Dec 2025",
		image: PROJ_IMAGE_2,
	},
	{
		id: "3",
		title: "The Marble Collection",
		slug: "the-marble-collection",
		tagline: "Upcoming",
		description:
			"An exclusive trio of villas featuring Italian Carrara marble and sustainable heating systems.",
		status: "Upcoming",
		location: "Purbachal, Dhaka",
		date: "Launch: Q2 2024",
		image: HERO_IMAGE,
	},
	{
		id: "4",
		title: "Azure Waterfront",
		slug: "azure-waterfront",
		tagline: "Ongoing Development",
		description:
			"Serene lakeside living with panoramic views of the Gulshan Lake.",
		status: "Ongoing",
		location: "Gulshan, Dhaka",
		date: "Est: Dec 2025",
		image: PROJ_IMAGE_3,
	},
	{
		id: "5",
		title: "The Skyline Plaza",
		slug: "the-skyline-plaza",
		tagline: "Upcoming Landmark",
		description:
			"A revolutionary commercial hub at the intersection of innovation and tradition.",
		status: "Upcoming",
		location: "Banani, Dhaka",
		date: "Launch: Q3 2024",
		image: PROJ_IMAGE_4,
	},
];
