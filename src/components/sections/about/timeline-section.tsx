import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { awards, equipment, timeline } from "@/content/about";

/** Ten-year timeline beside the owned equipment list and awards. */
function TimelineSection() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Timeline</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Ten years, briefly</h2>
          <ul className="mt-9">
            {timeline.map((entry, index) => (
              <Reveal key={entry.year} as="li" delay={index * 60}>
                <div className="flex gap-6 border-b border-border/50 py-5">
                  <span className="font-display text-sm text-primary">{entry.year}</span>
                  <p className="text-sm leading-relaxed text-muted-foreground">{entry.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Equipment</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Owned, not rented</h2>
          <ul className="mt-9 grid gap-3 sm:grid-cols-2">
            {equipment.map((item, index) => (
              <Reveal key={item} as="li" delay={index * 50}>
                <div className="glass rounded-xl px-5 py-4 text-sm text-foreground/85">{item}</div>
              </Reveal>
            ))}
          </ul>
          <p className="eyebrow mt-12">Achievements</p>
          <ul className="mt-6 space-y-3">
            {awards.map((award) => (
              <li key={award.name} className="text-sm text-muted-foreground">
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
