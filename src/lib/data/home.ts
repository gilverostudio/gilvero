import "server-only";

import { cache } from "react";

import * as home from "@/content/home";
import { CMS_TAGS, cmsSelect } from "@/lib/cms";
import { getMediaMap, getSections, getSettings, imageFrom, type CtaLink } from "@/lib/data/site";
import { staticImage, type SiteImage } from "@/lib/images";

/** Everything the homepage renders, in one typed shape (CMS or static fallback). */
export type HomeContent = {
  hero: {
    eyebrow: string;
    headline: [string, string];
    description: string;
    image: SiteImage;
    actions: { label: string; href: string; variant: "gold" | "hero" | "quiet" }[];
  };
  brands: string[];
  services: { eyebrow: string; title: string; copy: string; linkLabel: string; cardLinkLabel: string; cards: { title: string; copy: string; image: SiteImage }[] };
  featured: { eyebrow: string; title: string; copy: string; linkLabel: string };
  films: { eyebrow: string; title: string; items: { title: string; duration: string; videoUrl: string | null; image: SiteImage }[] };
  academy: {
    eyebrow: string;
    title: string;
    copy: string;
    image: SiteImage;
    quotes: { quote: string; attribution: string }[];
    primary: CtaLink;
    secondary: CtaLink;
  };
  store: { eyebrow: string; title: string; copy: string; linkLabel: string; image: SiteImage; products: { name: string; price: string }[] };
  stats: { value: number; suffix: string; label: string }[];
  testimonials: { eyebrow: string; title: string; items: { quote: string; author: string; role: string }[] };
  recognition: {
    awardsEyebrow: string;
    awardsTitle: string;
    awards: { year: string; name: string; body: string }[];
    btsEyebrow: string;
    btsTitle: string;
    bts: SiteImage[];
  };
  instagram: { eyebrow: string; title: string; copy: string; href: string; images: SiteImage[] };
  journalFaq: { journalEyebrow: string; journalTitle: string; faqEyebrow: string; faqTitle: string; faqLink: CtaLink };
};

/** Button labels that were never part of the content files. */
const LABELS = { services: "All Services", featured: "Full Portfolio", store: "Shop Prints" };

// ---------------------------------------------------------------------------
// Static fallback
// ---------------------------------------------------------------------------

function fromStatic(instagramHref: string): HomeContent {
  return {
    hero: {
      eyebrow: home.homeHero.eyebrow,
      headline: ["Capture. Create.", "Inspire."],
      description: home.homeHero.description,
      image: staticImage("hero", "Gilvero cinematographer on set in a darkened studio"),
      actions: [
        { label: "Book a Shoot", href: "/booking", variant: "gold" },
        { label: "View Portfolio", href: "/portfolio", variant: "hero" },
        { label: "Join Academy", href: "/academy", variant: "quiet" },
        { label: "Shop Prints", href: "/store", variant: "quiet" },
      ],
    },
    brands: [...home.marqueeBrands],
    services: {
      ...home.servicesOverview,
      linkLabel: LABELS.services,
      cardLinkLabel: "Explore",
      cards: home.servicesOverview.cards.map((c) => ({ title: c.title, copy: c.copy, image: staticImage(c.image, c.title) })),
    },
    featured: { ...home.featuredWorkSection, linkLabel: LABELS.featured },
    films: {
      eyebrow: home.filmsSection.eyebrow,
      title: home.filmsSection.title,
      items: home.filmsSection.films.map((f) => ({ ...f, videoUrl: null, image: staticImage(f.image, f.title) })),
    },
    academy: {
      eyebrow: home.academyPreview.eyebrow,
      title: home.academyPreview.title,
      copy: home.academyPreview.copy,
      image: staticImage("academy", home.academyPreview.imageAlt),
      quotes: home.academyPreview.quotes,
      primary: { label: "Enroll Now", href: "/academy" },
      secondary: { label: "View Courses", href: "/academy" },
    },
    store: {
      ...home.storePreview,
      linkLabel: LABELS.store,
      image: staticImage("store", home.storePreview.imageAlt),
    },
    stats: home.stats,
    testimonials: { ...home.testimonialsSection, items: home.testimonialsSection.quotes },
    recognition: {
      awardsEyebrow: "Recognition",
      awardsTitle: "Awards & features",
      awards: home.awards,
      btsEyebrow: "Behind the scenes",
      btsTitle: "Inside the studio",
      bts: home.btsImages.map((key) => staticImage(key, "Behind the scenes at Gilvero")),
    },
    instagram: {
      eyebrow: home.instagramSection.eyebrow,
      title: home.instagramSection.title,
      copy: home.instagramSection.copy,
      href: instagramHref,
      images: home.instagramSection.images.map((key) => staticImage(key, "Instagram post")),
    },
    journalFaq: {
      journalEyebrow: "Journal",
      journalTitle: "Latest writing",
      faqEyebrow: "Questions",
      faqTitle: "Before you enquire",
      faqLink: { label: "All FAQs", href: "/faq" },
    },
  };
}

// ---------------------------------------------------------------------------
// CMS
// ---------------------------------------------------------------------------

