import "server-only";

import { cache } from "react";

import { CMS_TAGS, cmsSelect, mediaUrl } from "@/lib/cms";
import { staticImage, type SiteImage } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { footerNav, mainNav, megaMenu, type NavLink } from "@/content/navigation";
import { searchLinks } from "@/content/search";

/**
 * Site-wide data: settings, menus, section copy blocks and the media library.
 * Everything is tagged `site`; the admin refreshes it after every save.
 */

const TAGS = [CMS_TAGS.site];

// ---------------------------------------------------------------------------
// Settings
// ---------------------------------------------------------------------------

export type SiteSettings = {
  name: string;
  legalName: string;
  tagline: string;
  title: string;
  description: string;
  url: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  hours: string;
  social: { instagram: string; youtube: string; linkedin: string };
  seo: {
    ogTitle: string;
    ogDescription: string;
    organizationDescription: string;
    addressLocality: string;
    addressCountry: string;
  };
};

const STATIC_SEO: SiteSettings["seo"] = {
  ogTitle: "GILVERO — Capture. Create. Inspire.",
  ogDescription: "Capture. Create. Inspire. Photography, film, design, academy and print.",
  organizationDescription:
    "Premium creative media company offering photography, cinematography, design, creative education and professional printing.",
  addressLocality: "Lahore",
  addressCountry: "PK",
};

type SettingsRow = Omit<SiteSettings, "legalName" | "seo" | "social"> & {
  legal_name: string;
  social: Partial<SiteSettings["social"]>;
  seo: Partial<SiteSettings["seo"]>;
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const rows = await cmsSelect<SettingsRow>(
    "site_settings?select=name,legal_name,tagline,title,description,url,phone,whatsapp,email,address,hours,social,seo&id=eq.1",
    TAGS,
  );
  const row = rows?.[0];
  if (!row) return { ...siteConfig, social: { ...siteConfig.social }, seo: STATIC_SEO };
  const { legal_name, seo, social, ...rest } = row;
  return {
    ...rest,
    legalName: legal_name,
    social: { instagram: "#", youtube: "#", linkedin: "#", ...social },
    seo: { ...STATIC_SEO, ...seo },
  };
});

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export type MegaMenuData = {
  intro: { eyebrow: string; description: string; cta: NavLink };
  columns: { title: string; links: NavLink[] }[];
};

export type Navigation = {
  main: NavLink[];
  mega: MegaMenuData;
  footer: { title: string; links: NavLink[] }[];
  search: NavLink[];
  /** Extra links shown after the main nav in the mobile menu. */
  mobile: NavLink[];
};

const STATIC_NAV: Navigation = {
  main: mainNav,
  mega: megaMenu as unknown as MegaMenuData,
  footer: footerNav,
  search: searchLinks,
  mobile: [
    { label: "Booking", href: "/booking" },
    { label: "Client Area", href: "/client-area" },
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
  ],
};

export const getNavigation = cache(async (): Promise<Navigation> => {
  const rows = await cmsSelect<{ key: keyof Navigation; data: never }>("navigation?select=key,data", TAGS);
  if (!rows) return STATIC_NAV;
  const nav = { ...STATIC_NAV };
  for (const row of rows) if (row.key in nav) nav[row.key] = row.data;
  return nav;
});

// ---------------------------------------------------------------------------
// Section copy blocks (site_sections) + page SEO/CTA (pages)
// ---------------------------------------------------------------------------

/** Raw section data by key, e.g. sections["home.hero"]. Null when the CMS is off. */
export const getSections = cache(async (): Promise<Record<string, Record<string, unknown>> | null> => {
  const rows = await cmsSelect<{ key: string; data: Record<string, unknown> }>("site_sections?select=key,data", TAGS);
  if (!rows) return null;
  return Object.fromEntries(rows.map((row) => [row.key, row.data]));
});

export type CtaLink = { label: string; href: string };
export type CtaContent = { title: string; copy: string; primary: CtaLink; secondary: CtaLink };

export const getPageCta = cache(async (slug: string): Promise<CtaContent | null | undefined> => {
  const rows = await cmsSelect<{ cta: CtaContent | null }>(`pages?select=cta&slug=eq.${encodeURIComponent(slug)}`, TAGS);
  // undefined = CMS off → caller keeps its built-in default.
  return rows ? (rows[0]?.cta ?? null) : undefined;
});

// ---------------------------------------------------------------------------
// Media library
// ---------------------------------------------------------------------------

type MediaRow = { id: string; storage_path: string; width: number; height: number; alt: string; focal_x: number; focal_y: number };

export const getMediaMap = cache(async (): Promise<Map<string, SiteImage>> => {
  const rows = await cmsSelect<MediaRow>("media?select=id,storage_path,width,height,alt,focal_x,focal_y", [
    CMS_TAGS.site,
    CMS_TAGS.portfolio,
  ]);
  return new Map(
    (rows ?? []).map((m) => [
      m.id,
      { src: mediaUrl(m.storage_path), width: m.width, height: m.height, alt: m.alt, focalX: m.focal_x, focalY: m.focal_y },
    ]),
  );
});

/** Resolve a media id to an image, with a bundled fallback so a missing image never breaks a page. */
export function imageFrom(media: Map<string, SiteImage>, id: unknown, alt = "", fallback: Parameters<typeof staticImage>[0] = "studio") {
  const found = typeof id === "string" ? media.get(id) : undefined;
  if (!found) return staticImage(fallback, alt);
  return { ...found, alt: alt || found.alt };
}

// ---------------------------------------------------------------------------
// Site chrome copy (header, footer, floating actions, search, newsletter)
// ---------------------------------------------------------------------------

export type ChromeCopy = {
  bookLabel: string;
  bookHref: string;
  whatsappLabel: string;
  footer: { blurb: string; contactTitle: string; privacyLabel: string; termsLabel: string };
  search: { title: string; placeholder: string; empty: string };
  newsletter: { placeholder: string; toastMessage: string };
};

const STATIC_CHROME: ChromeCopy = {
  bookLabel: "Book a Shoot",
  bookHref: "/booking",
  whatsappLabel: "WhatsApp",
  footer: {
    blurb:
      "A premium creative media house — photography, film, design, education and archival print, under one roof.",
    contactTitle: "Studio",
    privacyLabel: "Privacy",
    termsLabel: "Terms",
  },
  search: {
    title: "Search Gilvero",
    placeholder: "Services, courses, prints, projects…",
    empty: "Nothing found.",
  },
  newsletter: { placeholder: "Email address", toastMessage: "Subscribed — welcome to the Gilvero journal." },
};

export const getChromeCopy = cache(async (): Promise<ChromeCopy> => {
  const s = await getSections();
  if (!s) return STATIC_CHROME;
  const header = (s["global.header"] ?? {}) as Partial<{ bookLabel: string; bookHref: string }>;
  const floating = (s["global.floating"] ?? {}) as Partial<{ whatsappLabel: string }>;
  return {
    bookLabel: header.bookLabel || STATIC_CHROME.bookLabel,
    bookHref: header.bookHref || STATIC_CHROME.bookHref,
    whatsappLabel: floating.whatsappLabel || STATIC_CHROME.whatsappLabel,
    footer: { ...STATIC_CHROME.footer, ...(s["global.footer"] as object) },
    search: { ...STATIC_CHROME.search, ...(s["global.search"] as object) },
    newsletter: { ...STATIC_CHROME.newsletter, ...(s["global.newsletter"] as object) },
  };
});
