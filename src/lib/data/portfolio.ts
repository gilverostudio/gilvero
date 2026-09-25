import "server-only";

import { cache } from "react";

import { CMS_TAGS, cmsSelect, mediaUrl } from "@/lib/cms";
import { staticImage, type ImageKey, type SiteImage } from "@/lib/images";
import { featuredWorkSection } from "@/content/home";
import * as fallback from "@/content/portfolio";

export type PortfolioProject = {
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  year: string;
  image: SiteImage;
  story: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  testimonial: { quote: string; author: string; role: string } | null;
  gallery: { image: SiteImage; caption: string }[];
  featured: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type Portfolio = {
  /** Visible category names, in display order (without "All"). */
  categories: string[];
  /** Published projects, in display order. */
  projects: PortfolioProject[];
};

// ---------------------------------------------------------------------------
// CMS rows → site shape
// ---------------------------------------------------------------------------

type MediaRow = {
  storage_path: string;
  width: number;
  height: number;
  alt: string;
  focal_x: number;
  focal_y: number;
};

type ProjectRow = {
  slug: string;
  title: string;
  client: string;
  location: string;
  year: string;
  story: string;
  challenge: string;
  solution: string;
  result: string;
  services: string[];
  testimonial_quote: string | null;
  testimonial_author: string | null;
  testimonial_role: string | null;
  is_featured: boolean;
  featured_order: number;
  seo_title: string | null;
  seo_description: string | null;
  category: { name: string } | null;
  cover: MediaRow | null;
  gallery: { caption: string; media: MediaRow }[];
};

const MEDIA = "storage_path,width,height,alt,focal_x,focal_y";
const PROJECT_QUERY =
  "projects?select=slug,title,client,location,year,story,challenge,solution,result,services," +
  "testimonial_quote,testimonial_author,testimonial_role,is_featured,featured_order,seo_title,seo_description," +
  `category:portfolio_categories(name),cover:media(${MEDIA}),gallery:project_images(caption,sort_order,media(${MEDIA}))` +
  "&status=eq.published&order=sort_order.asc&gallery.order=sort_order.asc";

function toImage(row: MediaRow, fallbackAlt: string): SiteImage {
  return {
    src: mediaUrl(row.storage_path),
    width: row.width,
    height: row.height,
    alt: row.alt || fallbackAlt,
    focalX: row.focal_x,
    focalY: row.focal_y,
  };
}

function fromRow(row: ProjectRow): PortfolioProject {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category?.name ?? "",
    client: row.client,
    location: row.location,
    year: row.year,
    image: row.cover ? toImage(row.cover, row.title) : staticImage("studio", row.title),
    story: row.story,
    challenge: row.challenge,
    solution: row.solution,
    result: row.result,
    services: row.services,
    testimonial: row.testimonial_quote
      ? { quote: row.testimonial_quote, author: row.testimonial_author ?? "", role: row.testimonial_role ?? "" }
      : null,
    gallery: row.gallery.map((g) => ({ image: toImage(g.media, g.caption), caption: g.caption })),
    featured: row.is_featured,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
}

// ---------------------------------------------------------------------------
// Static fallback (used when the CMS isn't configured)
// ---------------------------------------------------------------------------

const FALLBACK_GALLERY: ImageKey[] = ["studio", "fashion", "architecture", "product"];

function fromStatic(project: fallback.Project): PortfolioProject {
  const gallery = [project.image, ...FALLBACK_GALLERY];
  return {
    ...project,
    image: staticImage(project.image, project.title),
    gallery: gallery.map((key, i) => {
      const caption = `${project.title} — ${String(i + 1).padStart(2, "0")}`;
      return { image: staticImage(key, caption), caption };
    }),
    featured: true,
    seoTitle: null,
    seoDescription: null,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export const getPortfolio = cache(async (): Promise<Portfolio> => {
  const [projectRows, categoryRows] = await Promise.all([
    cmsSelect<ProjectRow>(PROJECT_QUERY, [CMS_TAGS.portfolio]),
    cmsSelect<{ name: string }>(
      "portfolio_categories?select=name&is_visible=is.true&order=sort_order.asc",
      [CMS_TAGS.portfolio],
    ),
  ]);

  if (!projectRows || !categoryRows) {
    return {
      categories: fallback.portfolioCategories.filter((c) => c !== "All"),
      projects: fallback.projects.map(fromStatic),
    };
  }
  return { categories: categoryRows.map((c) => c.name), projects: projectRows.map(fromRow) };
});

export async function getProject(slug: string) {
  const { projects } = await getPortfolio();
  return projects.find((project) => project.slug === slug);
}

/** Projects flagged "featured on homepage", in their chosen order. */
export const getFeaturedProjects = cache(async (): Promise<PortfolioProject[]> => {
  const rows = await cmsSelect<{ slug: string }>(
    "projects?select=slug&status=eq.published&is_featured=is.true&order=featured_order.asc",
    [CMS_TAGS.portfolio],
  );
  const { projects } = await getPortfolio();
  const slugs = rows ? rows.map((row) => row.slug) : featuredWorkSection.works.map((work) => work.slug);
  return slugs.flatMap((slug) => projects.find((p) => p.slug === slug) ?? []);
});
