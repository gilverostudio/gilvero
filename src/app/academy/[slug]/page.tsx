import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/sections/academy/course-detail";
import { PageHeader } from "@/components/shared/page-header";
import { courseSlugs, getCourse } from "@/content/academy";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return courseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} — Gilvero Academy`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${course.level} · ${course.duration}`}
        title={course.title}
        copy={course.summary}
        image="academy"
        crumbs={[{ label: "Academy", href: "/academy" }, { label: course.title }]}
      />
      <CourseDetail course={course} />
    </>
  );
}
