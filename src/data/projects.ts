import azureWaterfront from '@/assets/images/projects/azure-waterfront.webp';
import bronzeHeights from '@/assets/images/projects/bronze-heights.webp';
import galleryImg1 from '@/assets/images/projects/gallery-1.webp';
import galleryImg2 from '@/assets/images/projects/gallery-2.webp';
import galleryImg3 from '@/assets/images/projects/gallery-3.webp';
import galleryImg4 from '@/assets/images/projects/gallery-4.webp';
import landmarkGallery1 from '@/assets/images/projects/landmark-gallery-1.webp';
import landmarkGallery2 from '@/assets/images/projects/landmark-gallery-2.webp';
import landmarkGallery3 from '@/assets/images/projects/landmark-gallery-3.webp';
import landmarkHero from '@/assets/images/projects/landmark-hero.webp';
import landmarkMap from '@/assets/images/projects/landmark-map.webp';
import landmarkVision from '@/assets/images/projects/landmark-vision.webp';
import theMarbleCollection from '@/assets/images/projects/the-marble-collection.webp';
import theObsidian from '@/assets/images/projects/the-obsidian.webp';
import theSkylinePlaza from '@/assets/images/projects/the-skyline-plaza.webp';

interface ProjectSpecs {
  totalArea: string;
  units: string;
  floorCount: string;
  completion: string;
}

interface VisionSection {
  title: string;
  italicPart?: string;
  paragraphs: string[];
  image: string;
}

interface Amenity {
  icon: string;
  title: string;
  description: string;
}

interface LocationPoint {
  number: string;
  title: string;
  description: string;
}

interface LocationDetails {
  description: string;
  points: LocationPoint[];
  mapImage: string;
  lat: number;
  lng: number;
}

export interface ProjectDetail {
  specs: ProjectSpecs;
  heroImage: string;
  vision: VisionSection;
  gallery: string[];
  amenities: Amenity[];
  location: LocationDetails;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  status: 'Completed' | 'Ongoing' | 'Upcoming';
  location: string;
  date: string;
  image: string;
  detail?: ProjectDetail;
}

