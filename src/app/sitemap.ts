import type { MetadataRoute } from "next";

import { getPortfolio } from "@/lib/data/portfolio";
import { getAcademy, getJournal } from "@/lib/data/pages";
import { getSettings } from "@/lib/data/site";

/** Generated from the CMS, so new projects, courses and articles are listed automatically. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ url }, { projects }, { courses }, { posts }] = await Promise.all([
    getSettings(),
    getPortfolio(),
    getAcademy(),
    getJournal(),
  ]);
  const base = url.replace(/\/$/, "");

  const pages = ["", "/about", "/services", "/portfolio", "/academy", "/blog", "/store", "/booking", "/contact", "/careers", "/faq", "/privacy", "/terms"];

  return [
    ...pages.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${base}/portfolio/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...courses.map((c) => ({ url: `${base}/academy/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
