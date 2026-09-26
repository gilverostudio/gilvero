import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/sections/academy/course-detail";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { fillTemplate, getPage } from "@/lib/data/page-meta";
import { getAcademy } from "@/lib/data/pages";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

const getTemplate = () => getPage("academy-detail", pageDefaults["academy-detail"]);

export async function generateStaticParams() {
  const { courses } = await getAcademy();
  return courses.map((course) => ({ slug: course.slug }));
}

async function getCourse(slug: string) {
  return (await getAcademy()).courses.find((course) => course.slug === slug);
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [course, page] = await Promise.all([getCourse(slug), getTemplate()]);
  if (!course) return {};
  const vars = { title: course.title, summary: course.summary, level: course.level, duration: course.duration };
  return {
    title: fillTemplate(page.seoTitle, vars),
    description: fillTemplate(page.seoDescription, vars),
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, { detail }, page] = await Promise.all([getCourse(slug), getAcademy(), getTemplate()]);
  if (!course) notFound();

  return (
    <>
      <CmsPageHeader
        page={course.cover ? { ...page, header: { ...page.header, image: course.cover } } : page}
        parents={[{ label: page.header.crumb || "Academy", href: "/academy" }]}
        eyebrow={`${course.level} · ${course.duration}`}
        title={course.title}
        copy={course.summary}
        actions={null}
      />
      <CourseDetail course={course} detail={detail} />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
