import { type Metadata } from "next";

import { ClientsSection } from "@/components/sections/about/clients-section";
import { FounderSection } from "@/components/sections/about/founder-section";
import { StorySection } from "@/components/sections/about/story-section";
import { StudioTourSection } from "@/components/sections/about/studio-tour-section";
import { TeamSection } from "@/components/sections/about/team-section";
import { TimelineSection } from "@/components/sections/about/timeline-section";
import { ValuesSection } from "@/components/sections/about/values-section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";

const getThisPage = () => getPage("about", pageDefaults["about"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function AboutPage() {
  const page = await getThisPage();

  return (
    <>
      <CmsPageHeader page={page} />
      <StorySection />
      <ValuesSection />
      <FounderSection />
      <TeamSection />
      <StudioTourSection />
      <TimelineSection />
      <ClientsSection />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
