import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/content/portfolio";
import { images } from "@/lib/images";

function MoreWork({ currentSlug }: { currentSlug: string }) {
  const related: Project[] = projects.filter((project) => project.slug !== currentSlug).slice(0, 3);

  return (
    <Section className="border-t border-border/60">
      <div className="mb-10 flex items-end justify-between gap-6">
        <h2 className="text-3xl sm:text-4xl">More work</h2>
        <Button asChild variant="quiet">
          <Link href="/portfolio">All projects</Link>
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
              src={images[project.image]}
              alt={project.title}
              width={1200}
              height={900}
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
