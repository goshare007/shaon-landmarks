export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote:
      "Shaon Landmarks doesn't just build housing; they curate an environment of dignity and permanence. Their commitment to architectural integrity in the heart of Dhaka is truly transformative.",
    name: 'S. Rahman',
    role: 'Chief Architect, Urbana Bangladesh',
  },
  {
    id: '2',
    quote:
      'We invested in a Shaon Landmarks project based on reputation alone. The timely handover and build quality exceeded our expectations — every finish, every corner reflects obsession with detail.',
    name: 'Fatima & Kamal Hossain',
    role: 'Homeowners, Gulshan Residency',
  },
  {
    id: '3',
    quote:
      "Shaon's approach to land development is methodical and transparent. As a partner on multiple projects, I have seen firsthand how they uphold ethical standards in an industry where shortcuts are common.",
    name: 'Engr. Arefin Karim',
    role: 'Development Partner, Eastern Holdings',
  },
  {
    id: '4',
    quote:
      'The interior design team transformed our vision into a living space that feels both luxurious and functional. The use of natural light and space planning is world-class.',
    name: 'Nadia Sultana',
    role: 'Client, The Marble Collection',
  },
  {
    id: '5',
    quote:
      'What sets Shaon apart is their after-sales service. Even after handover, their team remains accessible and responsive. That level of commitment is rare in Bangladesh real estate.',
    name: 'Tariq Mahmud',
    role: 'Investor, Skyline Plaza',
  },
];
