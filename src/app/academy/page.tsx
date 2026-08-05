import type { Metadata } from "next";
import Link from "next/link";

import { AcademyHighlights } from "@/components/sections/academy/academy-highlights";
import { CourseGrid } from "@/components/sections/academy/course-grid";
import { StudentOutcomes } from "@/components/sections/academy/student-outcomes";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Gilvero Academy — Photography, Film & Design Courses",
  description:
    "A professional creative institute: photography, cinematography, editing, design, drone and freelancing courses with certification and placement support.",
};

const educationalOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Gilvero Academy",
  description: "Professional creative education in photography, film and design.",
};

export default function AcademyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrganizationSchema) }}
      />
      <PageHeader
        eyebrow="Gilvero Academy"
        title="Learn the craft inside a working studio."
        copy="Small cohorts, real client briefs, industry trainers and a graded portfolio review at the end of every course."
        image="academy"
        crumbs={[{ label: "Academy" }]}
        actions={
          <>
            <Button asChild variant="gold" size="lg">
              <Link href="/academy">Enroll Now</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <Link href="/contact">Talk to an Advisor</Link>
            </Button>
          </>
        }
      />
      <AcademyHighlights />
      <CourseGrid />
      <StudentOutcomes />
      <CtaBand
        title="Applications for the next cohort are open."
        copy="Send an application and our academy team will call you within one working day."
        primary={{ label: "Enroll Now", href: "/academy/photography-mastery" }}
        secondary={{ label: "Contact Academy", href: "/contact" }}
      />
    </>
  );
}
