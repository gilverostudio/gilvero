import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { founder } from "@/content/about";
import { images } from "@/lib/images";

/** Founder portrait and short profile. */
function FounderSection() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Image
            src={images.fashion}
            alt={founder.imageAlt}
            width={1200}
            height={1504}
            className="w-full rounded-[2rem] border border-border/60 object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{founder.eyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{founder.name}</h2>
          <p className="mt-2 text-sm tracking-[0.18em] text-primary uppercase">{founder.role}</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>{founder.quote}</p>
            <p>{founder.bio}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export { FounderSection };
