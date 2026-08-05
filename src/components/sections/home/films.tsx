import { Play } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { filmsSection, homeImageDimensions } from "@/content/home";
import { images } from "@/lib/images";

export function LatestFilms() {
  return (
    <Section>
      <SectionHeading eyebrow={filmsSection.eyebrow} title={filmsSection.title} />
      <div className="grid gap-5 lg:grid-cols-3">
        {filmsSection.films.map((film, index) => (
          <Reveal key={film.title} delay={index * 90}>
            <div className="group relative overflow-hidden rounded-[1.75rem] border border-border/60">
              <Image
                src={images[film.image]}
                alt={film.title}
                width={homeImageDimensions[film.image].width}
                height={homeImageDimensions[film.image].height}
                loading="lazy"
                className="aspect-video size-full object-cover opacity-75 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="glass grid size-16 place-items-center rounded-full text-primary transition-transform duration-500 group-hover:scale-110">
                  <Play aria-hidden className="size-5" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                <p className="font-display text-sm">{film.title}</p>
                <span className="text-xs text-primary">{film.duration}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
