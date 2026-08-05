/** Content for the /store Print Store page. */

export type StoreProduct = {
  name: string;
  from: string;
  note: string;
};

export const storeProducts: StoreProduct[] = [
  { name: "Fine Art Photo Prints", from: "PKR 450", note: "Museum matte, 310gsm" },
  { name: "Canvas Prints", from: "PKR 2,900", note: "Gallery wrap, pine stretcher" },
  { name: "Luxury Frames", from: "PKR 3,400", note: "Wood, metal, floating, glass" },
  { name: "Heirloom Albums", from: "PKR 24,000", note: "Layflat, leather bound" },
  { name: "Acrylic Prints", from: "PKR 6,200", note: "5mm face-mounted acrylic" },
  { name: "Passport & ID Photos", from: "PKR 350", note: "All embassy specifications" },
  { name: "Photo Gifts", from: "PKR 1,200", note: "Mugs, keepsakes, desk frames" },
  { name: "Wall Art Sets", from: "PKR 8,500", note: "Curated triptychs" },
  { name: "Large Posters", from: "PKR 1,900", note: "Up to 24×36 inches" },
  { name: "Collages", from: "PKR 2,400", note: "Custom multi-frame layouts" },
];

export const printSizes = [
  "4×6",
  "5×7",
  "6×8",
  "8×10",
  "8×12",
  "10×15",
  "12×18",
  "16×20",
  "18×24",
  "20×30",
  "24×36",
  "A4",
  "A3",
  "A2",
  "A1",
  "Custom Size",
] as const;

export type PrintSize = (typeof printSizes)[number];

/** The original configurator boots with the fourth size pre-selected. */
export const defaultPrintSize: PrintSize = printSizes[3];

export const paperTypes = [
  "Museum Matte 310gsm",
  "Baryta Gloss 315gsm",
  "Textured Rag 320gsm",
  "Metallic 255gsm",
] as const;

export type PaperType = (typeof paperTypes)[number];

export type FrameType = {
  name: string;
  note: string;
};

export const frameTypes: FrameType[] = [
  { name: "Wood", note: "Oak, walnut, matte black" },
  { name: "Metal", note: "Brushed aluminium, brass" },
  { name: "Luxury", note: "Hand-finished gold leaf" },
  { name: "Floating", note: "Shadow-gap mount" },
  { name: "Glass", note: "Anti-glare museum glass" },
  { name: "Canvas", note: "Frameless gallery wrap" },
];

export const trackingSteps = [
  "Order placed",
  "Soft proof sent",
  "Printing",
  "Framing & QC",
  "Dispatched",
];

export const storeHeader = {
  eyebrow: "Print atelier",
  title: "Prints made to outlive the hard drive.",
  copy: "Archival papers, hand-finished frames and layflat albums, produced and inspected in our own print studio.",
  action: "Shop Now",
};

export const productsHeading = {
  eyebrow: "Products",
  title: "What we print",
};

export const configuratorHeading = {
  eyebrow: "Order process",
  title: "Configure your print",
  copy: "Upload, choose, approve the soft proof, and we print. Delivery across Pakistan in 3–6 working days.",
};

export const uploadPanel = {
  title: "Upload your image",
  copy: "JPEG or TIFF, up to 200MB. We check resolution before printing.",
  action: "Choose File",
};

export const trackingHeading = {
  eyebrow: "Order tracking",
  title: "Know exactly where your print is",
};

export const storeToasts = {
  shopNow: "Print configurator below.",
  addToBasket: (name: string) => `${name} added to basket`,
  chooseFile: "File upload becomes live once the store backend is connected.",
  checkout: "Added to basket — soft proof will be emailed.",
};

export const storeCta = {
  title: "Need help choosing a size?",
  copy: "Send us the image and the wall dimensions — we will recommend a size and frame.",
  primary: { label: "WhatsApp the Studio", href: "/contact" },
  secondary: { label: "Read FAQ", href: "/faq" },
};
