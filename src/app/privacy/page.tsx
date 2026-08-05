import { type Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { LegalBody } from "@/components/sections/legal/legal-body";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | Gilvero",
  description:
    "How Gilvero Creative Media collects, uses and protects your information — bookings, client galleries, Academy enrolment, print orders and your rights over your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow={privacyPolicy.eyebrow}
        title={privacyPolicy.title}
        image="studio"
        crumbs={[{ label: privacyPolicy.crumb }]}
      />
      <LegalBody doc={privacyPolicy} />
    </>
  );
}
