import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { getClientsAndAwards } from "@/lib/data/home";
import { getAbout } from "@/lib/data/pages";

/** Ten-year timeline beside the owned equipment list and awards. */
async function TimelineSection() {
  const [{ awards }, about] = await Promise.all([getClientsAndAwards(), getAbout()]);
  const timeline = about.timeline.entries;
  const equipment = about.equipment.items;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{about.timeline.heading.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{about.timeline.heading.title}</h2>
          <ul className="mt-9">
            {timeline.map((entry, index) => (
              <Reveal key={`${entry.year}-${index}`} as="li" delay={index * 60}>
                <div className="flex gap-6 border-b border-border/50 py-5">
                  <span className="font-display text-sm text-primary">{entry.year}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{entry.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">{about.equipment.heading.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{about.equipment.heading.title}</h2>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {equipment.map((item, index) => (
              <Reveal key={`${item}-${index}`} as="li" delay={index * 50}>
                <div className="glass rounded-xl px-5 py-4 text-sm text-foreground/85">{item}</div>
              </Reveal>
            ))}
          </ul>
          <p className="eyebrow mt-12">{about.achievementsEyebrow}</p>
          <ul className="mt-6 space-y-3">
            {awards.map((award) => (
              <li key={`${award.year}-${award.name}`} className="text-sm text-muted-foreground">
                <span className="text-primary">{award.year}</span>
                {" — "}
                {award.name}
                {", "}
                {award.body}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export { TimelineSection };
