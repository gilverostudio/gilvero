import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { type CaseStudyLabels, type PortfolioProject } from "@/lib/data/portfolio";
import { focalStyle } from "@/lib/images";

function CaseStudyHero({ project, labels }: { project: PortfolioProject; labels: CaseStudyLabels }) {
  return (
    <header data-theme="dark" className="relative min-h-[70svh] overflow-hidden pt-[72px]">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="100vw"
        preload
        style={focalStyle(project.image)}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <Container className="relative flex min-h-[70svh] flex-col justify-end pb-16">
        <Link
          href="/portfolio"
          className="mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-primary uppercase"
        >
          <ArrowLeft className="size-3.5" /> {labels.backLabel}
        </Link>
        <p className="eyebrow">{project.category}</p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.03] sm:text-6xl lg:text-7xl">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {project.story}
        </p>
      </Container>
    </header>
  );
}

export { CaseStudyHero };
