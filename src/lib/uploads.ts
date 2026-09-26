/**
 * Browser-side upload of booking reference files to the private `submissions`
 * bucket. Visitors can upload but never list or read files (storage RLS);
 * the studio views them from the admin inbox via signed links.
 */

export const REFERENCE_LIMITS = {
  maxFiles: 5,
  maxBytes: 10 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"],
};

export const uploadsEnabled = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

function safeName(name: string) {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name).replace(/[^\w-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || "file";
  const ext = dot > 0 ? name.slice(dot + 1).replace(/[^\w]/g, "").slice(0, 8).toLowerCase() : "";
  return ext ? `${base}.${ext}` : base;
}

/** Uploads files under one random folder; returns their storage paths. */
export async function uploadReferences(files: File[]): Promise<string[]> {
  const folder = `bookings/${crypto.randomUUID()}`;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return Promise.all(
    files.map(async (file, i) => {
      const path = `${folder}/${i + 1}-${safeName(file.name)}`;
      const res = await fetch(`${url}/storage/v1/object/submissions/${path}`, {
        method: "POST",
        headers: { apikey: key, authorization: `Bearer ${key}`, "content-type": file.type, "x-upsert": "false" },
        body: file,
      });
      if (!res.ok) throw new Error(`Couldn't upload ${file.name}.`);
      return path;
    }),
  );
}
