import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { processSteps } from "@/content/services";

function ProcessSteps() {
  return (
    <Section>
      <SectionHeading eyebrow="Process" title="How a Gilvero project runs" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <Reveal key={step.title} delay={index * 80}>
            <div className="h-full rounded-[1.5rem] border border-border/60 bg-card/40 p-7">
              <p className="font-display text-3xl text-primary/70">0{index + 1}</p>
              <h3 className="mt-5 text-lg">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { ProcessSteps };
