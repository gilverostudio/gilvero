import { Award, Clock, Users, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type AcademyHighlight } from "@/content/academy";
import { getAcademy } from "@/lib/data/pages";

const highlightIcons: Record<AcademyHighlight["icon"], LucideIcon> = {
  users: Users,
  award: Award,
  clock: Clock,
};

async function AcademyHighlights() {
  const { highlights: academyHighlights } = await getAcademy();
  if (!academyHighlights.length) return null;

  return (
    <Section>
      <div className="grid gap-5 sm:grid-cols-3">
        {academyHighlights.map((highlight, index) => {
          const Icon = highlightIcons[highlight.icon] ?? Award;
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
