import { type Metadata } from "next";

import { OpenRoles } from "@/components/sections/careers/open-roles";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("careers", pageDefaults["careers"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function CareersPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <OpenRoles />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
