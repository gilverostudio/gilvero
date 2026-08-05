import { Quote } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonialsSection } from "@/content/home";

export function Testimonials() {
  return (
    <Section>
      <SectionHeading
        eyebrow={testimonialsSection.eyebrow}
        title={testimonialsSection.title}
        align="center"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonialsSection.quotes.map((testimonial, index) => (
          <Reveal key={testimonial.author} delay={index * 80}>
            <figure className="glass h-full rounded-[1.75rem] p-8">
              <Quote aria-hidden className="size-6 text-primary/70" />
              <blockquote className="mt-5 text-lg leading-relaxed text-foreground/90">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.18em] text-muted-foreground uppercase">
                {testimonial.author} · {testimonial.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
