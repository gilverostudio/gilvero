import { type Metadata } from "next";

import { BookingSection } from "@/components/sections/booking/booking-section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("booking", pageDefaults["booking"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function BookingPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <BookingSection />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
