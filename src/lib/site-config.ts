/**
 * Single source of truth for company-level details.
 * Update values here and they propagate across the whole site.
 */
export const siteConfig = {
  name: "GILVERO",
  legalName: "Gilvero Creative Media",
  tagline: "Capture. Create. Inspire.",
  title: "GILVERO — Capture. Create. Inspire. | Photography, Film & Design",
  description:
    "Gilvero is a luxury creative media company: cinematic photography, film production, brand design, a professional academy and archival fine-art printing.",
  url: "https://gilvero.com",
  phone: "+92 300 000 0000",
  whatsapp: "https://wa.me/923000000000",
  email: "studio@gilvero.com",
  address: "Gilvero Creative House, Gulberg III, Lahore, Pakistan",
  hours: "Mon – Sat · 10:00 – 20:00",
  social: {
    instagram: "#",
    youtube: "#",
    linkedin: "#",
  },
} as const;

export type SiteConfig = typeof siteConfig;
