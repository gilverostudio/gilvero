import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getClientsAndAwards } from "@/lib/data/home";

/** Wordmark strip of selected clients. */
async function ClientsSection() {
  const { clients } = await getClientsAndAwards();
  if (!clients.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow="Clients" title="Selected client list" align="center" />
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
        {clients.map((client) => (
          <span key={client} className="font-display text-sm tracking-[0.3em] text-foreground/40">
            {client}
          </span>
        ))}
      </div>
    </Section>
  );
}

export { ClientsSection };
