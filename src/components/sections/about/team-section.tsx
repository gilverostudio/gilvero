import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAbout } from "@/lib/data/pages";
import { focalStyle } from "@/lib/images";

/** Grid of the studio's department leads. */
async function TeamSection() {
  const { team: teamContent } = await getAbout();
  const team = teamContent.members;
  if (!team.length) return null;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading eyebrow={teamContent.heading.eyebrow} title={teamContent.heading.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <Reveal key={`${member.name}-${index}`} delay={index * 70}>
            <div className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/40">
              <Image
                src={member.photo.src}
                alt={member.photo.alt || member.name}
                width={member.photo.width}
                height={member.photo.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={focalStyle(member.photo)}
                className="aspect-[4/3] w-full object-cover opacity-60 transition-opacity duration-700 group-hover:opacity-90"
              />
              <div className="p-6">
                <h3 className="text-lg">{member.name}</h3>
                <p className="mt-1 text-xs tracking-[0.16em] text-primary uppercase">
                  {member.role}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { TeamSection };
