/** Navigation data for the header, mega menu and footer. */

export type NavLink = {
  label: string;
  href: string;
};

export const mainNav: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Academy", href: "/academy" },
  { label: "Print Store", href: "/store" },
  { label: "Journal", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const megaMenu = {
  intro: {
    eyebrow: "Services",
    description:
      "One studio for stills, film, design and print — engineered for brands that cannot afford an average frame.",
    cta: { label: "All Services", href: "/services" },
  },
  columns: [
    {
      title: "Photography",
      links: [
        { label: "Weddings & Events", href: "/services" },
        { label: "Corporate & Portrait", href: "/services" },
        { label: "Product & Jewelry", href: "/services" },
        { label: "Food & Restaurant", href: "/services" },
        { label: "Architecture & Real Estate", href: "/services" },
        { label: "Fashion & Editorial", href: "/services" },
      ],
    },
    {
      title: "Films",
      links: [
        { label: "Wedding Films", href: "/services" },
        { label: "Brand Films & Ads", href: "/services" },
        { label: "Drone Cinematography", href: "/services" },
        { label: "Social & Reels", href: "/services" },
        { label: "Podcast & Interviews", href: "/services" },
        { label: "Live Streaming", href: "/services" },
      ],
    },
    {
      title: "Creative Studio",
      links: [
        { label: "Brand Identity", href: "/services" },
        { label: "Graphic Design", href: "/services" },
        { label: "Post & Color Grading", href: "/services" },
        { label: "Motion & VFX", href: "/services" },
        { label: "Print Store", href: "/store" },
        { label: "Academy", href: "/academy" },
      ],
    },
  ],
} as const;

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Learn & Shop",
    links: [
      { label: "Academy", href: "/academy" },
      { label: "Print Store", href: "/store" },
      { label: "Journal", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Clients",
    links: [
      { label: "Booking", href: "/booking" },
      { label: "Client Area", href: "/client-area" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];
