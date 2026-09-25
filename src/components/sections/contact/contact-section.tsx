import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { ContactChannels } from "@/components/sections/contact/contact-channels";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { getSettings } from "@/lib/data/site";

/** Contact channels beside the enquiry form. */
async function ContactSection() {
  const settings = await getSettings();

  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <ContactChannels />
        <Reveal delay={120}>
          <ContactForm whatsapp={settings.whatsapp} />
        </Reveal>
      </div>
    </Section>
  );
}

export { ContactSection };
