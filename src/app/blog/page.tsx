import type { Metadata } from "next";

import { PostGrid } from "@/components/sections/blog/post-grid";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getJournal } from "@/lib/data/pages";

export const metadata: Metadata = {
  title: "Journal — Photography, Editing & Creative Business | Gilvero",
  description:
    "Photography tips, camera reviews, editing technique, pricing and creative business writing from the Gilvero studio.",
};

export default async function BlogPage() {
  const { categories, posts } = await getJournal();

  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Notes from inside the studio."
        copy="Technique, gear, pricing and the occasional set diary — written by the people doing the work."
        image="studio"
        crumbs={[{ label: "Journal" }]}
      />
      <Section>
        <PostGrid
          categories={categories}
          posts={posts.map(({ slug, title, category, date, read, excerpt, cover }) => ({
            slug,
            title,
            category,
            date,
            read,
            excerpt,
            cover,
          }))}
        />
      </Section>
      <CtaBand
        title="Want this in your inbox?"
        copy="One considered email a month — technique, gear and studio notes."
        primary={{ label: "Contact the Studio", href: "/contact" }}
        secondary={{ label: "Visit the Academy", href: "/academy" }}
      />
    </>
  );
}
