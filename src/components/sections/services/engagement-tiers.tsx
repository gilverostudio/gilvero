import Link from "next/link";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { engagementTiers } from "@/content/services";

function EngagementTiers() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading
        eyebrow="Engagement"
        title="Three ways to work with us"
        copy="Indicative structures only — every project is quoted on scope, crew and delivery."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {engagementTiers.map((tier, index) => (
          <Reveal key={tier.name} delay={index * 90}>
            <div
              className={`flex h-full flex-col rounded-[1.75rem] border p-8 ${
                tier.featured
                  ? "border-primary/50 bg-primary/5 shadow-[var(--shadow-glow)]"
                  : "border-border/60 bg-background/40"
              }`}
            >
              {tier.featured ? (
                <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-[0.65rem] tracking-[0.2em] text-primary-foreground uppercase">
                  Most chosen
                </span>
              ) : null}
              <h3 className="text-2xl">{tier.name}</h3>
              <p className="mt-2 text-xs tracking-[0.18em] text-primary uppercase">{tier.for}</p>
              <p className="mt-6 font-display text-lg">{tier.price}</p>
              <ul className="mt-7 flex-1 space-y-3">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={tier.featured ? "gold" : "quiet"}
                size="lg"
                className="mt-8"
              >
                <Link href="/booking">Get a Quote</Link>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { EngagementTiers };
