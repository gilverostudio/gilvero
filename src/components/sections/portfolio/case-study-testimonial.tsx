import { Quote } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type PortfolioProject } from "@/lib/data/portfolio";

function CaseStudyTestimonial({ project }: { project: PortfolioProject }) {
  const { testimonial } = project;
  if (!testimonial) return null;

  return (
    <Section>
      <Reveal className="mx-auto max-w-3xl text-center">
        <Quote className="mx-auto size-7 text-primary/70" />
        <blockquote className="mt-6 text-2xl leading-snug sm:text-3xl">
          “{testimonial.quote}”
        </blockquote>
        <p className="mt-6 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {testimonial.author}
          {testimonial.role ? ` · ${testimonial.role}` : null}
        </p>
      </Reveal>
    </Section>
  );
}

export { CaseStudyTestimonial };
