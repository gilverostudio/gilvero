import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type LegalDoc } from "@/content/legal";

type LegalBodyProps = {
  doc: LegalDoc;
};

function LegalBody({ doc }: LegalBodyProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="text-xs tracking-[0.16em] text-primary uppercase">{doc.updated}</p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">{doc.intro}</p>
        </Reveal>
        <div className="mt-14 space-y-12">
          {doc.sections.map((section, index) => (
            <Reveal key={section.heading} delay={Math.min(index, 4) * 70}>
              <h2 className="font-display text-xl sm:text-2xl">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground [list-style-type:disc] marker:text-primary/60">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

export { LegalBody };
