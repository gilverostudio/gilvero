import { Quote } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type Project } from "@/content/portfolio";

function CaseStudyTestimonial({ project }: { project: Project }) {
  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto size-7 text-primary/70" />
        <blockquote className="mt-6 text-2xl leading-snug sm:text-3xl">
          “{project.testimonial.quote}”
        </blockquote>
        <p className="mt-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {project.testimonial.author} · {project.testimonial.role}
        </p>
      </Reveal>
    </Section>
  );
}

export { CaseStudyTestimonial };
