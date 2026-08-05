import { Award, Clock, Users, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { academyHighlights, type AcademyHighlight } from "@/content/academy";

const highlightIcons: Record<AcademyHighlight["icon"], LucideIcon> = {
  users: Users,
  award: Award,
  clock: Clock,
};

function AcademyHighlights() {
  return (
    <Section>
      <div className="grid gap-5 sm:grid-cols-3">
        {academyHighlights.map((highlight, index) => {
          const Icon = highlightIcons[highlight.icon];
          return (
            <Reveal key={highlight.title} delay={index * 80}>
              <div className="glass h-full rounded-[1.5rem] p-8">
                <Icon className="size-5 text-primary" />
                <h2 className="mt-5 text-lg">{highlight.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {highlight.copy}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export { AcademyHighlights };
