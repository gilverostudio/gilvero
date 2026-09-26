import { PrintConfigurator } from "@/components/sections/store/print-configurator";
import { UploadPanel } from "@/components/sections/store/upload-panel";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getStore } from "@/lib/data/store";

async function ConfigurePrint() {
  const store = await getStore();
  const { configurator } = store;

  return (
    <Section className="border-y border-border/60 bg-charcoal">
      <SectionHeading eyebrow={configurator.eyebrow} title={configurator.title} copy={configurator.copy} />
      <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <UploadPanel copy={store.upload} toastMessage={store.toasts.chooseFile} />
        </Reveal>
        <Reveal delay={100}>
          <PrintConfigurator
            sizes={store.sizes}
            papers={store.papers}
            frames={store.frames}
            defaultSize={store.defaultSize}
            labels={configurator}
            checkoutToast={store.toasts.checkout}
          />
        </Reveal>
      </div>
    </Section>
  );
}

export { ConfigurePrint };
