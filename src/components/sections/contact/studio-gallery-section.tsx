import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { studioGallery, studioGalleryTitle } from "@/content/contact";

/** Lightbox peek at the Creative House interiors. */
function StudioGallerySection() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <h2 className="mb-10 text-3xl sm:text-4xl">{studioGalleryTitle}</h2>
      <Gallery items={studioGallery} />
    </Section>
  );
}

export { StudioGallerySection };
