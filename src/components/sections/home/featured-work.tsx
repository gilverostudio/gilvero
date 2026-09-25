import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { type HomeContent } from "@/lib/data/home";
import { getFeaturedProjects } from "@/lib/data/portfolio";
import { focalStyle } from "@/lib/images";

export async function FeaturedWork({ section: featuredWorkSection }: { section: HomeContent["featured"] }) {
  const works = await getFeaturedProjects();
  if (!works.length) return null;

  return (
    <Section className="border-t border-border/60 bg-charcoal">
      <SectionHeading
        eyebrow={featuredWorkSection.eyebrow}
        title={featuredWorkSection.title}
        copy={featuredWorkSection.copy}
        action={
          <Button asChild variant="quiet" size="lg">
            <Link href="/portfolio">
              {featuredWorkSection.linkLabel} <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work, index) => (
          <Reveal key={work.slug} delay={index * 70}>
            <Link
              href={`/portfolio/${work.slug}`}
              className="group block overflow-hidden rounded-[1.75rem] border border-border/60 bg-background"
            >
              <div className="overflow-hidden">
                <Image
                  src={work.image.src}
                  alt={work.image.alt}
                  width={work.image.width}
                  height={work.image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={focalStyle(work.image)}
                  loading="lazy"
                  className="aspect-[4/5] size-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div className="min-w-0">
                  <p className="text-[0.7rem] tracking-[0.22em] text-primary uppercase">
                    {work.category}
                  </p>
                  <h3 className="mt-2 truncate text-lg">{work.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {work.location} · {work.year}
                  </p>
                </div>
                <ArrowRight
                  aria-hidden
                  className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
