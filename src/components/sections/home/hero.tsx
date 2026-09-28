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
        className="hero-settle absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      {/* Vignette + film grain: keeps the eye on the copy, adds a cinematic finish. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,transparent_35%,oklch(0%_0_0/0.55)_100%)]" />
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[45rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <Container className="relative pb-20 sm:pb-28">
        <p className="eyebrow reveal" style={{ animationDelay: "250ms" }}>{hero.eyebrow}</p>
        <h1 style={{ animationDelay: "380ms" }} className="reveal mt-7 max-w-5xl text-[2.75rem] leading-[0.98] sm:text-[4.5rem] lg:text-[6.25rem]">
          {hero.headline[0]}
          {hero.headline[1] ? (
            <>
              <br />
              <span className="gold-text">{hero.headline[1]}</span>
            </>
          ) : null}
        </h1>
        <p style={{ animationDelay: "560ms" }} className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {hero.description}
        </p>
        {hero.actions.length ? (
          <div style={{ animationDelay: "720ms" }} className="reveal mt-11 flex flex-wrap gap-3">
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
      {/* Scroll cue */}
      <div
        aria-hidden
        className="reveal absolute bottom-0 left-1/2 hidden -translate-x-1/2 lg:block"
        style={{ animationDelay: "1200ms" }}
      >
        <span className="relative block h-14 w-px overflow-hidden bg-foreground/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_2.2s_var(--ease-lux)_infinite] bg-gradient-to-b from-transparent via-primary to-transparent" />
        </span>
      </div>
    </section>
  );
}
