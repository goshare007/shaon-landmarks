/**
 * TO ADD A TESTIMONIAL:
 *   1. Copy one of the objects below.
 *   2. Paste it before the closing `]` (add a comma after the entry above).
 *   3. Fill in `quote`, `name`, and `role`.
 *   The `id` is auto-generated — no need to set it manually.
 *
 * TO EDIT: Just change the `quote`, `name`, or `role` fields.
 * TO REMOVE: Delete the entire object (including its comma).
 */

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

function toId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const testimonials: Testimonial[] = [
  {
    id: toId('S. Rahman'),
    quote:
      "Shaon Landmarks doesn't just build housing; they curate an environment of dignity and permanence. Their commitment to architectural integrity in the heart of Dhaka is truly transformative.",
    name: 'S. Rahman',
    role: 'Chief Architect, Urbana Bangladesh',
  },
  {
    id: toId('Fatima & Kamal Hossain'),
    quote:
      'We invested in a Shaon Landmarks project based on reputation alone. The timely handover and build quality exceeded our expectations — every finish, every corner reflects obsession with detail.',
    name: 'Fatima & Kamal Hossain',
    role: 'Homeowners, Gulshan Residency',
  },
  {
    id: toId('Engr. Arefin Karim'),
    quote:
      "Shaon's approach to land development is methodical and transparent. As a partner on multiple projects, I have seen firsthand how they uphold ethical standards in an industry where shortcuts are common.",
    name: 'Engr. Arefin Karim',
    role: 'Development Partner, Eastern Holdings',
  },
  {
    id: toId('Nadia Sultana'),
    quote:
      'The interior design team transformed our vision into a living space that feels both luxurious and functional. The use of natural light and space planning is world-class.',
    name: 'Nadia Sultana',
    role: 'Client, The Marble Collection',
  },
  {
    id: toId('Tariq Mahmud'),
    quote:
      'What sets Shaon apart is their after-sales service. Even after handover, their team remains accessible and responsive. That level of commitment is rare in Bangladesh real estate.',
    name: 'Tariq Mahmud',
    role: 'Investor, Skyline Plaza',
  },
  {
    id: toId('Rokeya Akter'),
    quote:
      'The amenities and common spaces in our Shaon community are thoughtfully designed. Every detail, from the lobby finishes to the landscape planning, speaks of quality.',
    name: 'Rokeya Akter',
    role: 'Resident, Harmony Heights',
  },
  {
    id: toId('Zahid Hasan'),
    quote:
      'Shaon Landmarks made the entire purchasing process seamless. Their transparency in documentation and pricing gave us complete confidence throughout.',
    name: 'Zahid Hasan',
    role: 'First-time Buyer, Greenview Residency',
  },
  {
    id: toId('Sharmin & Rashed Chowdhury'),
    quote:
      'We compared several developers before choosing Shaon. The difference in material quality and construction standards was immediately visible. No regrets whatsoever.',
    name: 'Sharmin & Rashed Chowdhury',
    role: 'Homeowners, Lake Vista',
  },
];
