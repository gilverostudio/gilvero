import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { applyEmail, careersIntro, openRoles } from "@/content/careers";

function OpenRoles() {
  return (
    <Section>
      <SectionHeading
        eyebrow={careersIntro.eyebrow}
        title={careersIntro.title}
        copy={careersIntro.copy}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {openRoles.map((role, index) => (
          <Reveal key={role.title} delay={index * 70}>
            <div className="flex h-full flex-col rounded-[1.5rem] border border-border/60 bg-card/40 p-7">
              <p className="text-xs tracking-[0.16em] text-primary uppercase">{role.team}</p>
              <h3 className="mt-3 text-lg">{role.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {role.location} · {role.type}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{role.summary}</p>
              <div className="mt-auto pt-6">
                <a
                  href={`mailto:${applyEmail}?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/85 transition-colors hover:text-primary"
                >
                  Apply for this role
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { OpenRoles };
