import { type Metadata } from "next";

import { ClientAreaSection } from "@/components/sections/client-area/client-area-section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("client-area", pageDefaults["client-area"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function ClientAreaPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <ClientAreaSection />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
