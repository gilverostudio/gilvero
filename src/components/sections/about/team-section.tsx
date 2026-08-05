import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { team } from "@/content/about";
import { images } from "@/lib/images";

/** Grid of the studio's department leads. */
function TeamSection() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading eyebrow="The team" title="Twenty-two people. No freelance roulette." />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <Reveal key={member.name} delay={index * 70}>
            <div className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/40">
              <Image
                src={images.studio}
                alt={member.name}
                width={1600}
                height={1200}
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
