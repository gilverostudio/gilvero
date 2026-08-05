import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type Project } from "@/content/portfolio";

function CaseStudyOverview({ project }: { project: Project }) {
  const facts = [
    { label: "Client", value: project.client },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year },
    { label: "Services", value: project.services.join(", ") },
  ];
  const narrative = [
    { title: "Challenge", copy: project.challenge },
    { title: "Solution", copy: project.solution },
    { title: "Result", copy: project.result },
  ];

  return (
    <Section>
      <div className="grid gap-10 border-b border-border/60 pb-14 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label}>
            <p className="text-[0.7rem] tracking-[0.24em] text-primary uppercase">{fact.label}</p>
            <p className="mt-3 text-sm text-foreground/85">{fact.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-10 pt-14 lg:grid-cols-3">
        {narrative.map((block, index) => (
          <Reveal key={block.title} delay={index * 90}>
            <div className="glass h-full rounded-[1.5rem] p-8">
              <h2 className="text-xl text-primary">{block.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{block.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { CaseStudyOverview };
