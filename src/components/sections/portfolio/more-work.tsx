import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { getCaseStudyLabels, getPortfolio } from "@/lib/data/portfolio";
import { focalStyle } from "@/lib/images";

async function MoreWork({ currentSlug }: { currentSlug: string }) {
  const [{ projects }, labels] = await Promise.all([getPortfolio(), getCaseStudyLabels()]);
  const related = projects.filter((project) => project.slug !== currentSlug).slice(0, 3);
  if (!related.length) return null;

  return (
    <Section className="border-t border-border/60">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="text-3xl sm:text-4xl">{labels.moreTitle}</h2>
        <Button asChild variant="quiet">
          <Link href="/portfolio">{labels.allLabel}</Link>
        </Button>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {related.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group overflow-hidden rounded-[1.5rem] border border-border/60"
          >
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.image.width}
              height={project.image.height}
              sizes="(min-width: 640px) 33vw, 100vw"
              style={focalStyle(project.image)}
              className="aspect-[4/3] w-full object-cover opacity-75 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="p-5">
              <p className="text-[0.7rem] tracking-[0.2em] text-primary uppercase">
                {project.category}
              </p>
              <p className="mt-2 font-display">{project.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export { MoreWork };
