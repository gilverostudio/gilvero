import { type Metadata } from "next";

import { FaqList } from "@/components/sections/faq/faq-list";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("faq", pageDefaults["faq"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function FaqPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <FaqList />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
