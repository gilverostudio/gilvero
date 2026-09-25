import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getClientsAndAwards } from "@/lib/data/home";
import { getAbout } from "@/lib/data/pages";

/** Wordmark strip of selected clients. */
async function ClientsSection() {
  const [{ clients }, { clientsHeading }] = await Promise.all([getClientsAndAwards(), getAbout()]);
  if (!clients.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow={clientsHeading.eyebrow} title={clientsHeading.title} align="center" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
        {clients.map((client, index) => (
          <span key={`${client}-${index}`} className="font-display text-sm tracking-[0.3em] text-foreground/40">
            {client}
          </span>
        ))}
      </div>
    </Section>
  );
}

export { ClientsSection };
