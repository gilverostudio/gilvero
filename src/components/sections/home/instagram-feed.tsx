import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

export function InstagramFeed({ instagram: instagramSection }: { instagram: HomeContent["instagram"] }) {
  if (!instagramSection.images.length) return null;
  const external = instagramSection.href.startsWith("http");

  return (
    <Section>
      <SectionHeading
        eyebrow={instagramSection.eyebrow}
        title={instagramSection.title}
        copy={instagramSection.copy}
        align="center"
      />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {instagramSection.images.map((image, index) => (
          <Reveal key={`${image.src}-${index}`} delay={index * 40}>
            <a
              href={instagramSection.href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="group block overflow-hidden rounded-xl border border-border/50"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                style={focalStyle(image)}
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
