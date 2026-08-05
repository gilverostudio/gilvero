import { Star } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { awards, btsImages, homeImageDimensions } from "@/content/home";
import { images } from "@/lib/images";

/** Awards list alongside the behind-the-scenes studio grid. */
export function Recognition() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Recognition</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Awards & features</h2>
          <ul className="mt-9">
            {awards.map((award, index) => (
              <Reveal key={award.name} as="li" delay={index * 70}>
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
          <p className="eyebrow">Behind the scenes</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Inside the studio</h2>
          <div className="mt-9 grid grid-cols-2 gap-4">
            {btsImages.map((key, index) => (
              <Reveal key={key} delay={index * 70}>
                <Image
                  src={images[key]}
                  alt="Behind the scenes at Gilvero"
                  width={homeImageDimensions[key].width}
                  height={homeImageDimensions[key].height}
                  loading="lazy"
                  className="aspect-square w-full rounded-2xl border border-border/60 object-cover opacity-80 transition-opacity hover:opacity-100"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
