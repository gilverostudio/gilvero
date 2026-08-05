import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PostBody } from "@/components/sections/blog/post-body";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { getPost, postSlugs } from "@/content/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Gilvero Journal`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${post.date} · ${post.read}`}
        title={post.title}
        copy={post.excerpt}
        image="academy"
        crumbs={[{ label: "Journal", href: "/blog" }, { label: post.title }]}
      />
      <Section>
        <PostBody />
      </Section>
      <CtaBand />
    </>
  );
}