type Json = Record<string, unknown>;
const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback);
const list = <T = Json>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const link = (v: unknown, fallback: CtaLink): CtaLink => {
  const o = (v ?? {}) as Partial<CtaLink>;
  return { label: o.label || fallback.label, href: o.href || fallback.href };
};

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const settings = await getSettings();
  const [sections, media, films, stats, testimonials, awards, clients] = await Promise.all([
    getSections(),
    getMediaMap(),
    cmsSelect<{ title: string; duration: string; video_url: string | null; thumbnail_id: string | null }>(
      "films?select=title,duration,video_url,thumbnail_id&is_visible=is.true&order=sort_order.asc",
      [CMS_TAGS.site],
    ),
    cmsSelect<{ value: number; suffix: string; label: string }>("stats?select=value,suffix,label&order=sort_order.asc", [CMS_TAGS.site]),
    cmsSelect<{ placement: string; quote: string; author: string; role: string }>(
      "testimonials?select=placement,quote,author,role&is_visible=is.true&placement=in.(home,academy_home)&order=sort_order.asc",
      [CMS_TAGS.site],
    ),
    cmsSelect<{ year: string; name: string; body: string }>("awards?select=year,name,body&order=sort_order.asc", [CMS_TAGS.site]),
    cmsSelect<{ name: string }>("clients?select=name&is_visible=is.true&order=sort_order.asc", [CMS_TAGS.site]),
  ]);

  const fallback = fromStatic(settings.social.instagram);
  if (!sections || !films || !stats || !testimonials || !awards || !clients) return fallback;

  const s = (key: string) => (sections[key] ?? {}) as Json;
  const hero = s("home.hero");
  const services = s("home.services");
  const featured = s("home.featured");
  const filmsCopy = s("home.films");
  const academy = s("home.academy");
  const store = s("home.store");
  const testimonialsCopy = s("home.testimonials");
  const recognition = s("home.recognition");
  const instagram = s("home.instagram");
  const journalFaq = s("home.journal-faq");
  const headline = list<string>(hero.headline);

  return {
    hero: {
      eyebrow: str(hero.eyebrow),
      headline: [headline[0] ?? "", headline[1] ?? ""],
      description: str(hero.description),
      image: imageFrom(media, hero.image_id, str(hero.imageAlt), "hero"),
      actions: list<HomeContent["hero"]["actions"][number]>(hero.actions),
    },
    brands: clients.map((c) => c.name),
    services: {
      eyebrow: str(services.eyebrow),
      title: str(services.title),
      copy: str(services.copy),
      linkLabel: str(services.linkLabel) || LABELS.services,
      cardLinkLabel: str(services.cardLinkLabel) || "Explore",
      cards: list(services.cards).map((c) => ({
        title: str(c.title),
        copy: str(c.copy),
        image: imageFrom(media, c.image_id, str(c.title)),
      })),
    },
    featured: {
      eyebrow: str(featured.eyebrow),
      title: str(featured.title),
      copy: str(featured.copy),
      linkLabel: str(featured.linkLabel) || LABELS.featured,
    },
    films: {
      eyebrow: str(filmsCopy.eyebrow),
      title: str(filmsCopy.title),
      items: films.map((f) => ({
        title: f.title,
        duration: f.duration,
        videoUrl: f.video_url,
        image: imageFrom(media, f.thumbnail_id, f.title),
      })),
    },
    academy: {
      eyebrow: str(academy.eyebrow),
      title: str(academy.title),
      copy: str(academy.copy),
      image: imageFrom(media, academy.image_id, str(academy.imageAlt), "academy"),
      quotes: testimonials
        .filter((t) => t.placement === "academy_home")
        .map((t) => ({ quote: t.quote, attribution: [t.author, t.role].filter(Boolean).join(" · ") })),
      primary: link(academy.primary, fallback.academy.primary),
      secondary: link(academy.secondary, fallback.academy.secondary),
    },
    store: {
      eyebrow: str(store.eyebrow),
      title: str(store.title),
      copy: str(store.copy),
      linkLabel: str(store.linkLabel) || LABELS.store,
      image: imageFrom(media, store.image_id, str(store.imageAlt), "store"),
      products: list<{ name: string; price: string }>(store.products),
    },
    stats,
    testimonials: {
      eyebrow: str(testimonialsCopy.eyebrow),
      title: str(testimonialsCopy.title),
      items: testimonials.filter((t) => t.placement === "home"),
    },
    recognition: {
      awardsEyebrow: str(recognition.awardsEyebrow, fallback.recognition.awardsEyebrow),
      awardsTitle: str(recognition.awardsTitle, fallback.recognition.awardsTitle),
      awards,
      btsEyebrow: str(recognition.btsEyebrow, fallback.recognition.btsEyebrow),
      btsTitle: str(recognition.btsTitle, fallback.recognition.btsTitle),
      bts: list<string>(s("home.bts").image_ids).map((id) => imageFrom(media, id, str(recognition.btsImageAlt))),
    },
    instagram: {
      eyebrow: str(instagram.eyebrow),
      title: str(instagram.title),
      copy: str(instagram.copy),
      href: settings.social.instagram,
      images: list<string>(instagram.image_ids).map((id) => imageFrom(media, id, str(instagram.imageAlt))),
    },
    journalFaq: {
      journalEyebrow: str(journalFaq.journalEyebrow, fallback.journalFaq.journalEyebrow),
      journalTitle: str(journalFaq.journalTitle, fallback.journalFaq.journalTitle),
      faqEyebrow: str(journalFaq.faqEyebrow, fallback.journalFaq.faqEyebrow),
      faqTitle: str(journalFaq.faqTitle, fallback.journalFaq.faqTitle),
      faqLink: link(journalFaq.faqLink, fallback.journalFaq.faqLink),
    },
  };
});

/** Clients + awards are shared with the About page. */
export const getClientsAndAwards = cache(async () => {
  const content = await getHomeContent();
  return { clients: content.brands, awards: content.recognition.awards };
});
