import "server-only";

import { type Metadata } from "next";
import { cache } from "react";

import { CMS_TAGS, cmsSelect } from "@/lib/cms";
import { getMediaMap, type CtaContent } from "@/lib/data/site";
import { staticImage, type ImageKey, type SiteImage } from "@/lib/images";

/**
 * Per-page SEO, header and closing call-to-action from the `pages` table.
 * Every page passes its current built-in values as defaults, so the site
 * looks identical when the CMS is off or a field is left empty.
 */

export type HeaderAction = { label: string; href: string; variant: "gold" | "quiet" | "hero" };

export type PageHeaderContent = {
  eyebrow: string;
  title: string;
  copy: string;
  crumb: string;
  image: SiteImage;
  actions: HeaderAction[];
  actionLabel: string;
};

export type PageContent = {
  seoTitle: string;
  seoDescription: string;
  header: PageHeaderContent;
  cta: CtaContent | null;
};

export type PageDefaults = {
  seoTitle: string;
  seoDescription: string;
  header?: Partial<Omit<PageHeaderContent, "image">> & { image?: ImageKey };
  cta?: CtaContent | null;
};

type PageRow = {
  seo_title: string | null;
  seo_description: string | null;
  header: (Partial<Omit<PageHeaderContent, "image">> & { image_id?: string }) | null;
  cta: CtaContent | null;
};

const getPageRow = cache(async (slug: string) => {
  const rows = await cmsSelect<PageRow>(`pages?select=seo_title,seo_description,header,cta&slug=eq.${encodeURIComponent(slug)}`, [
    CMS_TAGS.site,
  ]);
  return rows?.[0] ?? null;
});

const pick = (value: unknown, fallback: string) => (typeof value === "string" && value.trim() ? value : fallback);

export async function getPage(slug: string, defaults: PageDefaults): Promise<PageContent> {
  const [row, media] = await Promise.all([getPageRow(slug), getMediaMap()]);
  const d = defaults.header ?? {};
  const h = row?.header ?? {};
  const fallbackImage = staticImage(d.image ?? "studio");
  const image = h.image_id ? (media.get(h.image_id) ?? fallbackImage) : fallbackImage;

  const cta = row ? (row.cta ?? (defaults.cta === undefined ? null : defaults.cta)) : (defaults.cta ?? null);

  return {
    seoTitle: pick(row?.seo_title, defaults.seoTitle),
    seoDescription: pick(row?.seo_description, defaults.seoDescription),
    header: {
      eyebrow: pick(h.eyebrow, d.eyebrow ?? ""),
      title: pick(h.title, d.title ?? ""),
      copy: pick(h.copy, d.copy ?? ""),
      crumb: pick(h.crumb, d.crumb ?? ""),
      image,
      // A saved (even empty) button list is authoritative; defaults only when never set.
      actions: Array.isArray(h.actions) ? h.actions : (d.actions ?? []),
      actionLabel: pick(h.actionLabel, d.actionLabel ?? ""),
    },
    cta,
  };
}

/** Metadata for a page from its SEO fields. */
export function pageMetadata(page: PageContent): Metadata {
  return { title: page.seoTitle, description: page.seoDescription };
}

/** "{title} — {category} Case Study" + { title, category } → filled string. */
export function fillTemplate(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}
