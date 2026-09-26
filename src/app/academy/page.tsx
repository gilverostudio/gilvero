import { type Metadata } from "next";

import { AcademyHighlights } from "@/components/sections/academy/academy-highlights";
import { CourseGrid } from "@/components/sections/academy/course-grid";
import { StudentOutcomes } from "@/components/sections/academy/student-outcomes";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("academy", pageDefaults["academy"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function AcademyPage() {
  const page = await getThisPage();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "Gilvero Academy",
            description: "Professional creative education in photography, film and design.",
          }),
        }}
      />
      <CmsPageHeader page={page} />
      <AcademyHighlights />
      <CourseGrid />
      <StudentOutcomes />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
