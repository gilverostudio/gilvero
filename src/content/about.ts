import { type GalleryItem } from "@/components/shared/gallery";

export type AboutHeader = {
  eyebrow: string;
  title: string;
  copy: string;
  crumbLabel: string;
};

export type StoryContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type PillarCard = {
  title: string;
  copy: string;
};

export type FounderContent = {
  eyebrow: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  imageAlt: string;
};

export type TeamMember = {
  name: string;
  role: string;
};

export type TimelineEntry = {
  year: string;
  text: string;
};

export type Award = {
  year: string;
  name: string;
  body: string;
};

export const aboutHeader: AboutHeader = {
  eyebrow: "About the studio",
  title: "A creative company built for brands that cannot afford an average frame.",
  copy: "Gilvero began in 2016 as two people and one camera. It is now a studio, a film unit, a design practice, an academy and a print atelier — under one roof in Lahore, working across 18 countries.",
  crumbLabel: "About",
};

export const story: StoryContent = {
  eyebrow: "Our story",
  title: "We started with weddings. We stayed for everything else.",
  paragraphs: [
    "The first two years were weddings — long days, difficult light, and an obsession with getting skin tones right. That discipline turned out to translate: hotels needed the same patience, jewellery needed more, and architecture needed all of it plus geometry.",
    "Today roughly two-thirds of our work is commercial: hospitality, property, product, fashion and corporate film. The rest is the celebration work we never wanted to stop doing.",
    "In 2023 we opened the Academy because we kept meeting talented people with no route in. In 2025 we built the print atelier because we were tired of watching good files die in bad print.",
  ],
};

export const missionVision: PillarCard[] = [
  {
    title: "Mission",
    copy: "To make imagery in Pakistan that holds up anywhere in the world.",
  },
  {
    title: "Vision",
    copy: "A single creative house where capture, design, education and print reinforce each other.",
  },
];

export const coreValues: PillarCard[] = [
  { title: "Craft over volume", copy: "We take fewer projects and finish each one properly." },
  { title: "Restraint", copy: "No trend chasing. The frame should still read in ten years." },
  { title: "Transparency", copy: "Written scopes, written timelines, no surprise invoices." },
  { title: "Teaching", copy: "Everything we learn on set goes back into the Academy." },
];

export const founder: FounderContent = {
  eyebrow: "Founder",
  name: "Hamza Gill",
  role: "Director of Photography",
  quote:
    "“I care about two things on a shoot: that nobody feels watched, and that the light is doing something deliberate. Everything else is logistics.”",
  bio: "Hamza has led over 700 commissions across hospitality, fashion and celebration work, and still personally shoots the studio's flagship campaigns.",
  imageAlt: "Hamza Gill, founder of Gilvero",
};

export const team: TeamMember[] = [
  { name: "Hamza Gill", role: "Founder & Director of Photography" },
  { name: "Rameez Ahsan", role: "Head of Films" },
  { name: "Areeba Naveed", role: "Creative Director, Design" },
  { name: "Zoya Kamal", role: "Head of Post Production" },
  { name: "Bilal Sohail", role: "Head of Academy" },
  { name: "Nida Farooq", role: "Producer" },
];

export const studioTour: GalleryItem[] = [
  { key: "studio", caption: "Studio A — 2,400 sq ft cyclorama" },
  { key: "academy", caption: "Academy editing suite" },
  { key: "product", caption: "Product tenting bay" },
  { key: "store", caption: "Print atelier & framing" },
  { key: "fashion", caption: "Wardrobe & grooming" },
];

export const timeline: TimelineEntry[] = [
  { year: "2016", text: "Founded as a two-person photography practice in a rented Lahore flat." },
  { year: "2019", text: "First commercial studio opens; hospitality and product work begins." },
  { year: "2021", text: "Gilvero Films launched with a dedicated grading suite." },
  { year: "2023", text: "Gilvero Academy opens its first cohort of 24 students." },
  { year: "2025", text: "Print atelier launched with archival fine-art printing." },
  { year: "2026", text: "Creative House opens — studio, academy and print under one roof." },
];

export const equipment: string[] = [
  "Full-frame & Super 35 cinema bodies",
  "100MP medium-format studio system",
  "Prime lens sets, 14mm – 400mm",
  "Tilt-shift architectural glass",
  "1200W bi-colour & HMI lighting",
  "Motion control & macro rigs",
  "Licensed drone fleet",
  "Calibrated DaVinci grading suite",
];

export const awards: Award[] = [
  { year: "2026", name: "Regional Studio of the Year", body: "Creative Asia Awards" },
  { year: "2025", name: "Best Brand Film", body: "South Asia Film Council" },
  { year: "2025", name: "Hospitality Photography Gold", body: "Hotelier Awards" },
  { year: "2024", name: "Editorial Feature", body: "Frame Quarterly" },
];

export const clients: string[] = [
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
];
