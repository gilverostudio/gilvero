import { PrintConfigurator } from "@/components/sections/store/print-configurator";
import { UploadPanel } from "@/components/sections/store/upload-panel";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { configuratorHeading } from "@/content/store";

function ConfigurePrint() {
  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading
        eyebrow={configuratorHeading.eyebrow}
        title={configuratorHeading.title}
        copy={configuratorHeading.copy}
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <UploadPanel />
        </Reveal>
        <Reveal delay={100}>
          <PrintConfigurator />
        </Reveal>
      </div>
    </Section>
  );
}

export { ConfigurePrint };
