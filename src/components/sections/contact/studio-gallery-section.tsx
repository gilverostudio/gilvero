import { Gallery } from "@/components/shared/gallery";
import { Section } from "@/components/shared/section";
import { getContactCopy } from "@/lib/data/forms-copy";

/** Lightbox gallery of the studio spaces. */
async function StudioGallerySection() {
  const { gallery } = await getContactCopy();
  if (!gallery.items.length) return null;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <h2 className="mb-10 text-3xl sm:text-4xl">{gallery.title}</h2>
      <Gallery items={gallery.items} />
    </Section>
  );
}

export { StudioGallerySection };
