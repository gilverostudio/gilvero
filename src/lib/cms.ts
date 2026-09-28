import "server-only";

/**
 * Thin read-only client for the Gilvero CMS (Supabase PostgREST).
 *
 * - Uses plain `fetch`, so responses live in the Next.js data cache and are
 *   refreshed on demand by the admin via `revalidateTag` (see /api/revalidate).
 * - Returns `null` when the CMS isn't configured, so callers can fall back to
 *   the static content in `src/content` (local dev, previews, first deploys).
 * - Settings are read at **runtime** (not only at build time), so a deploy
 *   whose build step didn't receive the env vars still connects once the
 *   server has them. See /api/status for a quick health check.
 */

/** Cache tags. Keep in sync with the admin's `revalidateWebsite()` calls. */
export const CMS_TAGS = {
  /** Projects, portfolio categories, galleries. */
  portfolio: "portfolio",
  /** Settings, menus, section copy, homepage collections, media. */
  site: "site",
} as const;

/** Safety net if an on-demand refresh is ever missed. */
const FALLBACK_REVALIDATE_SECONDS = 3600;

/**
 * Read an env var at runtime. Indexing with a variable keeps Next.js from
 * replacing `process.env.NEXT_PUBLIC_*` with its (possibly empty) build-time value.
 */
function runtimeEnv(...names: string[]) {
  const env = process.env as Record<string, string | undefined>;
  for (const name of names) {
    const value = env[name]?.trim();
    if (value) return value;
  }
  return undefined;
}

export type CmsConfig = { url: string; anonKey: string };

/** Supabase connection details, or null when the CMS isn't configured. */
export function cmsConfig(): CmsConfig | null {
  const url = runtimeEnv("NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_URL") ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey =
    runtimeEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && anonKey ? { url: url.replace(/\/$/, ""), anonKey } : null;
}

export function isCmsEnabled() {
  return cmsConfig() !== null;
}

export async function cmsSelect<T>(query: string, tags: string[]): Promise<T[] | null> {
  const config = cmsConfig();
  if (!config) return null;

  const res = await fetch(`${config.url}/rest/v1/${query}`, {
    headers: { apikey: config.anonKey, authorization: `Bearer ${config.anonKey}` },
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
  return `${cmsConfig()?.url ?? ""}/storage/v1/object/public/media/${storagePath}`;
}

/** Runtime env lookup shared with other server modules (revalidate secret, email). */
export { runtimeEnv };
