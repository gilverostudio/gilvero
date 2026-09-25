import { bookingAside, bookingSteps } from "@/content/booking";
import type { SiteSettings } from "@/lib/data/site";

/** Sticky "what happens next" panel beside the booking form. */
function BookingAside({ settings: siteConfig }: { settings: Pick<SiteSettings, "phone" | "hours"> }) {
  return (
    <aside className="glass sticky top-28 rounded-[1.75rem] p-8">
      <p className="eyebrow">{bookingAside.eyebrow}</p>
      <ol className="mt-6 space-y-5">
        {bookingSteps.map((step, index) => (
          <li key={step} className="flex gap-4 text-sm text-muted-foreground">
            <span className="font-display text-primary">0{index + 1}</span> {step}
          </li>
        ))}
      </ol>
      <div className="mt-8 border-t border-border/60 pt-6 text-sm text-muted-foreground">
        <p className="text-foreground/90">{bookingAside.talkPrompt}</p>
        <a href={`tel:${siteConfig.phone}`} className="mt-2 block text-primary hover:underline">
          {siteConfig.phone}
        </a>
        <p className="mt-3">{siteConfig.hours}</p>
      </div>
    </aside>
  );
}

export { BookingAside };
