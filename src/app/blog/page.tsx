import { type Metadata } from "next";

import { PostGrid } from "@/components/sections/blog/post-grid";
import { Section } from "@/components/shared/section";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";
import { getJournal } from "@/lib/data/pages";

const getThisPage = () => getPage("blog", pageDefaults["blog"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function BlogPage() {
  const [page, { categories, posts }] = await Promise.all([getThisPage(), getJournal()]);

  return (
    <>
      <CmsPageHeader page={page} />
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
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
