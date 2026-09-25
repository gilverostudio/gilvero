"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/shared/reveal";
import { type JournalPost } from "@/lib/data/pages";
import { focalStyle } from "@/lib/images";
import { cn } from "@/lib/utils";

/** Category filter chips plus the filtered journal card grid. */
type PostCard = Pick<JournalPost, "slug" | "title" | "category" | "date" | "read" | "excerpt" | "cover">;

function PostGrid({ categories, posts }: { categories: string[]; posts: PostCard[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const visiblePosts =
    activeCategory === "All" ? posts : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-5 py-2 text-xs transition-all",
              activeCategory === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/40"
            >
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={focalStyle(post.cover)}
                className="aspect-[16/10] w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-95"
              />
              <div className="flex flex-1 flex-col p-7">
                <p className="text-[0.7rem] tracking-[0.2em] text-primary uppercase">
                  {post.category}
                </p>
                <h2 className="mt-3 text-xl leading-snug transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {post.date} · {post.read}
                  </span>
                  <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}

export { PostGrid };
