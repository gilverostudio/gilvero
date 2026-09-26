import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getStore } from "@/lib/data/store";

async function OrderTracking() {
  const { tracking } = await getStore();

  return (
    <Section>
      <SectionHeading eyebrow={tracking.eyebrow} title={tracking.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {tracking.steps.map((step, index) => (
          <Reveal key={`${step}-${index}`} delay={index * 70}>
            <div className="glass rounded-2xl p-6">
              <p className="font-display text-2xl text-primary/70">0{index + 1}</p>
              <p className="mt-4 text-sm text-foreground/85">{step}</p>
            </div>
          </Reveal>
        ))}
      </div>
      {tracking.note ? (
        <p className="mt-8 text-sm text-muted-foreground">
          {tracking.note}{" "}
          <Link href="/client-area" className="text-primary hover:underline">
            {tracking.noteLinkLabel}
          </Link>
          .
        </p>
      ) : null}
    </Section>
  );
}

export { OrderTracking };
