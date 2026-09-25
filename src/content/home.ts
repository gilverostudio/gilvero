import { imageDimensions, type ImageKey } from "@/lib/images";

export type HomeHero = {
  eyebrow: string;
  description: string;
};

export type ServiceCard = {
  title: string;
  copy: string;
  image: ImageKey;
};

export type FeaturedWork = {
  slug: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: ImageKey;
};

export type Film = {
  title: string;
  duration: string;
  image: ImageKey;
};

export type AcademyQuote = {
  quote: string;
  attribution: string;
};

export type StoreProduct = {
  name: string;
  price: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type Award = {
  year: string;
  name: string;
  body: string;
};

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

/** Intrinsic dimensions of the source JPGs (for next/image). */
export const homeImageDimensions = imageDimensions;

export const homeHero: HomeHero = {
  eyebrow: "Creative Media House · Est. 2016",
  description:
    "Gilvero is a premium creative media company — photography, film, design, education and archival print for brands, businesses and the people who expect more than a photograph.",
};

export const marqueeBrands = [
  "SERENA",
  "NISHAT",
  "PACKAGES MALL",
  "KHAADI",
  "MOBILINK",
  "PSO",
  "AVARI",
  "SAPPHIRE",
  "GOURMET",
  "IMTIAZ",
] as const;

export const servicesOverview = {
  eyebrow: "What we do",
  title: "Four disciplines. One standard.",
  copy: "Stills, motion, design and print are handled in-house, so the work stays consistent from the first frame to the framed print on the wall.",
  cards: [
    {
      title: "Photography",
      copy: "Weddings, brands, product, food, architecture and fashion — lit and finished to gallery standard.",
      image: "wedding",
    },
    {
      title: "Cinematography",
      copy: "Feature-grade films, commercials, drone work and social cut-downs from a single production unit.",
      image: "studio",
    },
    {
      title: "Creative Studio",
      copy: "Identity, packaging, motion and post — the design layer that makes the imagery work.",
      image: "product",
    },
    {
      title: "Academy & Print",
      copy: "A professional creative institute and an archival print atelier, both open to the public.",
      image: "academy",
    },
  ] satisfies ServiceCard[],
};

export const featuredWorkSection = {
  eyebrow: "Selected work",
  title: "Recent commissions",
  copy: "A short edit from weddings, campaigns, hospitality and property work delivered this year.",
  works: [
    {
      slug: "the-lahore-vows",
      title: "The Lahore Vows",
      category: "Wedding",
      location: "Lahore, Pakistan",
      year: "2026",
      image: "wedding",
    },
    {
      slug: "aurum-timepieces",
      title: "Aurum Timepieces",
      category: "Products",
      location: "Studio A, Lahore",
      year: "2026",
      image: "product",
    },
    {
      slug: "the-obsidian-hotel",
      title: "The Obsidian Hotel",
      category: "Hotels",
      location: "Islamabad",
      year: "2025",
      image: "architecture",
    },
    {
      slug: "noir-couture",
      title: "Noir Couture",
      category: "Fashion",
      location: "Karachi",
      year: "2025",
      image: "fashion",
    },
    {
      slug: "meridian-tower",
      title: "Meridian Tower",
      category: "Real Estate",
      location: "Lahore",
      year: "2025",
      image: "architecture",
    },
    {
      slug: "atlas-brand-film",
      title: "Atlas Brand Film",
      category: "Videos",
      location: "Faisalabad",
      year: "2026",
      image: "studio",
    },
  ] satisfies FeaturedWork[],
};

export const filmsSection = {
  eyebrow: "Gilvero films",
  title: "Latest films",
  films: [
    { title: "The Lahore Vows — Feature Film", duration: "12:04", image: "wedding" },
    { title: "Atlas Industries — Brand Film", duration: "04:11", image: "studio" },
    { title: "Obsidian Hotel — Property Film", duration: "02:38", image: "architecture" },
  ] satisfies Film[],
};

export const academyPreview = {
  eyebrow: "Gilvero Academy",
  title: "A creative institute run by people who still shoot.",
  copy: "Photography, cinematography, editing, design and freelancing — taught in the same studio where our commercial work is made. Small cohorts, real briefs, graded portfolio reviews.",
  imageAlt: "Students editing in the Gilvero Academy suite",
  quotes: [
    {
      quote: "I joined with a borrowed camera. Fourteen months later I shoot for two hotel groups.",
      attribution: "Ahsan Raza · Class of 2024",
    },
    {
      quote: "The pricing and client-handling module paid for the course in my first month.",
      attribution: "Fatima Noor · Class of 2025",
    },
  ] satisfies AcademyQuote[],
};

export const storePreview = {
  eyebrow: "Print atelier",
  title: "Your work, printed to last a century.",
  copy: "Archival fine-art paper, hand-finished frames and layflat albums produced in our own print studio.",
  imageAlt: "Framed fine-art prints on a dark gallery wall",
  products: [
    { name: "Fine Art Prints", price: "from PKR 450" },
    { name: "Canvas & Acrylic", price: "from PKR 2,900" },
    { name: "Luxury Frames", price: "from PKR 3,400" },
    { name: "Heirloom Albums", price: "from PKR 24,000" },
  ] satisfies StoreProduct[],
};

export const stats: Stat[] = [
  { value: 1200, suffix: "+", label: "Projects Delivered" },
  { value: 18, suffix: "", label: "Countries Shot In" },
  { value: 940, suffix: "+", label: "Academy Graduates" },
  { value: 32, suffix: "", label: "Awards & Features" },
];

export const testimonialsSection = {
  eyebrow: "Clients",
  title: "What they said afterwards",
  quotes: [
    {
      quote:
        "Gilvero shot our entire property library in nine nights. It changed how the brand is perceived online.",
      author: "Faisal Rehman",
      role: "General Manager, Obsidian Group",
    },
    {
      quote:
        "We have used studios in Dubai and London. This is the first team in the region operating at that level.",
      author: "Maryam Vaqar",
      role: "Creative Head, Maison Noir",
    },
    {
      quote:
        "I joined the academy with a borrowed camera. Fourteen months later I shoot for two hotel groups.",
      author: "Ahsan Raza",
      role: "Academy Graduate, 2024",
    },
    {
      quote: "Calm on set, ruthless in post. Exactly what a launch campaign needs.",
      author: "Sana Iqbal",
      role: "Brand Director, Aurum",
    },
  ] satisfies Testimonial[],
};

export const awards: Award[] = [
  { year: "2026", name: "Regional Studio of the Year", body: "Creative Asia Awards" },
  { year: "2025", name: "Best Brand Film", body: "South Asia Film Council" },
  { year: "2025", name: "Hospitality Photography Gold", body: "Hotelier Awards" },
  { year: "2024", name: "Editorial Feature", body: "Frame Quarterly" },
];

export const btsImages: ImageKey[] = ["studio", "academy", "product", "fashion"];

export const instagramSection = {
  eyebrow: "@gilvero",
  title: "From the feed",
  copy: "Daily frames, set diaries and student work.",
  images: [
    "wedding",
    "product",
    "architecture",
    "fashion",
    "academy",
    "store",
    "studio",
    "wedding",
    "fashion",
    "product",
    "architecture",
    "academy",
  ] satisfies ImageKey[],
};

export const journalPreview: JournalPost[] = [
  {
    slug: "lighting-for-black-on-black",
    title: "Lighting for Black on Black",
    category: "Photography Tips",
    date: "12 July 2026",
    read: "7 min",
  },
  {
    slug: "camera-review-full-frame-2026",
    title: "The Full-Frame Bodies We Actually Shoot in 2026",
    category: "Camera Reviews",
    date: "28 June 2026",
    read: "9 min",
  },
  {
    slug: "pricing-creative-work",
    title: "Pricing Creative Work Without Apologising",
    category: "Business",
    date: "09 June 2026",
    read: "6 min",
  },
  {
    slug: "grading-warm-neutrals",
    title: "Grading Warm Neutrals That Survive Print",
    category: "Editing Tips",
    date: "22 May 2026",
    read: "8 min",
  },
];

export const faqPreview: FaqItem[] = [
  {
    question: "What does a Gilvero engagement typically cost?",
    answer:
      "Every project is scoped individually. Wedding coverage, brand campaigns and property libraries each carry their own crew, gear and post requirements — send a brief and you will receive a written quote within 24 hours.",
  },
  {
    question: "Do you travel outside Pakistan?",
    answer:
      "Yes. We have delivered work in 18 countries. Travel, visa and accommodation are quoted separately and transparently.",
  },
  {
    question: "How long is delivery?",
    answer:
      "Commercial stills: 5–10 working days. Wedding photography: 21 days. Films: 4–6 weeks. Rush delivery is available on request.",
  },
  {
    question: "Do you shoot RAW files over to clients?",
    answer:
      "Selected RAW hand-over is possible on commercial contracts. For most engagements we deliver fully graded, retouched masters plus web-optimised sets.",
  },
  {
    question: "Is the Academy suitable for complete beginners?",
    answer:
      "Most of our courses start from zero. You need a willingness to shoot every week — equipment can be borrowed from the studio during class hours.",
  },
];
