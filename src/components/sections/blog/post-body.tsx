import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { type ArticleBlock } from "@/lib/data/pages";
import { focalStyle } from "@/lib/images";

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
    case "image":
      return (
        <figure className="py-4">
          <Image
            src={block.image.src}
            alt={block.image.alt || block.caption}
            width={block.image.width}
            height={block.image.height}
            sizes="(min-width: 768px) 48rem, 100vw"
            style={focalStyle(block.image)}
            className="w-full rounded-[1.5rem] border border-border/60 object-cover"
          />
          {block.caption ? (
            <figcaption className="mt-3 text-center text-xs text-muted-foreground">{block.caption}</figcaption>
          ) : null}
        </figure>
      );
    default:
      return <p>{block.text}</p>;
  }
}

type PostBodyProps = {
  body: ArticleBlock[];
  labels: { allLabel: string; academyLabel: string };
};

/** Journal article body with the closing link row. */
function PostBody({ body, labels }: PostBodyProps) {
  return (
    <>
      <article className="mx-auto max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
        {body.map((block, index) => (
          <ArticleBlockView key={index} block={block} />
        ))}
      </article>
      <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-3 border-t border-border/60 pt-10">
        <Button asChild variant="quiet">
          <Link href="/blog">{labels.allLabel}</Link>
        </Button>
        <Button asChild variant="gold">
          <Link href="/academy">{labels.academyLabel}</Link>
        </Button>
      </div>
    </>
  );
}

export { PostBody };
