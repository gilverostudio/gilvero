import type { NextConfig } from "next";

/**
 * Pages are prerendered from the CMS at build time, so a production build without
 * the Supabase settings would silently ship the built-in fallback copy (and never
 * pick up admin edits). Netlify sets CONTEXT; fail loudly there instead.
 */
const cmsConfigured = Boolean(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) &&
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY),
);
if (process.env.CONTEXT === "production" && !cmsConfigured) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing from this build. " +
      "In Netlify → Site configuration → Environment variables, set them for the Production context " +
      "with the Builds and Functions scopes, then redeploy.",
  );
}

const nextConfig: NextConfig = {
  images: {
    // Images uploaded through the admin are served from Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
