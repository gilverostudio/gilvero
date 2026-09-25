import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getAbout } from "@/lib/data/pages";

/** Lightbox tour of the Creative House spaces. */
async function StudioTourSection() {
  const { studioTour } = await getAbout();
  if (!studioTour.items.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow={studioTour.heading.eyebrow} title={studioTour.heading.title} />
      <Gallery items={studioTour.items} />
    </Section>
  );
}

export { StudioTourSection };
