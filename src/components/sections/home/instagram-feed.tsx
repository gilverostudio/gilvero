import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { homeImageDimensions, instagramSection } from "@/content/home";
import { images } from "@/lib/images";

export function InstagramFeed() {
  return (
    <Section>
      <SectionHeading
        eyebrow={instagramSection.eyebrow}
        title={instagramSection.title}
        copy={instagramSection.copy}
        align="center"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {instagramSection.images.map((key, index) => (
          <Reveal key={`${key}-${index}`} delay={index * 40}>
            <a href="#" className="group block overflow-hidden rounded-xl border border-border/50">
              <Image
                src={images[key]}
                alt="Instagram post"
                width={homeImageDimensions[key].width}
                height={homeImageDimensions[key].height}
                loading="lazy"
                className="aspect-square size-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
