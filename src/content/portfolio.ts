import { type ImageKey } from "@/lib/images";

export type ProjectTestimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  image: ImageKey;
  story: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  testimonial: ProjectTestimonial;
};

export const portfolioCategories = [
  "All",
  "Wedding",
  "Corporate",
  "Commercial",
  "Products",
  "Fashion",
  "Architecture",
  "Real Estate",
  "Drone",
  "Travel",
  "Food",
  "Hotels",
  "Schools",
  "Videos",
];

export const projects: Project[] = [
  {
    slug: "the-lahore-vows",
    title: "The Lahore Vows",
    category: "Wedding",
    client: "Private Client",
    location: "Lahore, Pakistan",
    year: "2026",
    image: "wedding",
    story:
      "A three-day celebration documented as one continuous film — candlelit, unhurried and entirely unposed.",
    challenge:
      "Four venues, 900 guests and a strict no-flash rule inside a heritage hall lit only by candle.",
    solution:
      "A six-person crew on fast primes, a discreet two-camera film unit and a same-night editorial edit.",
    result:
      "A 12-minute feature film and a 220-page album delivered within 21 days; 2.4M organic views.",
    services: ["Photography", "Cinematography", "Album Design", "Drone"],
    testimonial: {
      quote: "They disappeared into the day and came back with the only record of it that feels true.",
      author: "Hina & Zeeshan",
      role: "Clients",
    },
  },
  {
    slug: "aurum-timepieces",
    title: "Aurum Timepieces",
    category: "Products",
    client: "Aurum",
    location: "Studio A, Lahore",
    year: "2026",
    image: "product",
    story: "A launch campaign for a gold-cased collection, built entirely on controlled reflection.",
    challenge:
      "Polished gold reflects the entire room. Every surface in the frame had to be designed.",
    solution: "Tented lighting, motion-controlled macro passes and focus-stacked composites at 100MP.",
    result: "Campaign ran across 14 markets; 38% lift in launch-week conversions.",
    services: ["Product Photography", "Retouching", "Motion"],
    testimonial: {
      quote: "The most disciplined product studio we have worked with, anywhere.",
      author: "Sana Iqbal",
      role: "Brand Director, Aurum",
    },
  },
  {
    slug: "the-obsidian-hotel",
    title: "The Obsidian Hotel",
    category: "Hotels",
    client: "Obsidian Group",
    location: "Islamabad",
    year: "2025",
    image: "architecture",
    story:
      "A full property library — architecture, interiors, food and lifestyle — shot across nine nights.",
    challenge: "Occupied property, no closures, and mixed colour temperatures in every room.",
    solution: "Night-only schedule, tungsten balancing and a fixed 24mm architectural grid.",
    result: "Asset library now powers the group's global OTA and print presence.",
    services: ["Architecture", "Interior", "Food", "Video"],
    testimonial: {
      quote: "Our booking imagery finally matches the property.",
      author: "Faisal Rehman",
      role: "GM, Obsidian Group",
    },
  },
  {
    slug: "noir-couture",
    title: "Noir Couture",
    category: "Fashion",
    client: "Maison Noir",
    location: "Karachi",
    year: "2025",
    image: "fashion",
    story: "An autumn campaign built on one hard light and absolute black.",
    challenge: "Sheer black-on-black fabric that loses all detail under conventional lighting.",
    solution: "Single-source hard light, negative fill and a bespoke print-matched grade.",
    result: "Editorial placement in three regional titles and a sold-out capsule.",
    services: ["Fashion Photography", "Retouching", "Art Direction"],
    testimonial: {
      quote: "They understood the collection before we finished describing it.",
      author: "Maryam Vaqar",
      role: "Creative Head, Maison Noir",
    },
  },
  {
    slug: "meridian-tower",
    title: "Meridian Tower",
    category: "Real Estate",
    client: "Meridian Developments",
    location: "Lahore",
    year: "2025",
    image: "architecture",
    story: "Aerial and interior coverage of a 34-floor mixed-use development.",
    challenge: "Restricted airspace and a two-week pre-launch window.",
    solution: "Licensed drone unit, twilight-only aerials and virtual-tour capture.",
    result: "62% of inventory reserved before public launch.",
    services: ["Drone", "Architecture", "Video"],
    testimonial: {
      quote: "The aerials sold the top four floors on their own.",
      author: "Adnan Sheikh",
      role: "Sales Director, Meridian",
    },
  },
  {
    slug: "atlas-brand-film",
    title: "Atlas Brand Film",
    category: "Videos",
    client: "Atlas Industries",
    location: "Faisalabad",
    year: "2026",
    image: "studio",
    story: "A four-minute manufacturing film shot across three plants in five days.",
    challenge: "Live production lines, heat, dust and zero downtime allowance.",
    solution: "Compact two-unit crew, gimbal-led coverage and on-set colour management.",
    result: "Film opened the group's investor day and now anchors their careers page.",
    services: ["Brand Film", "Interviews", "Motion Graphics"],
    testimonial: {
      quote: "It made a factory look like a flagship.",
      author: "Usman Tariq",
      role: "CMO, Atlas",
    },
  },
];

export const projectSlugs = projects.map((project) => project.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
