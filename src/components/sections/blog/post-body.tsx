import Link from "next/link";

import { Button } from "@/components/ui/button";
import { articleBody, type ArticleBlock } from "@/content/blog";

function ArticleBlockView({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "lead":
      return <p className="text-lg text-foreground/90">{block.text}</p>;
    case "heading":
      return <h2 className="pt-6 text-2xl text-foreground">{block.text}</h2>;
    case "quote":
      return (
        <blockquote className="glass rounded-2xl border-l-2 border-primary p-7 text-foreground/90 italic">
          {block.text}
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
}

/** Journal article body (shared editorial copy) with the closing link row. */
function PostBody() {
  return (
    <>
      <article className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
        {articleBody.map((block, index) => (
          <ArticleBlockView key={index} block={block} />
        ))}
      </article>
      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-3 border-t border-border/60 pt-10">
        <Button asChild variant="quiet">
          <Link href="/blog">All articles</Link>
        </Button>
        <Button asChild variant="gold">
          <Link href="/academy">Learn this at the Academy</Link>
        </Button>
      </div>
    </>
  );
}

export { PostBody };
