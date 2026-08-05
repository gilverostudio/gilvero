import { type Metadata } from "next";

import { ClientsSection } from "@/components/sections/about/clients-section";
import { FounderSection } from "@/components/sections/about/founder-section";
import { StorySection } from "@/components/sections/about/story-section";
import { StudioTourSection } from "@/components/sections/about/studio-tour-section";
import { TeamSection } from "@/components/sections/about/team-section";
import { TimelineSection } from "@/components/sections/about/timeline-section";
import { ValuesSection } from "@/components/sections/about/values-section";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { aboutHeader } from "@/content/about";

export const metadata: Metadata = {
  title: "About Gilvero — Creative Media House in Lahore",
  description:
    "The story, team, studio and equipment behind Gilvero — a premium creative media company built on craft, restraint and repeat clients.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={aboutHeader.eyebrow}
        title={aboutHeader.title}
        copy={aboutHeader.copy}
        image="studio"
        crumbs={[{ label: aboutHeader.crumbLabel }]}
      />
      <StorySection />
      <ValuesSection />
      <FounderSection />
      <TeamSection />
      <StudioTourSection />
      <TimelineSection />
      <ClientsSection />
      <CtaBand title="Work with the studio." />
    </>
  );
}
