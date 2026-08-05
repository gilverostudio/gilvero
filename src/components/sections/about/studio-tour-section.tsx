import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { studioTour } from "@/content/about";

/** Lightbox tour of the Creative House spaces. */
function StudioTourSection() {
  return (
    <Section>
      <SectionHeading eyebrow="Studio tour" title="Where the work happens" />
      <Gallery items={studioTour} />
    </Section>
  );
}

export { StudioTourSection };
