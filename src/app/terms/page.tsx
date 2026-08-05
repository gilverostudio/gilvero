import { type Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { LegalBody } from "@/components/sections/legal/legal-body";
import { termsOfService } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms of Service | Gilvero",
  description:
    "The terms that govern Gilvero engagements — bookings and retainers, payments, delivery timelines, image rights and usage licences, Academy enrolment and print orders.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow={termsOfService.eyebrow}
        title={termsOfService.title}
        image="studio"
        crumbs={[{ label: termsOfService.crumb }]}
      />
      <LegalBody doc={termsOfService} />
    </>
  );
}
