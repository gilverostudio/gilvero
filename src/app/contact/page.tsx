import { type Metadata } from "next";

import { ContactSection } from "@/components/sections/contact/contact-section";
import { MapSection } from "@/components/sections/contact/map-section";
import { StudioGallerySection } from "@/components/sections/contact/studio-gallery-section";
import { PageHeader } from "@/components/shared/page-header";
import { contactHeader } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Gilvero — Studio in Lahore | Enquiries & Quotes",
  description:
    "Call, WhatsApp, email or visit the Gilvero Creative House in Lahore. Written quotes within one working day.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={contactHeader.eyebrow}
        title={contactHeader.title}
        copy={contactHeader.copy}
        image="studio"
        crumbs={[{ label: contactHeader.crumbLabel }]}
      />
      <ContactSection />
      <StudioGallerySection />
      <MapSection />
    </>
  );
}
