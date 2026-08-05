import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { academyPreview } from "@/content/home";
import { images } from "@/lib/images";

export function AcademyPreview() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] border border-border/60">
            <Image
              src={images.academy}
              alt={academyPreview.imageAlt}
              width={1600}
              height={1008}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <p className="eyebrow">{academyPreview.eyebrow}</p>
          <h2 className="mt-4 text-3xl leading-[1.08] sm:text-5xl">{academyPreview.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {academyPreview.copy}
          </p>
          <ul className="mt-8 space-y-4">
            {academyPreview.quotes.map((item) => (
              <li key={item.attribution} className="glass rounded-2xl p-6">
                <p className="text-sm leading-relaxed text-foreground/90">“{item.quote}”</p>
                <p className="mt-3 text-xs tracking-[0.16em] text-primary uppercase">
                  {item.attribution}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href="/academy">Enroll Now</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <Link href="/academy">View Courses</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
