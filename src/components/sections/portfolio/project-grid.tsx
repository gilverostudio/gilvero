"use client";

import { FadeImage as Image } from "@/components/shared/fade-image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { type PortfolioProject } from "@/lib/data/portfolio";
import { focalStyle } from "@/lib/images";
import { cn } from "@/lib/utils";

type ProjectCard = Pick<PortfolioProject, "slug" | "title" | "category" | "client" | "year" | "image">;

type ProjectGridProps = {
  categories: string[];
  projects: ProjectCard[];
};

function ProjectGrid({ categories, projects }: ProjectGridProps) {
  const [category, setCategory] = useState("All");
  const visibleProjects =
    category === "All" ? projects : projects.filter((project) => project.category === category);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2">
        {["All", ...categories].map((label) => (
          <button
            key={label}
            onClick={() => setCategory(label)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs tracking-wide transition-all duration-500",
              category === label
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      {visibleProjects.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          New work in this category is being finished — check back shortly.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 70}>
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/40 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]"
              >
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  style={focalStyle(project.image)}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div className="flex items-end justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <p className="text-[0.7rem] tracking-[0.22em] text-primary uppercase">
                      {project.category}
                    </p>
                    <h2 className="mt-2 truncate text-lg">{project.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {project.client} · {project.year}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </>
  );
}

export { ProjectGrid };
