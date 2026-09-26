import { type Metadata } from "next";

import { EngagementTiers } from "@/components/sections/services/engagement-tiers";
import { ProcessSteps } from "@/components/sections/services/process-steps";
import { ServiceCatalog } from "@/components/sections/services/service-catalog";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("services", pageDefaults["services"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function ServicesPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <ServiceCatalog />
      <EngagementTiers />
      <ProcessSteps />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
