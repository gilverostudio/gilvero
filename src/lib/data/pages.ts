import "server-only";

import { cache } from "react";

import * as aboutStatic from "@/content/about";
import * as academyStatic from "@/content/academy";
import * as blogStatic from "@/content/blog";
import * as careersStatic from "@/content/careers";
import * as faqStatic from "@/content/faq";
import * as homeStatic from "@/content/home";
import * as servicesStatic from "@/content/services";
import { type GalleryImage } from "@/components/shared/gallery-items";
import { CMS_TAGS, cmsSelect } from "@/lib/cms";
import { getMediaMap, getSections, getSettings, imageFrom } from "@/lib/data/site";
import { staticImage, type SiteImage } from "@/lib/images";

/**
 * Journal, Academy, Services, About, Careers and FAQ — CMS data with a static
 * fallback. Everything is tagged `site`.
 */

const TAGS = [CMS_TAGS.site];
type Json = Record<string, unknown>;
const str = (v: unknown, fallback = "") => (typeof v === "string" && v ? v : fallback);
const list = <T = Json>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const section = async (key: string) => ((await getSections())?.[key] ?? {}) as Json;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/** "2026-05-03" → "03 May 2026" (the site's original date style). */
function displayDate(iso: string | null) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[Number(m) - 1]} ${y}`;
}

// ---------------------------------------------------------------------------
// Journal
// ---------------------------------------------------------------------------

export type ArticleBlock =
  | { type: "lead" | "heading" | "paragraph" | "quote"; text: string }
  | { type: "image"; image: SiteImage; caption: string };

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  read: string;
  excerpt: string;
  cover: SiteImage;
  body: ArticleBlock[];
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

type PostRow = {
  slug: string;
  title: string;
  published_on: string | null;
  read_time: string;
  excerpt: string;
  body: (Json & { type: string })[];
  cover_id: string | null;
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  category: { name: string } | null;
};

export const getJournal = cache(async (): Promise<{ categories: string[]; posts: JournalPost[] }> => {
  const [rows, categories, media] = await Promise.all([
    cmsSelect<PostRow>(
      "posts?select=slug,title,published_on,read_time,excerpt,body,cover_id,is_featured,seo_title,seo_description,category:blog_categories(name)" +
        "&status=eq.published&order=published_on.desc.nullslast,created_at.desc",
      TAGS,
    ),
    cmsSelect<{ name: string }>("blog_categories?select=name&order=sort_order.asc", TAGS),
    getMediaMap(),
  ]);

  if (!rows || !categories) {
    const featured = new Set(homeStatic.journalPreview.map((p) => p.slug));
    return {
      categories: blogStatic.blogCategories.filter((c) => c !== "All"),
      posts: blogStatic.posts.map((p) => ({
        ...p,
        cover: staticImage("academy", p.title),
        body: blogStatic.articleBody,
        featured: featured.has(p.slug),
        seoTitle: null,
        seoDescription: null,
      })),
    };
  }

  return {
    categories: categories.map((c) => c.name),
    posts: rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      category: row.category?.name ?? "",
      date: displayDate(row.published_on),
      read: row.read_time,
      excerpt: row.excerpt,
      cover: imageFrom(media, row.cover_id, row.title, "academy"),
      body: list<Json & { type: string }>(row.body).map((block): ArticleBlock =>
        block.type === "image"
          ? { type: "image", image: imageFrom(media, block.image_id, str(block.caption)), caption: str(block.caption) }
          : { type: block.type as "lead" | "heading" | "paragraph" | "quote", text: str(block.text) },
      ),
      featured: row.is_featured,
      seoTitle: row.seo_title,
      seoDescription: row.seo_description,
    })),
  };
});

export async function getPost(slug: string) {
  return (await getJournal()).posts.find((p) => p.slug === slug);
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export type FaqGroup = { topic: string; items: { question: string; answer: string }[] };

export const getFaq = cache(async (): Promise<{ groups: FaqGroup[]; home: { question: string; answer: string }[] }> => {
  const rows = await cmsSelect<{ topic: string; question: string; answer: string; show_on_home: boolean; home_order: number }>(
    "faqs?select=topic,question,answer,show_on_home,home_order&is_visible=is.true&order=topic_order.asc,sort_order.asc",
    TAGS,
  );
  if (!rows) return { groups: faqStatic.faqGroups, home: homeStatic.faqPreview };

  const groups: FaqGroup[] = [];
  for (const row of rows) {
    let group = groups.find((g) => g.topic === row.topic);
    if (!group) groups.push((group = { topic: row.topic, items: [] }));
    group.items.push({ question: row.question, answer: row.answer });
  }
  const home = rows
    .filter((r) => r.show_on_home)
    .sort((a, b) => a.home_order - b.home_order)
    .map(({ question, answer }) => ({ question, answer }));
  return { groups, home };
});

// ---------------------------------------------------------------------------
// Academy
// ---------------------------------------------------------------------------

export type Course = academyStatic.Course & { cover: SiteImage | null };

export type AcademyContent = {
  highlights: academyStatic.AcademyHighlight[];
  coursesHeading: { eyebrow: string; title: string; copy: string };
  courses: Course[];
  outcomes: { eyebrow: string; title: string; image: SiteImage; items: { quote: string; attribution: string }[] };
  detail: {
    curriculum: string;
    certification: string;
    certificationCopy: string;
    studentProjects: string;
    studentProjectsCopy: string;
    apply: {
      eyebrow: string;
      title: string;
      toast: string;
      backLabel: string;
      fields: { name: string; phone: string; email: string; message: string; submit: string };
    };
  };
};

const APPLY_DEFAULTS = {
  eyebrow: "Apply",
  title: "Reserve a seat",
  toast: "Application received. Our academy team will call you shortly.",
  backLabel: "Back to Courses",
  fields: { name: "Full name", phone: "Phone", email: "Email", message: "Anything we should know?", submit: "Submit Application" },
};

export const getAcademy = cache(async (): Promise<AcademyContent> => {
  const [courses, quotes, media, highlights, heading, outcomes, detail] = await Promise.all([
    cmsSelect<Omit<academyStatic.Course, never> & { cover_id: string | null }>(
      "courses?select=slug,title,level,duration,fee,batch,trainer,summary,curriculum,careers,cover_id&status=eq.published&order=sort_order.asc",
      TAGS,
    ),
    cmsSelect<{ quote: string; author: string; role: string }>(
      "testimonials?select=quote,author,role&placement=eq.academy_outcomes&is_visible=is.true&order=sort_order.asc",
      TAGS,
    ),
    getMediaMap(),
    section("academy.highlights"),
    section("academy.courses"),
    section("academy.outcomes"),
    section("academy.detail"),
  ]);

  if (!courses || !quotes) {
    return {
      highlights: academyStatic.academyHighlights,
      coursesHeading: academyStatic.coursesHeading,
      courses: academyStatic.courses.map((c) => ({ ...c, cover: null })),
      outcomes: {
        ...academyStatic.studentOutcomesHeading,
        image: staticImage("academy", "Academy studio session"),
        items: academyStatic.studentOutcomes,
      },
      detail: {
        curriculum: "Curriculum",
        certification: "Certification & careers",
        certificationCopy: academyStatic.certificationCopy,
        studentProjects: "Student projects",
        studentProjectsCopy: academyStatic.studentProjectsCopy,
        apply: APPLY_DEFAULTS,
      },
    };
  }

  return {
    highlights: list<academyStatic.AcademyHighlight>(highlights.items),
    coursesHeading: { eyebrow: str(heading.eyebrow), title: str(heading.title), copy: str(heading.copy) },
    courses: courses.map(({ cover_id, ...c }) => ({ ...c, cover: cover_id ? imageFrom(media, cover_id, c.title) : null })),
    outcomes: {
      eyebrow: str(outcomes.eyebrow),
      title: str(outcomes.title),
      image: imageFrom(media, detail.outcomes_image_id, str(detail.outcomesImageAlt, "Academy studio session"), "academy"),
      items: quotes.map((q) => ({ quote: q.quote, attribution: [q.author, q.role].filter(Boolean).join(" · ") })),
    },
    detail: {
      curriculum: str(detail.curriculum, "Curriculum"),
      certification: str(detail.certification, "Certification & careers"),
      certificationCopy: str(detail.certificationCopy),
      studentProjects: str(detail.studentProjects, "Student projects"),
      studentProjectsCopy: str(detail.studentProjectsCopy),
      apply: {
        eyebrow: str(detail.applyEyebrow, APPLY_DEFAULTS.eyebrow),
        title: str(detail.applyTitle, APPLY_DEFAULTS.title),
        toast: str(detail.applyToast, APPLY_DEFAULTS.toast),
        backLabel: str(detail.backLabel, APPLY_DEFAULTS.backLabel),
        fields: Object.fromEntries(
          Object.entries(APPLY_DEFAULTS.fields).map(([k, v]) => [k, str((detail.applyFields as Json | undefined)?.[k], v)]),
        ) as typeof APPLY_DEFAULTS.fields,
      },
    },
  };
});

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type ServicesContent = {
  categories: servicesStatic.ServiceCategory[];
  tiers: servicesStatic.EngagementTier[];
  steps: servicesStatic.ProcessStep[];
  tiersHeading: { eyebrow: string; title: string; copy: string; actionLabel: string; featuredLabel: string };
  processHeading: { eyebrow: string; title: string };
};

const SERVICES_HEADINGS = {
  tiers: {
    eyebrow: "Engagement",
    title: "Three ways to work with us",
    copy: "Indicative structures only — every project is quoted on scope, crew and delivery.",
    actionLabel: "Get a Quote",
    featuredLabel: "Most chosen",
  },
  process: { eyebrow: "Process", title: "How a Gilvero project runs" },
};

export const getServicesContent = cache(async (): Promise<ServicesContent> => {
  const [categories, tiers, steps, headings] = await Promise.all([
    cmsSelect<{ slug: string; title: string; intro: string; items: string[] }>(
      "service_categories?select=slug,title,intro,items&order=sort_order.asc",
      TAGS,
    ),
    cmsSelect<{ name: string; audience: string; price: string; items: string[]; is_featured: boolean }>(
      "engagement_tiers?select=name,audience,price,items,is_featured&order=sort_order.asc",
      TAGS,
    ),
    cmsSelect<servicesStatic.ProcessStep>("process_steps?select=title,copy&order=sort_order.asc", TAGS),
    section("services.headings"),
  ]);

  if (!categories || !tiers || !steps) {
    return {
      categories: servicesStatic.serviceCategories,
      tiers: servicesStatic.engagementTiers,
      steps: servicesStatic.processSteps,
      tiersHeading: SERVICES_HEADINGS.tiers,
      processHeading: SERVICES_HEADINGS.process,
    };
  }

  return {
    categories: categories.map((c) => ({ id: c.slug, title: c.title, intro: c.intro, items: c.items })),
    tiers: tiers.map((t) => ({ name: t.name, for: t.audience, price: t.price, items: t.items, featured: t.is_featured })),
    steps,
    tiersHeading: { ...SERVICES_HEADINGS.tiers, ...((headings.tiers as Json) ?? {}) } as ServicesContent["tiersHeading"],
    processHeading: { ...SERVICES_HEADINGS.process, ...((headings.process as Json) ?? {}) } as ServicesContent["processHeading"],
  };
});

// ---------------------------------------------------------------------------
// About
// ---------------------------------------------------------------------------

type Heading = { eyebrow: string; title: string };

export type AboutContent = {
  story: { eyebrow: string; title: string; paragraphs: string[]; image: SiteImage };
  missionVision: { title: string; copy: string }[];
  values: { heading: Heading; items: { title: string; copy: string }[] };
  founder: { eyebrow: string; name: string; role: string; quote: string; bio: string; image: SiteImage };
  team: { heading: Heading; members: { name: string; role: string; photo: SiteImage }[] };
  studioTour: { heading: Heading; items: GalleryImage[] };
  timeline: { heading: Heading; entries: { year: string; text: string }[] };
  equipment: { heading: Heading; items: string[] };
  achievementsEyebrow: string;
  clientsHeading: Heading;
};

const ABOUT_HEADINGS = {
  values: { eyebrow: "Core values", title: "Four things we don't negotiate" },
  team: { eyebrow: "The team", title: "Twenty-two people. No freelance roulette." },
  studioTour: { eyebrow: "Studio tour", title: "Where the work happens" },
  timeline: { eyebrow: "Timeline", title: "Ten years, briefly" },
  equipment: { eyebrow: "Equipment", title: "Owned, not rented" },
  achievements: { eyebrow: "Achievements" },
  clients: { eyebrow: "Clients", title: "Selected client list" },
};

export const getAbout = cache(async (): Promise<AboutContent> => {
  const [sections, team, timeline, media] = await Promise.all([
    getSections(),
    cmsSelect<{ name: string; role: string; photo_id: string | null }>(
      "team_members?select=name,role,photo_id&is_visible=is.true&order=sort_order.asc",
      TAGS,
    ),
    cmsSelect<{ year: string; text: string }>("timeline_entries?select=year,text&order=sort_order.asc", TAGS),
    getMediaMap(),
  ]);

  if (!sections || !team || !timeline) {
    return {
      story: { ...aboutStatic.story, image: staticImage("studio", "Gilvero studio interior") },
      missionVision: aboutStatic.missionVision,
      values: { heading: ABOUT_HEADINGS.values, items: aboutStatic.coreValues },
      founder: { ...aboutStatic.founder, image: staticImage("fashion", aboutStatic.founder.imageAlt) },
      team: {
        heading: ABOUT_HEADINGS.team,
        members: aboutStatic.team.map((m) => ({ ...m, photo: staticImage("studio", m.name) })),
      },
      studioTour: {
        heading: ABOUT_HEADINGS.studioTour,
        items: aboutStatic.studioTour.map((i) => ({ image: staticImage(i.key, i.caption), caption: i.caption })),
      },
      timeline: { heading: ABOUT_HEADINGS.timeline, entries: aboutStatic.timeline },
      equipment: { heading: ABOUT_HEADINGS.equipment, items: aboutStatic.equipment },
      achievementsEyebrow: ABOUT_HEADINGS.achievements.eyebrow,
      clientsHeading: ABOUT_HEADINGS.clients,
    };
  }

  const s = (key: string) => (sections[key] ?? {}) as Json;
  const headings = s("about.headings");
  const h = (key: keyof typeof ABOUT_HEADINGS): Heading => ({
    eyebrow: str((headings[key] as Json | undefined)?.eyebrow, ABOUT_HEADINGS[key].eyebrow),
    title: str((headings[key] as Json | undefined)?.title, "title" in ABOUT_HEADINGS[key] ? (ABOUT_HEADINGS[key] as Heading).title : ""),
  });
  const story = s("about.story");
  const founder = s("about.founder");

  return {
    story: {
      eyebrow: str(story.eyebrow),
      title: str(story.title),
      paragraphs: list<string>(story.paragraphs),
      image: imageFrom(media, headings.story_image_id, str(headings.storyImageAlt, "Gilvero studio interior")),
    },
    missionVision: list(s("about.mission-vision").items),
    values: { heading: h("values"), items: list(s("about.values").items) },
    founder: {
      eyebrow: str(founder.eyebrow),
      name: str(founder.name),
      role: str(founder.role),
      quote: str(founder.quote),
      bio: str(founder.bio),
      image: imageFrom(media, founder.image_id, str(founder.imageAlt), "fashion"),
    },
    team: { heading: h("team"), members: team.map((m) => ({ name: m.name, role: m.role, photo: imageFrom(media, m.photo_id, m.name) })) },
    studioTour: {
      heading: h("studioTour"),
      items: list(s("about.studio-tour").items).map((i) => ({
        image: imageFrom(media, i.image_id, str(i.caption)),
        caption: str(i.caption),
      })),
    },
    timeline: { heading: h("timeline"), entries: timeline },
    equipment: { heading: h("equipment"), items: list<string>(s("about.equipment").items) },
    achievementsEyebrow: h("achievements").eyebrow,
    clientsHeading: h("clients"),
  };
});

// ---------------------------------------------------------------------------
// Careers
// ---------------------------------------------------------------------------

export type CareersContent = {
  intro: { eyebrow: string; title: string; copy: string; applyLabel: string };
  roles: careersStatic.OpenRole[];
  applyEmail: string;
};

export const getCareers = cache(async (): Promise<CareersContent> => {
  const [roles, intro, settings] = await Promise.all([
    cmsSelect<careersStatic.OpenRole>("open_roles?select=title,team,location,type,summary&status=eq.published&order=sort_order.asc", TAGS),
    section("careers.intro"),
    getSettings(),
  ]);
  const applyLabel = str(intro.applyLabel, "Apply for this role");
  if (!roles) return { intro: { ...careersStatic.careersIntro, applyLabel }, roles: careersStatic.openRoles, applyEmail: settings.email };
  return {
    intro: { eyebrow: str(intro.eyebrow), title: str(intro.title), copy: str(intro.copy), applyLabel },
    roles,
    applyEmail: settings.email,
  };
});
