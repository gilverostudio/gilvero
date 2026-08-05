import { type Metadata } from "next";

import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { FaqList } from "@/components/sections/faq/faq-list";
import { faqHeader } from "@/content/faq";

export const metadata: Metadata = {
  title: "FAQ — Studio, Academy & Print Questions | Gilvero",
  description:
    "Answers to the questions we hear most — engagement pricing, travel, delivery timelines, RAW files, Academy courses, certificates, print orders and client galleries.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow={faqHeader.eyebrow}
        title={faqHeader.title}
        copy={faqHeader.copy}
        image="studio"
        crumbs={[{ label: "FAQ" }]}
      />
      <FaqList />
      <CtaBand
        title="Still weighing something up?"
        copy="If your question isn't answered here, a producer will answer it directly — usually within one working day."
        primary={{ label: "Book a Shoot", href: "/booking" }}
        secondary={{ label: "Ask the Studio", href: "/contact" }}
      />
    </>
  );
}
