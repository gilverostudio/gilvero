import "server-only";

/**
 * New-enquiry emails via Resend (https://resend.com). Optional: without
 * RESEND_API_KEY nothing is sent and submissions still land in the admin inbox.
 *
 *   RESEND_API_KEY   — required to send
 *   NOTIFY_EMAIL     — recipient (defaults to the studio email in Settings)
 *   NOTIFY_FROM      — sender on a domain verified in Resend
 *                      (defaults to Resend's test sender, which only delivers
 *                      to the Resend account owner's address)
 *   RESEND_API_BASE  — override the API origin (tests only)
 */

const LABELS: Record<string, string> = {
  booking: "Booking request",
  contact: "Enquiry",
  academy: "Academy application",
};

const FIELD_LABELS: Record<string, string> = {
  service: "Service",
  date: "Preferred date",
  city: "City",
  budget: "Budget",
  course: "Course",
  message: "Message",
  attachments: "Reference files",
};

const escape = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Notification = {
  kind: string;
  name: string;
  email: string;
  phone: string;
  data: Record<string, unknown>;
  studioEmail: string;
  siteName: string;
};

export async function notifyStudio({ kind, name, email, phone, data, studioEmail, siteName }: Notification) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const label = LABELS[kind] ?? "Website form";
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ...Object.entries(data)
      .filter(([, v]) => (Array.isArray(v) ? v.length : v))
      .map(([k, v]): [string, string] => [
        FIELD_LABELS[k] ?? k,
        Array.isArray(v) ? `${v.length} file${v.length === 1 ? "" : "s"} — open the admin inbox to view` : String(v),
      ]),
  ].filter((row): row is [string, string] => Boolean(row[1]));

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;color:#1a1a1a">
      <p style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#a07d2c;margin:0 0 8px">${escape(siteName)}</p>
      <h2 style="margin:0 0 20px">New ${escape(label.toLowerCase())}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#666;vertical-align:top;white-space:nowrap">${escape(k)}</td>` +
              `<td style="padding:8px 0;white-space:pre-wrap">${escape(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin-top:24px;font-size:13px;color:#666">Reply to this email to answer ${escape(name || email)} directly.</p>
    </div>`;

  try {
    const res = await fetch(`${process.env.RESEND_API_BASE || "https://api.resend.com"}/emails`, {
      method: "POST",
      headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || `${siteName} Website <onboarding@resend.dev>`,
        to: [process.env.NOTIFY_EMAIL || studioEmail],
        reply_to: email,
        subject: `${label}${name ? ` — ${name}` : ""}`,
        html,
      }),
    });
    if (!res.ok) console.error("[notify] Resend responded", res.status, await res.text());
  } catch (error) {
    console.error("[notify] failed", error);
  }
}
