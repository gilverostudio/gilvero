import { FadeImage as Image } from "@/components/shared/fade-image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { getAcademy } from "@/lib/data/pages";
import { focalStyle } from "@/lib/images";

async function StudentOutcomes() {
  const { outcomes } = await getAcademy();
  const studentOutcomesHeading = outcomes;
  const studentOutcomes = outcomes.items;

  return (
    <Section>
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <Image
            src={outcomes.image.src}
            alt={outcomes.image.alt}
            width={outcomes.image.width}
            height={outcomes.image.height}
            sizes="(min-width: 1024px) 50vw, 100vw"
            style={focalStyle(outcomes.image)}
            className="w-full rounded-[2rem] border border-border/60 object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{studentOutcomesHeading.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{studentOutcomesHeading.title}</h2>
          <ul className="mt-8 space-y-4">
            {studentOutcomes.map((outcome) => (
              <li key={`${outcome.attribution}-${outcome.quote.slice(0, 16)}`} className="glass rounded-2xl p-6">
                <p className="text-sm leading-relaxed text-foreground/90">
                  &ldquo;{outcome.quote}&rdquo;
                </p>
                <p className="mt-3 text-xs tracking-[0.16em] text-primary uppercase">
                  {outcome.attribution}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export { StudentOutcomes };
