import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { homeHero } from "@/content/home";
import { images } from "@/lib/images";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden">
      <Image
        src={images.hero}
        alt="Gilvero cinematographer on set in a darkened studio"
        width={1920}
        height={1088}
        preload
        className="absolute inset-0 size-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 size-[45rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]" />
      <Container className="relative pb-20 sm:pb-28">
        <p className="eyebrow reveal">{homeHero.eyebrow}</p>
        <h1 className="reveal mt-7 max-w-5xl text-[2.75rem] leading-[0.98] sm:text-[4.5rem] lg:text-[6.25rem]">
          Capture. Create.
          <br />
          <span className="gold-text">Inspire.</span>
        </h1>
        <p className="reveal mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {homeHero.description}
        </p>
        <div className="reveal mt-11 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/booking">Book a Shoot</Link>
          </Button>
          <Button asChild variant="hero" size="xl">
            <Link href="/portfolio">
              <Play aria-hidden />
              View Portfolio
            </Link>
          </Button>
          <Button asChild variant="quiet" size="xl">
            <Link href="/academy">Join Academy</Link>
          </Button>
          <Button asChild variant="quiet" size="xl">
            <Link href="/store">Shop Prints</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
