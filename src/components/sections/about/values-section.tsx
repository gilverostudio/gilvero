import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { coreValues } from "@/content/about";

/** The four non-negotiable studio values on a charcoal band. */
function ValuesSection() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading eyebrow="Core values" title="Four things we don't negotiate" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {coreValues.map((value, index) => (
          <Reveal key={value.title} delay={index * 80}>
            <div className="h-full rounded-[1.5rem] border border-border/60 bg-background/40 p-7">
              <p className="font-display text-xl text-primary">0{index + 1}</p>
              <h3 className="mt-4 text-lg">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { ValuesSection };
