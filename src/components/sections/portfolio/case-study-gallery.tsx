import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { type PortfolioProject } from "@/lib/data/portfolio";

function CaseStudyGallery({ project }: { project: PortfolioProject }) {
  if (!project.gallery.length) return null;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <h2 className="mb-10 text-3xl sm:text-4xl">Gallery</h2>
      <Gallery items={project.gallery} />
    </Section>
  );
}

export { CaseStudyGallery };
