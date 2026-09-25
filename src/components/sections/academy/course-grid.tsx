import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAcademy } from "@/lib/data/pages";

async function CourseGrid() {
  const { courses, coursesHeading } = await getAcademy();

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading
        eyebrow={coursesHeading.eyebrow}
        title={coursesHeading.title}
        copy={coursesHeading.copy}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {courses.map((course, index) => (
          <Reveal key={course.slug} delay={index * 70}>
            <Link
              href={`/academy/${course.slug}`}
              className="group flex h-full flex-col rounded-[1.75rem] border border-border/60 bg-background/40 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-primary/50"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-2xl transition-colors group-hover:text-primary">
                  {course.title}
                </h3>
                <ArrowRight className="mt-2 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-3 text-xs tracking-[0.18em] text-primary uppercase">
                {course.level} · {course.duration}
              </p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {course.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {course.curriculum.slice(0, 4).map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-border/60 px-3 py-1 text-[0.7rem] text-muted-foreground"
                  >
                    {module}
                  </span>
                ))}
              </div>
              <p className="mt-7 border-t border-border/50 pt-5 text-xs text-muted-foreground">
                {course.batch} · Trainer: {course.trainer}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { CourseGrid };
