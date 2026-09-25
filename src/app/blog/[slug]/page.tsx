import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/sections/blog/post-body";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getJournal, getPost } from "@/lib/data/pages";
import { getSections } from "@/lib/data/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { posts } = await getJournal();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title} — Gilvero Journal`,
    description: post.seoDescription || post.excerpt,
    openGraph: { images: [{ url: post.cover.src, width: post.cover.width, height: post.cover.height }] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, sections] = await Promise.all([getPost(slug), getSections()]);
  if (!post) notFound();
  const detail = (sections?.["blog.detail"] ?? {}) as { allLabel?: string; academyLabel?: string };

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${post.date} · ${post.read}`}
        title={post.title}
        copy={post.excerpt}
        image={post.cover}
        crumbs={[{ label: "Journal", href: "/blog" }, { label: post.title }]}
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
      <CtaBand />
    </>
  );
}
