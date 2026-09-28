import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section data-theme="dark" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        width={hero.image.width}
        height={hero.image.height}
        sizes="100vw"
        preload
        style={focalStyle(hero.image)}
        className="absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[45rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <Container className="relative pb-20 sm:pb-28">
        <p className="eyebrow reveal">{hero.eyebrow}</p>
        <h1 className="reveal mt-7 max-w-5xl text-[2.75rem] leading-[0.98] sm:text-[4.5rem] lg:text-[6.25rem]">
          {hero.headline[0]}
          {hero.headline[1] ? (
            <>
              <br />
              <span className="gold-text">{hero.headline[1]}</span>
            </>
          ) : null}
        </h1>
        <p className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.description}
        </p>
        {hero.actions.length ? (
          <div className="reveal mt-11 flex flex-wrap gap-3">
            {hero.actions.map((action) => (
              <Button key={`${action.label}-${action.href}`} asChild variant={action.variant} size="xl">
                <Link href={action.href}>
                  {action.variant === "hero" ? <Play aria-hidden /> : null}
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
