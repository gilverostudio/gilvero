import { Section } from "@/components/shared/section";
import { getContactCopy } from "@/lib/data/forms-copy";

/** Embedded map to the studio. */
async function MapSection() {
  const { map: mapSection } = await getContactCopy();
  if (!mapSection.src) return null;

  return (
    <Section>
      <h2 className="mb-8 text-3xl sm:text-4xl">{mapSection.title}</h2>
      <div className="overflow-hidden rounded-[1.75rem] border border-border/60">
        <iframe
          title={mapSection.iframeTitle}
          src={mapSection.src}
          className="h-[420px] w-full grayscale-[0.6]"
          loading="lazy"
        />
      </div>
    </Section>
  );
}

export { MapSection };
