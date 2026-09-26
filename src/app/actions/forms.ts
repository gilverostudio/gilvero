"use server";

import { after } from "next/server";
import { z } from "zod";

import { cmsEnabled } from "@/lib/cms";
import { getSettings } from "@/lib/data/site";
import { notifyStudio } from "@/lib/notify";

/**
 * Every website form posts here. Submissions are stored through the database's
 * `submit_form` function (validation + rate limiting live there too) and the
 * studio is emailed afterwards when email is configured.
 */

export type FormResult = { ok: true } | { ok: false; error: string };

const text = (max: number) => z.string().trim().max(max);
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200);
const phone = z.string().trim().min(5, "Please enter a phone number.").max(60);
/** Storage paths returned by the booking upload (see lib/uploads.ts). */
const attachment = z.string().regex(/^bookings\/[0-9a-f-]{36}\/[\w.-]{1,120}$/);

const schemas = {
  booking: z.object({
    name: text(200).min(1, "Please enter your name."),
    email,
    phone,
    service: text(120),
    date: z.union([z.literal(""), z.string().regex(/^\d{4}-\d{2}-\d{2}$/)]),
    city: text(120),
    budget: text(120),
    message: text(5000),
    attachments: z.array(attachment).max(5),
  }),
  contact: z.object({
    name: text(200).min(1, "Please enter your name."),
    email,
    phone,
    message: text(5000).min(1, "Please tell us about the project."),
  }),
  academy: z.object({
    name: text(200).min(1, "Please enter your name."),
    email,
    phone,
    message: text(3000),
    course: text(160),
  }),
  newsletter: z.object({ email }),
} as const;

export type FormKind = keyof typeof schemas;
export type FormInput<K extends FormKind> = z.input<(typeof schemas)[K]>;

const UNAVAILABLE = "Sorry — the form isn't available right now. Please reach us on WhatsApp or by email.";

export async function submitForm<K extends FormKind>(kind: K, input: FormInput<K> & { company?: string }): Promise<FormResult> {
  // Honeypot: real visitors never see or fill the hidden "company" field.
  if (input.company) return { ok: true };

  const parsed = schemas[kind].safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  if (!cmsEnabled) return { ok: false, error: UNAVAILABLE };

  const { name = "", email: address, phone: tel = "", ...data } = parsed.data as Record<string, unknown> & {
    name?: string;
    email: string;
    phone?: string;
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/submit_form`, {
    method: "POST",
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ p_kind: kind, p_name: name, p_email: address, p_phone: tel, p_data: data }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { code?: string };
    if (body.code === "P0429") return { ok: false, error: "You've sent a few of these already — we'll be in touch shortly." };
    if (body.code === "22023") return { ok: false, error: "Please check your email address." };
    console.error("[forms] submit_form failed", res.status, body);
    return { ok: false, error: UNAVAILABLE };
  }

  // Email the studio without making the visitor wait.
  if (kind !== "newsletter") {
    after(async () => {
      const settings = await getSettings();
      await notifyStudio({ kind, name, email: address, phone: tel, data, studioEmail: settings.email, siteName: settings.name });
    });
  }

  return { ok: true };
}
