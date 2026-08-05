import { type Metadata } from "next";

import { ProjectGrid } from "@/components/sections/portfolio/project-grid";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";

export const metadata: Metadata = {
  title: "Portfolio — Selected Work | Gilvero",
  description:
    "Weddings, campaigns, hospitality, property, fashion and film — selected Gilvero commissions with full case studies.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work, with the reasoning intact."
        copy="Each case study includes the brief, the constraint, the approach and the result."
        image="wedding"
        crumbs={[{ label: "Portfolio" }]}
      />
      <Section>
        <ProjectGrid />
      </Section>
      <CtaBand title="Your project could be next." />
    </>
  );
}
