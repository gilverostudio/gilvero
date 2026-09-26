import { type Metadata } from "next";

import { ProjectGrid } from "@/components/sections/portfolio/project-grid";
import { Section } from "@/components/shared/section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";
import { getPortfolio } from "@/lib/data/portfolio";

const getThisPage = () => getPage("portfolio", pageDefaults["portfolio"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function PortfolioPage() {
  const [page, { categories, projects }] = await Promise.all([getThisPage(), getPortfolio()]);

  return (
    <>
      <CmsPageHeader page={page} />
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
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
