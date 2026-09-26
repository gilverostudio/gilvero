import { Check } from "lucide-react";

import { ApplyForm } from "@/components/sections/academy/apply-form";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type AcademyContent, type Course } from "@/lib/data/pages";

type CourseDetailProps = {
  course: Course;
  detail: AcademyContent["detail"];
};

function CourseDetail({ course, detail }: CourseDetailProps) {
  const facts = [
    { label: "Duration", value: course.duration },
    { label: "Batch", value: course.batch },
    { label: "Trainer", value: course.trainer },
    { label: "Fees", value: course.fee },
  ];

  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="grid gap-6 border-b border-border/60 pb-12 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <p className="text-[0.7rem] tracking-[0.24em] text-primary uppercase">
                  {fact.label}
                </p>
                <p className="mt-3 text-sm text-foreground/85">{fact.value}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-12 text-2xl sm:text-3xl">{detail.curriculum}</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {course.curriculum.map((module, index) => (
              <Reveal key={`${module}-${index}`} as="li" delay={index * 40}>
                <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 px-5 py-4 text-sm text-foreground/85">
                  <span className="font-display text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {module}
                </div>
              </Reveal>
            ))}
          </ul>
          <h2 className="mt-14 text-2xl sm:text-3xl">{detail.certification}</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{detail.certificationCopy}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {course.careers.map((career) => (
              <span
                key={career}
                className="flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-xs text-primary"
              >
                <Check className="size-3.5" /> {career}
              </span>
            ))}
          </div>
          <h2 className="mt-14 text-2xl sm:text-3xl">{detail.studentProjects}</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {detail.studentProjectsCopy}
          </p>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ApplyForm course={course.title} copy={detail.apply} />
        </aside>
      </div>
    </Section>
  );
}

export { CourseDetail };
