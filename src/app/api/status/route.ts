import { isCmsEnabled } from "@/lib/cms";

/**
 * Public, secret-free health check: which integrations this deploy can see.
 * Used by the admin's "Website link" card to explain connection problems.
 *
 *   GET /api/status → { cms, revalidate, email }
 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      cms: isCmsEnabled(),
      revalidate: Boolean(process.env.REVALIDATE_SECRET),
      email: Boolean(process.env.RESEND_API_KEY),
    },
    { headers: { "cache-control": "no-store" } },
  );
}
