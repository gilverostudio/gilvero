import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { BookingAside } from "@/components/sections/booking/booking-aside";
import { BookingForm } from "@/components/sections/booking/booking-form";

/** Booking form beside the sticky process panel. */
function BookingSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <BookingForm />
        </Reveal>
        <Reveal delay={120}>
          <BookingAside />
        </Reveal>
      </div>
    </Section>
  );
}

export { BookingSection };
