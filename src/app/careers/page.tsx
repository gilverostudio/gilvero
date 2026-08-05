import { type Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { OpenRoles } from "@/components/sections/careers/open-roles";
import { careersHeader } from "@/content/careers";

export const metadata: Metadata = {
  title: "Careers — Join the Gilvero Team",
  description:
    "Open roles at Gilvero Creative House in Lahore — photographers, cinematographers, retouchers, producers and Academy trainers. Send a portfolio and join the credits.",
};

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow={careersHeader.eyebrow}
        title={careersHeader.title}
        copy={careersHeader.copy}
        image="studio"
        crumbs={[{ label: "Careers" }]}
      />
      <OpenRoles />
      <CtaBand
        title="Don't see your role?"
        copy="We keep a shortlist for every discipline. Send a portfolio, tell us what you'd own, and we will reach out when the seat opens."
        primary={{ label: "Contact the Studio", href: "/contact" }}
        secondary={{ label: "About Gilvero", href: "/about" }}
      />
    </>
  );
}
