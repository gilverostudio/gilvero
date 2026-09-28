import { Star } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

/** Awards list alongside the behind-the-scenes studio grid. */
export function Recognition({ recognition }: { recognition: HomeContent["recognition"] }) {
  const { awards } = recognition;
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{recognition.awardsEyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{recognition.awardsTitle}</h2>
          <ul className="mt-9">
            {awards.map((award, index) => (
              <Reveal key={`${award.year}-${award.name}`} as="li" delay={index * 70}>
                <div className="flex items-baseline gap-6 border-b border-border/50 py-5">
                  <span className="font-display text-sm text-primary">{award.year}</span>
                  <div>
                    <p className="font-display text-base">{award.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{award.body}</p>
                  </div>
                  <Star aria-hidden className="ml-auto size-4 text-primary/50" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">{recognition.btsEyebrow}</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">{recognition.btsTitle}</h2>
          <div className="mt-9 grid grid-cols-2 gap-4">
            {recognition.bts.map((image, index) => (
              <Reveal key={`${image.src}-${index}`} delay={index * 70}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  style={focalStyle(image)}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-border/60 object-cover opacity-80 light:opacity-95 transition-opacity hover:opacity-100"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
