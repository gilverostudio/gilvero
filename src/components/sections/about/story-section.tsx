import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { getAbout } from "@/lib/data/pages";
import { focalStyle } from "@/lib/images";

/** Origin story beside the mission/vision cards and a studio still. */
async function StorySection() {
  const { story, missionVision } = await getAbout();

  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="eyebrow">{story.eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-[1.1] sm:text-4xl">{story.title}</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <div className="grid gap-5">
          {missionVision.map((pillar, index) => (
            <Reveal key={`${pillar.title}-${index}`} delay={index * 100}>
              <div className="glass rounded-[1.75rem] p-8">
                <p className="eyebrow">{pillar.title}</p>
                <p className="mt-4 text-lg leading-relaxed text-foreground/90">{pillar.copy}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={200}>
            <Image
              src={story.image.src}
              alt={story.image.alt}
              width={story.image.width}
              height={story.image.height}
              sizes="(min-width: 1024px) 45vw, 100vw"
              style={focalStyle(story.image)}
              className="w-full rounded-[1.75rem] border border-border/60 object-cover"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export { StorySection };
