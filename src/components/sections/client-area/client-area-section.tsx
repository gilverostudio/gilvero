import { Download, FileText, Images, Lock, type LucideIcon } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SignInForm } from "@/components/sections/client-area/sign-in-form";
import { clientFeatures, type ClientFeatureIcon } from "@/content/client-area";

const featureIcons: Record<ClientFeatureIcon, LucideIcon> = {
  images: Images,
  "file-text": FileText,
  download: Download,
  lock: Lock,
};

/** Sign-in form beside the client-area feature list. */
function ClientAreaSection() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <SignInForm />
        </Reveal>
        <div className="space-y-4">
          {clientFeatures.map((feature, index) => {
            const Icon = featureIcons[feature.icon];
            return (
              <Reveal key={feature.title} delay={index * 70}>
                <div className="glass flex items-start gap-4 rounded-2xl p-6">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/90">{feature.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{feature.copy}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export { ClientAreaSection };
