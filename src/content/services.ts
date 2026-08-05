export type ServiceCategory = {
  id: string;
  title: string;
  intro: string;
  items: string[];
};

export type EngagementTier = {
  name: string;
  for: string;
  price: string;
  items: string[];
  featured?: boolean;
};

export type ProcessStep = {
  title: string;
  copy: string;
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "photography",
    title: "Photography",
    intro:
      "Light, colour and restraint. Every frame is lit, art-directed and retouched to gallery standard.",
    items: [
      "Wedding Photography",
      "Engagement",
      "Nikah",
      "Mehndi",
      "Baraat",
      "Walima",
      "Birthday",
      "Baby Shoot",
      "Kids",
      "Family",
      "Maternity",
      "Newborn",
      "Corporate",
      "Business Portrait",
      "Product Photography",
      "Jewelry Photography",
      "Food Photography",
      "Restaurant Photography",
      "Hotel Photography",
      "Architecture",
      "Interior",
      "Real Estate",
      "Industrial",
      "School Photography",
      "Drone Photography",
      "Travel",
      "Sports",
      "Fashion",
      "Model Portfolio",
      "Automobile Photography",
      "Event Photography",
      "Commercial Photography",
      "Lifestyle Photography",
    ],
  },
  {
    id: "videography",
    title: "Videography",
    intro:
      "Cinema-grade capture on full-frame and Super 35 bodies, finished in a calibrated grading suite.",
    items: [
      "Wedding Films",
      "Corporate Videos",
      "Commercial Ads",
      "Product Videos",
      "Food Videos",
      "Restaurant Videos",
      "Hotel Videos",
      "Real Estate Videos",
      "Drone Cinematography",
      "Music Videos",
      "Interviews",
      "Podcast Production",
      "Documentary",
      "Social Media Reels",
      "YouTube Production",
      "Brand Films",
      "Event Coverage",
      "Live Streaming",
      "360 Video",
    ],
  },
  {
    id: "creative",
    title: "Creative Services",
    intro:
      "An in-house design and post studio that turns raw capture into a complete brand system.",
    items: [
      "Graphic Design",
      "Logo Design",
      "Brand Identity",
      "Packaging",
      "Social Media Design",
      "Marketing Materials",
      "Business Cards",
      "Brochures",
      "Flyers",
      "Presentation Design",
      "Video Editing",
      "Color Grading",
      "Motion Graphics",
      "Animation",
      "VFX",
      "YouTube Editing",
      "Short Form Editing",
      "Commercial Editing",
    ],
  },
];

export const engagementTiers: EngagementTier[] = [
  {
    name: "Essential",
    for: "Single-day coverage",
    price: "Quote in 24h",
    items: ["1 photographer", "6 hours on location", "80 graded images", "Online gallery"],
  },
  {
    name: "Signature",
    for: "Most commissions",
    price: "Quote in 24h",
    items: [
      "2 photographers + film unit",
      "Full-day coverage",
      "250 graded images",
      "3-minute highlight film",
      "Drone coverage",
    ],
    featured: true,
  },
  {
    name: "Atelier",
    for: "Multi-day & campaign",
    price: "Quote in 24h",
    items: [
      "Full crew & producer",
      "Unlimited days",
      "Art direction",
      "Feature film + cut-downs",
      "Print & album package",
    ],
  },
];

export const processSteps: ProcessStep[] = [
  { title: "Brief", copy: "A call, a written scope and a fixed quote." },
  { title: "Pre-production", copy: "Moodboards, shot lists, permits, casting and schedule." },
  { title: "Production", copy: "Our crew, our gear, one producer accountable for the day." },
  { title: "Post", copy: "Retouching, grade, sound and delivery in every format you need." },
];
