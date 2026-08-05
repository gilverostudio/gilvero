import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyGallery } from "@/components/sections/portfolio/case-study-gallery";
import { CaseStudyHero } from "@/components/sections/portfolio/case-study-hero";
import { CaseStudyOverview } from "@/components/sections/portfolio/case-study-overview";
import { CaseStudyTestimonial } from "@/components/sections/portfolio/case-study-testimonial";
import { MoreWork } from "@/components/sections/portfolio/more-work";
import { CtaBand } from "@/components/shared/cta-band";
import { getProject, projectSlugs } from "@/content/portfolio";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category} Case Study | Gilvero`,
    description: project.story,
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      <CaseStudyGallery project={project} />
      <CaseStudyTestimonial project={project} />
      <MoreWork currentSlug={project.slug} />
      <CtaBand />
    </>
  );
}
