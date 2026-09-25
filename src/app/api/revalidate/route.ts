import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest } from "next/server";

/**
 * On-demand cache refresh, called by the Gilvero admin after content is saved.
 *
 *   POST /api/revalidate   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "tags": ["projects", "project:the-lahore-vows"], "paths": ["/portfolio"] }
 *
 *   GET  /api/revalidate   (same header) — health check used by the admin dashboard.
 */
function authorised(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!authorised(request)) return Response.json({ ok: false }, { status: 401 });
  return Response.json({ ok: true });
}

export async function POST(request: NextRequest) {
  if (!authorised(request)) return Response.json({ ok: false }, { status: 401 });

  const body = (await request.json().catch(() => null)) as { tags?: unknown; paths?: unknown } | null;
  const tags = Array.isArray(body?.tags) ? body.tags.filter((t): t is string => typeof t === "string") : [];
  const paths = Array.isArray(body?.paths) ? body.paths.filter((p): p is string => typeof p === "string") : [];

  if (!tags.length && !paths.length) {
    return Response.json({ ok: false, message: "Provide tags and/or paths" }, { status: 400 });
  }

  // Expire immediately so an editor sees their change on the next page load.
  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  return Response.json({ ok: true, tags, paths, now: Date.now() });
}
