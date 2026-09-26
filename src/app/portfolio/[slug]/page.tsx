import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyGallery } from "@/components/sections/portfolio/case-study-gallery";
import { CaseStudyHero } from "@/components/sections/portfolio/case-study-hero";
import { CaseStudyOverview } from "@/components/sections/portfolio/case-study-overview";
import { CaseStudyTestimonial } from "@/components/sections/portfolio/case-study-testimonial";
import { MoreWork } from "@/components/sections/portfolio/more-work";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { fillTemplate, getPage } from "@/lib/data/page-meta";
import { getCaseStudyLabels, getPortfolio, getProject } from "@/lib/data/portfolio";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { projects } = await getPortfolio();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [project, page] = await Promise.all([getProject(slug), getPage("portfolio-detail", pageDefaults["portfolio-detail"])]);
  if (!project) return {};
  const vars = { title: project.title, category: project.category, story: project.story, client: project.client };
  return {
    title: project.seoTitle || fillTemplate(page.seoTitle, vars),
    description: project.seoDescription || fillTemplate(page.seoDescription, vars),
    openGraph: { images: [{ url: project.image.src, width: project.image.width, height: project.image.height }] },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const [project, page, labels] = await Promise.all([
    getProject(slug),
    getPage("portfolio-detail", pageDefaults["portfolio-detail"]),
    getCaseStudyLabels(),
  ]);
  if (!project) notFound();

  return (
    <>
      <CaseStudyHero project={project} labels={labels} />
      <CaseStudyOverview project={project} />
      <CaseStudyGallery project={project} labels={labels} />
      <CaseStudyTestimonial project={project} />
      <MoreWork currentSlug={project.slug} />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
