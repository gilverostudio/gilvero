import "server-only";

import { cache } from "react";

import * as bookingStatic from "@/content/booking";
import * as clientAreaStatic from "@/content/client-area";
import * as contactStatic from "@/content/contact";
import * as legalStatic from "@/content/legal";
import { type GalleryImage } from "@/components/shared/gallery-items";
import { CMS_TAGS, cmsSelect } from "@/lib/cms";
import { getMediaMap, getSections, imageFrom } from "@/lib/data/site";
import { staticImage } from "@/lib/images";

/** Booking, Contact, Client Area and legal page content, with static fallbacks. */

type Json = Record<string, unknown>;
/** Deep merge that ignores empty CMS values, so a blank field never blanks the site. */
function merge<T>(base: T, value: unknown): T {
  if (Array.isArray(base)) return (Array.isArray(value) && value.length ? value : base) as T;
  if (base && typeof base === "object") {
    const patch = (value ?? {}) as Json;
    return Object.fromEntries(Object.entries(base as Json).map(([k, v]) => [k, merge(v, patch[k])])) as T;
  }
  return (typeof value === typeof base && value !== "" ? value : base) as T;
}

// ---------------------------------------------------------------------------
// Booking
// ---------------------------------------------------------------------------

export type BookingCopy = {
  form: bookingStatic.BookingFormContent & { name: { label: string } };
  services: string[];
  cities: string[];
  budgets: string[];
  aside: { eyebrow: string; talkPrompt: string; steps: string[] };
};

const BOOKING: BookingCopy = {
  form: { ...bookingStatic.bookingForm, name: { label: "Name" } },
  services: bookingStatic.services,
  cities: bookingStatic.cities,
  budgets: bookingStatic.budgets,
  aside: { ...bookingStatic.bookingAside, steps: bookingStatic.bookingSteps },
};

export const getBookingCopy = cache(async (): Promise<BookingCopy> => {
  const s = await getSections();
  if (!s) return BOOKING;
  const form = (s["booking.form"] ?? {}) as Json;
  return {
    form: merge(BOOKING.form, form),
    services: merge(BOOKING.services, form.services),
    cities: merge(BOOKING.cities, form.cities),
    budgets: merge(BOOKING.budgets, form.budgets),
    aside: merge(BOOKING.aside, s["booking.aside"]),
  };
});

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export type ContactCopy = {
  form: contactStatic.ContactFormContent;
  gallery: { title: string; items: GalleryImage[] };
  map: { title: string; iframeTitle: string; src: string };
};

export const getContactCopy = cache(async (): Promise<ContactCopy> => {
  const [s, media] = await Promise.all([getSections(), getMediaMap()]);
  const staticGallery = contactStatic.studioGallery.map((i) => ({ image: staticImage(i.key, i.caption), caption: i.caption }));
  if (!s) {
    return {
      form: contactStatic.contactForm,
      gallery: { title: contactStatic.studioGalleryTitle, items: staticGallery },
      map: contactStatic.mapSection,
    };
  }
  const gallery = (s["contact.gallery"] ?? {}) as { title?: string; items?: { image_id?: string; caption?: string }[] };
  return {
    form: merge(contactStatic.contactForm, s["contact.form"]),
    gallery: {
      title: gallery.title || contactStatic.studioGalleryTitle,
      items: (gallery.items ?? []).map((i) => ({ image: imageFrom(media, i.image_id, i.caption ?? ""), caption: i.caption ?? "" })),
    },
    map: merge(contactStatic.mapSection, s["contact.map"]),
  };
});

// ---------------------------------------------------------------------------
// Client area
// ---------------------------------------------------------------------------

export type ClientAreaCopy = { signIn: clientAreaStatic.SignInContent; features: clientAreaStatic.ClientFeature[] };

export const getClientAreaCopy = cache(async (): Promise<ClientAreaCopy> => {
  const s = await getSections();
  if (!s) return { signIn: clientAreaStatic.signIn, features: clientAreaStatic.clientFeatures };
  return {
    signIn: merge(clientAreaStatic.signIn, s["client-area.sign-in"]),
    features: merge(clientAreaStatic.clientFeatures, (s["client-area.features"] as Json | undefined)?.items),
  };
});

// ---------------------------------------------------------------------------
// Legal
// ---------------------------------------------------------------------------

export type LegalDoc = legalStatic.LegalDoc;

export const getLegal = cache(async (slug: "privacy" | "terms"): Promise<LegalDoc> => {
  const fallback = slug === "privacy" ? legalStatic.privacyPolicy : legalStatic.termsOfService;
  const rows = await cmsSelect<LegalDoc>(
    `legal_pages?select=eyebrow,title,crumb,updated,intro,sections&slug=eq.${slug}`,
    [CMS_TAGS.site],
  );
  const row = rows?.[0];
  if (!row) return fallback;
  return {
    ...row,
    sections: row.sections.map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs ?? [],
      ...(section.bullets?.length ? { bullets: section.bullets } : {}),
    })),
  };
});
