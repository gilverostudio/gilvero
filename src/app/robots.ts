import type { MetadataRoute } from "next";

import { getSettings } from "@/lib/data/site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getSettings();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/client-area"] }],
    sitemap: `${url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
