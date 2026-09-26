import { type Metadata } from "next";

import { LegalBody } from "@/components/sections/legal/legal-body";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";
import { getLegal } from "@/lib/data/forms-copy";

const getThisPage = () => getPage("privacy", pageDefaults["privacy"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function PrivacyPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <LegalBody doc={await getLegal("privacy")} />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
