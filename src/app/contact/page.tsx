import { type Metadata } from "next";

import { ContactSection } from "@/components/sections/contact/contact-section";
import { MapSection } from "@/components/sections/contact/map-section";
import { StudioGallerySection } from "@/components/sections/contact/studio-gallery-section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("contact", pageDefaults["contact"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function ContactPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <ContactSection />
      <StudioGallerySection />
      <MapSection />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
