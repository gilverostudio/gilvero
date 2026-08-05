import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { trackingHeading, trackingSteps } from "@/content/store";

function OrderTracking() {
  return (
    <Section>
      <SectionHeading eyebrow={trackingHeading.eyebrow} title={trackingHeading.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {trackingSteps.map((step, index) => (
          <Reveal key={step} delay={index * 70}>
            <div className="glass rounded-2xl p-6">
              <p className="font-display text-2xl text-primary/70">0{index + 1}</p>
              <p className="mt-4 text-sm text-foreground/85">{step}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        Existing customers can track live status inside the{" "}
        <Link href="/client-area" className="text-primary hover:underline">
          Client Area
        </Link>
        .
      </p>
    </Section>
  );
}

export { OrderTracking };
