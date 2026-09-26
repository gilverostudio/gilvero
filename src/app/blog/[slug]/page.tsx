import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/sections/blog/post-body";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { Section } from "@/components/shared/section";
import { pageDefaults } from "@/content/pages";
import { fillTemplate, getPage } from "@/lib/data/page-meta";
import { getJournal, getPost } from "@/lib/data/pages";
import { getSections } from "@/lib/data/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const getTemplate = () => getPage("blog-detail", pageDefaults["blog-detail"]);

export async function generateStaticParams() {
  const { posts } = await getJournal();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, page] = await Promise.all([getPost(slug), getTemplate()]);
  if (!post) return {};
  const vars = { title: post.title, excerpt: post.excerpt, category: post.category };
  return {
    title: post.seoTitle || fillTemplate(page.seoTitle, vars),
    description: post.seoDescription || fillTemplate(page.seoDescription, vars),
    openGraph: { images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height }] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, page, sections] = await Promise.all([getPost(slug), getTemplate(), getSections()]);
  if (!post) notFound();
  const detail = (sections?.["blog.detail"] ?? {}) as { allLabel?: string; academyLabel?: string };

  return (
    <>
      <CmsPageHeader
        page={{ ...page, header: { ...page.header, image: post.cover } }}
        parents={[{ label: page.header.crumb || "Journal", href: "/blog" }]}
        eyebrow={`${post.category} · ${post.date} · ${post.read}`}
        title={post.title}
        copy={post.excerpt}
        actions={null}
      />
      <Section>
        <PostBody
          body={post.body}
          labels={{
            allLabel: detail.allLabel || "All articles",
            academyLabel: detail.academyLabel || "Learn this at the Academy",
          }}
        />
      </Section>
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
