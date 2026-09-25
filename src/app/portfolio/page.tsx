import { type Metadata } from "next";

import { ProjectGrid } from "@/components/sections/portfolio/project-grid";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getPortfolio } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio — Selected Work | Gilvero",
  description:
    "Weddings, campaigns, hospitality, property, fashion and film — selected Gilvero commissions with full case studies.",
};

export default async function PortfolioPage() {
  const { categories, projects } = await getPortfolio();

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
        <ProjectGrid
          categories={categories}
          projects={projects.map(({ slug, title, category, client, year, image }) => ({
            slug,
            title,
            category,
            client,
            year,
            image,
          }))}
        />
      </Section>
      <CtaBand title="Your project could be next." />
    </>
  );
}
