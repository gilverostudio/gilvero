import Link from "next/link";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getServicesContent } from "@/lib/data/pages";

async function EngagementTiers() {
  const { tiers: engagementTiers, tiersHeading } = await getServicesContent();
  if (!engagementTiers.length) return null;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading
        eyebrow={tiersHeading.eyebrow}
        title={tiersHeading.title}
        copy={tiersHeading.copy}
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {engagementTiers.map((tier, index) => (
          <Reveal key={`${tier.name}-${index}`} delay={index * 90}>
            <div
              className={`flex h-full flex-col rounded-[1.75rem] border p-8 ${
                tier.featured
                  ? "border-primary/50 bg-primary/5 shadow-[var(--shadow-glow)]"
                  : "border-border/60 bg-background/40"
              }`}
            >
              {tier.featured ? (
                <span className="mb-4 w-fit rounded-full bg-primary px-3 py-1 text-[0.65rem] tracking-[0.2em] text-primary-foreground uppercase">
                  {tiersHeading.featuredLabel}
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
                <Link href="/booking">{tiersHeading.actionLabel}</Link>
              </Button>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { EngagementTiers };
