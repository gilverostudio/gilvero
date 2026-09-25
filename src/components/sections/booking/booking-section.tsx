import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { BookingAside } from "@/components/sections/booking/booking-aside";
import { BookingForm } from "@/components/sections/booking/booking-form";
import { getSettings } from "@/lib/data/site";

/** Booking form beside the sticky process panel. */
async function BookingSection() {
  const settings = await getSettings();

  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <BookingForm whatsapp={settings.whatsapp} />
        </Reveal>
        <Reveal delay={120}>
          <BookingAside settings={settings} />
        </Reveal>
      </div>
    </Section>
  );
}

export { BookingSection };