export const allProjects: Project[] = [
  {
    id: '1',
    title: 'The Obsidian',
    slug: 'the-obsidian',
    tagline: 'Residential Milestone',
    description: 'A masterclass in dark aesthetics and light-filled spaces.',
    status: 'Completed',
    location: 'Gulshan, Dhaka',
    date: 'Handed Over: Oct 2023',
    image: theObsidian,
    detail: {
      specs: {
        totalArea: '0.8 Acres',
        units: '32 Apartments',
        floorCount: 'G + 18 Levels',
        completion: 'Oct 2023',
      },
      heroImage: theObsidian,
      vision: {
        title: 'A Masterclass in',
        italicPart: 'Dark Elegance',
        paragraphs: [
          'The Obsidian represents a bold departure from conventional residential design. Every surface, texture, and shadow has been meticulously considered to create an environment that is both dramatic and serene.',
          'The interplay of dark stone finishes with strategic natural light sources creates a living experience that evolves throughout the day — a true sanctuary in the heart of Gulshan.',
        ],
        image: theObsidian,
      },
      gallery: [theObsidian, galleryImg1, galleryImg2],
      amenities: [
        {
          icon: 'dark_mode',
          title: 'Ambient Lighting',
          description:
            'Programmable LED systems that adapt to natural light cycles, creating the perfect mood for every hour.',
        },
        {
          icon: 'ac_unit',
          title: 'Central HVAC',
          description:
            'Silent, energy-efficient climate control with individual room zoning for personalized comfort.',
        },
        {
          icon: 'security',
          title: 'Secure Entry',
          description:
            'Biometric access and 24/7 surveillance with dedicated security personnel at all entrances.',
        },
        {
          icon: 'spa',
          title: 'Wellness Suite',
          description:
            'A private steam room, sauna, and fitness center reserved exclusively for residents.',
        },
      ],
      location: {
        description:
          "Nestled in the most prestigious address in Gulshan, The Obsidian offers unparalleled access to the city's finest offerings.",
        points: [
          {
            number: '01',
            title: 'Diplomatic Enclave',
            description:
              'Surrounded by embassies and high commissions, ensuring the highest standards of security and prestige.',
          },
          {
            number: '02',
            title: 'Fine Dining',
            description:
              "Steps away from Dhaka's most acclaimed restaurants and exclusive member clubs.",
          },
          {
            number: '03',
            title: 'Lake Proximity',
            description:
              'Minutes from the serene Gulshan Lake park, offering a tranquil escape from urban energy.',
          },
        ],
        mapImage: landmarkMap,
        lat: 23.7925,
        lng: 90.4078,
      },
    },
  },
  {
    id: '2',
    title: 'Bronze Heights',
    slug: 'bronze-heights',
    tagline: 'Luxury Penthouse',
    description:
      'Elevated living with panoramic views and bronze-accented interiors.',
    status: 'Ongoing',
    location: 'Nasirabad, Chattogram',
    date: 'Est: Dec 2025',
    image: bronzeHeights,
    detail: {
      specs: {
        totalArea: '0.5 Acres',
        units: '24 Penthouse Suites',
        floorCount: 'G + 15 Levels',
        completion: 'Q4 2025',
      },
      heroImage: bronzeHeights,
      vision: {
        title: 'Living Above the',
        italicPart: 'City Lights',
        paragraphs: [
          'Bronze Heights redefines the concept of penthouse living in Chattogram. Soaring above the city, each residence is a private haven with uninterrupted views of the Bay of Bengal.',
          'Warm bronze accents and natural materials ground the spaces, creating a seamless dialogue between the interior and the spectacular coastal panorama.',
        ],
        image: landmarkVision,
      },
      gallery: [bronzeHeights, galleryImg3, galleryImg4],
      amenities: [
        {
          icon: 'deck',
          title: 'Panoramic Terrace',
          description:
            'A sprawling rooftop terrace with 360-degree views, outdoor lounge, and private dining cabanas.',
        },
        {
          icon: 'local_parking',
          title: 'Valet Parking',
          description:
            'Dedicated valet service with secure underground parking for every residence.',
        },
        {
          icon: 'wifi',
          title: 'Smart Concierge',
          description:
            'Digital concierge service accessible via mobile app for all resident needs.',
        },
        {
          icon: 'fitness_center',
          title: 'Sky Gym',
          description:
            'State-of-the-art fitness facilities with ocean views on the uppermost floor.',
        },
      ],
      location: {
        description:
          'Perched in the heights of Nasirabad, Bronze Heights commands sweeping views of the city and the sea beyond.',
        points: [
          {
            number: '01',
            title: 'Coastal Access',
            description:
              'Minutes from the renowned Patenga Beach and the developing marine drive.',
          },
          {
            number: '02',
            title: 'Commercial Hub',
            description:
              "Close to Chattogram's major business districts and the port authority.",
          },
          {
            number: '03',
            title: 'Hill Retreat',
            description:
              'Adjacent to the green hills of Chattogram, offering cool breezes and natural serenity.',
          },
        ],
        mapImage: landmarkMap,
        lat: 22.3475,
        lng: 91.8123,
      },
    },
  },
  {
    id: '3',
    title: 'The Marble Collection',
    slug: 'the-marble-collection',
    tagline: 'Upcoming',
    description:
      'An exclusive trio of villas featuring Italian Carrara marble and sustainable heating systems.',
    status: 'Upcoming',
    location: 'Purbachal, Dhaka',
    date: 'Launch: Q2 2024',
    image: theMarbleCollection,
  },
  {
    id: '4',
    title: 'Azure Waterfront',
    slug: 'azure-waterfront',
    tagline: 'Ongoing Development',
    description:
      'Serene lakeside living with panoramic views of the Gulshan Lake.',
    status: 'Ongoing',
    location: 'Gulshan, Dhaka',
    date: 'Est: Dec 2025',
    image: azureWaterfront,
    detail: {
      specs: {
        totalArea: '1.5 Acres',
        units: '64 Residences',
        floorCount: 'G + 20 Levels',
        completion: 'Q4 2025',
      },
      heroImage: azureWaterfront,
      vision: {
        title: 'Where Water Meets',
        italicPart: 'Architecture',
        paragraphs: [
          'Azure Waterfront is a celebration of lakeside living. Every residence has been oriented to capture the ever-changing light reflecting off Gulshan Lake.',
          'The architecture embraces transparency and flow, with expansive glass facades that dissolve the boundary between interior comfort and natural beauty.',
        ],
        image: landmarkVision,
      },
      gallery: [azureWaterfront, galleryImg1, galleryImg3],
      amenities: [
        {
          icon: 'pool',
          title: 'Infinity Edge Pool',
          description:
            'A stunning infinity pool that appears to merge with the lake beyond, with a sun deck and cabanas.',
        },
        {
          icon: 'directions_boat',
          title: 'Private Jetty',
          description:
            'Exclusive resident access to a private boat dock for lake excursions.',
        },
        {
          icon: 'local_cafe',
          title: 'Lakeside Cafe',
          description:
            'A resident-only cafe overlooking the water with indoor and alfresco seating.',
        },
        {
          icon: 'nature',
          title: 'Japanese Garden',
          description:
            'A meticulously curated zen garden designed for meditation and quiet reflection.',
        },
      ],
      location: {
        description:
          'Set along the pristine shores of Gulshan Lake, Azure Waterfront offers an unrivaled waterfront lifestyle.',
        points: [
          {
            number: '01',
            title: 'Lake Frontage',
            description:
              'Direct access to the Gulshan Lake promenade with private resident entry points.',
          },
          {
            number: '02',
            title: 'Diplomatic Quarter',
            description:
              'Within the secure diplomatic zone, surrounded by international embassies.',
          },
          {
            number: '03',
            title: 'City Connect',
            description:
              '15 minutes from Hazrat Shahjalal International Airport and major business hubs.',
          },
        ],
        mapImage: landmarkMap,
        lat: 23.794,
        lng: 90.409,
      },
    },
  },
  {
    id: '5',
    title: 'The Skyline Plaza',
    slug: 'the-skyline-plaza',
    tagline: 'Upcoming Landmark',
    description:
      'A revolutionary commercial hub at the intersection of innovation and tradition.',
    status: 'Upcoming',
    location: 'Banani, Dhaka',
    date: 'Launch: Q3 2024',
    image: theSkylinePlaza,
  },
  {
    id: '6',
    title: 'The Landmark Residency',
    slug: 'the-landmark-residency',
    tagline: 'Luxury High-Rise',
    description:
      'A cinematic architectural marvel in the heart of Gulshan, redefining luxury living.',
    status: 'Ongoing',
    location: 'Gulshan, Dhaka',
    date: 'Est: Q4 2026',
    image: landmarkHero,
    detail: {
      specs: {
        totalArea: '1.2 Acres',
        units: '48 Limited Edition',
        floorCount: 'G + 24 Levels',
        completion: 'Q4 2026',
      },
      heroImage: landmarkHero,
      vision: {
        title: 'A Testament to',
        italicPart: 'Architectural Purity',
        paragraphs: [
          "The Landmark Residency is more than a structure; it is a philosophy realized in stone, steel, and glass. Our design intent focuses on the seamless integration of indoor and outdoor living, specifically tailored for the discerning lifestyle of Gulshan's elite.",
          "Every line is intentional, every material selected for its longevity and textural resonance. We have employed a 'Quiet Luxury' aesthetic — where the quality of light and the rhythm of space speak louder than decorative excess.",
        ],
        image: landmarkVision,
      },
      gallery: [landmarkGallery1, landmarkGallery2, landmarkGallery3],
      amenities: [
        {
          icon: 'pool',
          title: 'Rooftop Infinity Pool',
          description:
            'A temperature-controlled pool offering 360-degree views of the Dhaka skyline, complete with a private deck.',
        },
        {
          icon: 'smartphone',
          title: 'Smart Integration',
          description:
            'Full home automation including climate, lighting, and security, controlled via a bespoke resident mobile application.',
        },
        {
          icon: 'architecture',
          title: 'Triple Height Lobby',
          description:
            'An awe-inspiring entrance featuring curated art installations and a dedicated reception for distinguished visitors.',
        },
        {
          icon: 'concierge',
          title: 'Concierge Service',
          description:
            'A 24/7 personalized concierge to manage logistics, housekeeping, and secure package handling for all residents.',
        },
      ],
      location: {
        description:
          "Located in the most sought-after enclave of Gulshan, The Landmark Residency places you at the epicenter of Dhaka's diplomatic and business core.",
        points: [
          {
            number: '01',
            title: 'Diplomatic Zone',
            description:
              '2-minute drive to major international embassies and high commissions.',
          },
          {
            number: '02',
            title: 'Luxury Retail',
            description:
              "Immediate access to high-end boutiques and the city's finest dining establishments.",
          },
          {
            number: '03',
            title: 'Green Lung',
            description:
              'Overlooking the serene Gulshan Lake and surrounding parklands.',
          },
        ],
        mapImage: landmarkMap,
        lat: 23.793,
        lng: 90.4065,
      },
    },
  },
];
