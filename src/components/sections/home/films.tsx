import { Play } from "lucide-react";
import { FadeImage as Image } from "@/components/shared/fade-image";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

export function LatestFilms({ films }: { films: HomeContent["films"] }) {
  if (!films.items.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow={films.eyebrow} title={films.title} />
      <div className="grid gap-5 lg:grid-cols-3">
        {films.items.map((film, index) => {
          const card = (
            <div data-theme="dark" className="group relative overflow-hidden rounded-[1.75rem] border border-border/60 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
              <Image
                src={film.image.src}
                alt={film.image.alt}
                width={film.image.width}
                height={film.image.height}
                sizes="(min-width: 1024px) 33vw, 100vw"
                loading="lazy"
                style={focalStyle(film.image)}
                className="aspect-video size-full object-cover opacity-75 light:opacity-95 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-95"
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
          );
          return (
            <Reveal key={`${film.title}-${index}`} delay={index * 90}>
              {film.videoUrl ? (
                <a href={film.videoUrl} target="_blank" rel="noreferrer" aria-label={`Watch ${film.title}`}>
                  {card}
                </a>
              ) : (
                card
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
