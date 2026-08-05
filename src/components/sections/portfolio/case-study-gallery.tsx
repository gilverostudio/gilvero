import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { type Project } from "@/content/portfolio";

function CaseStudyGallery({ project }: { project: Project }) {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <h2 className="mb-10 text-3xl sm:text-4xl">Gallery</h2>
      <Gallery
        items={[
          { key: project.image, caption: `${project.title} — 01` },
          { key: "studio", caption: `${project.title} — 02` },
          { key: "fashion", caption: `${project.title} — 03` },
          { key: "architecture", caption: `${project.title} — 04` },
          { key: "product", caption: `${project.title} — 05` },
        ]}
      />
    </Section>
  );
}

export { CaseStudyGallery };
