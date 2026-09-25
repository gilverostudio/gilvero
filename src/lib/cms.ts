import "server-only";

/**
 * Thin read-only client for the Gilvero CMS (Supabase PostgREST).
 *
 * - Uses plain `fetch`, so responses live in the Next.js data cache and are
 *   refreshed on demand by the admin via `revalidateTag` (see /api/revalidate).
 * - Returns `null` when the CMS isn't configured, so callers can fall back to
 *   the static content in `src/content` (local dev, previews, first deploys).
 */

/** Cache tags. Keep in sync with the admin's `revalidateWebsite()` calls. */
export const CMS_TAGS = {
  portfolio: "portfolio",
} as const;

/** Safety net if an on-demand refresh is ever missed. */
const FALLBACK_REVALIDATE_SECONDS = 3600;

const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const cmsEnabled = Boolean(baseUrl && anonKey);

export async function cmsSelect<T>(query: string, tags: string[]): Promise<T[] | null> {
  if (!cmsEnabled) return null;

  const res = await fetch(`${baseUrl}/rest/v1/${query}`, {
    headers: { apikey: anonKey!, authorization: `Bearer ${anonKey}` },
    cache: "force-cache",
    next: { tags, revalidate: FALLBACK_REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status}): ${query.split("?")[0]}`);
  }
  return (await res.json()) as T[];
}

/** Public URL of a file in the `media` storage bucket. */
export function mediaUrl(storagePath: string) {
  return `${baseUrl}/storage/v1/object/public/media/${storagePath}`;
}
