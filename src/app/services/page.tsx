import { type Metadata } from "next";
import Link from "next/link";

import { EngagementTiers } from "@/components/sections/services/engagement-tiers";
import { ProcessSteps } from "@/components/sections/services/process-steps";
import { ServiceCatalog } from "@/components/sections/services/service-catalog";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services — Photography, Film & Creative Studio | Gilvero",
  description:
    "Wedding, corporate, product, food, architecture and fashion photography, cinema-grade film production, drone work, branding, design and post production.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Everything from the first frame to the framed print."
        copy="Three disciplines, seventy specialisms, one accountable producer per project."
        image="product"
        crumbs={[{ label: "Services" }]}
        actions={
          <>
            <Button asChild variant="gold" size="lg">
              <Link href="/booking">Get a Quote</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <Link href="/portfolio">See the Work</Link>
            </Button>
          </>
        }
      />
      <ServiceCatalog />
      <EngagementTiers />
      <ProcessSteps />
      <CtaBand title="Tell us what you're making." />
    </>
  );
}
