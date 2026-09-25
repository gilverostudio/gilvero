import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

export function ServicesOverview({ services: servicesOverview }: { services: HomeContent["services"] }) {
  return (
    <Section>
      <SectionHeading
        eyebrow={servicesOverview.eyebrow}
        title={servicesOverview.title}
        copy={servicesOverview.copy}
        action={
          <Button asChild variant="quiet" size="lg">
            <Link href="/services">
              {servicesOverview.linkLabel} <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <div className="grid gap-5 md:grid-cols-2">
        {servicesOverview.cards.map((card, index) => (
          <Reveal key={card.title} delay={index * 90}>
            <Link
              href="/services"
              className="group relative block overflow-hidden rounded-[2rem] border border-border/60"
            >
              <Image
                src={card.image.src}
                alt={card.image.alt}
                width={card.image.width}
                height={card.image.height}
                sizes="(min-width: 768px) 50vw, 100vw"
                style={focalStyle(card.image)}
                loading="lazy"
                className="aspect-[16/11] size-full object-cover opacity-70 transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                <h3 className="text-2xl sm:text-3xl">{card.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {card.copy}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-primary uppercase">
                  Explore <ArrowRight aria-hidden className="size-3.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
