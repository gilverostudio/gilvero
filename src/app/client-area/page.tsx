import { type Metadata } from "next";

import { ClientAreaSection } from "@/components/sections/client-area/client-area-section";
import { PageHeader } from "@/components/shared/page-header";
import { clientAreaHeader } from "@/content/client-area";

export const metadata: Metadata = {
  title: "Client Area — Private Galleries & Downloads | Gilvero",
  description:
    "Sign in to view private galleries, approve selects, download final files and track print orders.",
};

export default function ClientAreaPage() {
  return (
    <>
      <PageHeader
        eyebrow={clientAreaHeader.eyebrow}
        title={clientAreaHeader.title}
        copy={clientAreaHeader.copy}
        image="studio"
        crumbs={[{ label: clientAreaHeader.crumbLabel }]}
      />
      <ClientAreaSection />
    </>
  );
}
