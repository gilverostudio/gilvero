import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CourseDetail } from "@/components/sections/academy/course-detail";
import { PageHeader } from "@/components/shared/page-header";
import { getAcademy } from "@/lib/data/pages";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { courses } = await getAcademy();
  return courses.map((course) => ({ slug: course.slug }));
}

async function getCourse(slug: string) {
  return (await getAcademy()).courses.find((course) => course.slug === slug);
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} — Gilvero Academy`,
    description: course.summary,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const [course, { detail }] = await Promise.all([getCourse(slug), getAcademy()]);
  if (!course) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${course.level} · ${course.duration}`}
        title={course.title}
        copy={course.summary}
        image={course.cover ?? "academy"}
        crumbs={[{ label: "Academy", href: "/academy" }, { label: course.title }]}
      />
      <CourseDetail course={course} detail={detail} />
    </>
  );
}
