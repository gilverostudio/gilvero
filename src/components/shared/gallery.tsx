"use client";

import Image from "next/image";
import { useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { type GalleryImage } from "@/components/shared/gallery-items";
import { focalStyle } from "@/lib/images";
import { cn } from "@/lib/utils";

export type { GalleryImage, GalleryItem } from "@/components/shared/gallery-items";

type GalleryProps = {
  items: GalleryImage[];
  className?: string;
};

/** Masonry-style gallery grid with a lightbox. Every 5th tile spans 2×2. */
function Gallery({ items, className }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((item, index) => (
          <button
            key={`${item.image.src}-${index}`}
            onClick={() => setActive(index)}
            data-theme="dark"
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-3xl border border-border/60",
              index % 5 === 0 && "lg:col-span-2 lg:row-span-2",
            )}
          >
            <Image
              src={item.image.src}
              alt={item.image.alt || item.caption}
              width={item.image.width}
              height={item.image.height}
              sizes="(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 100vw"
              style={focalStyle(item.image)}
              className="aspect-[4/5] size-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
            <span className="absolute bottom-5 left-5 text-left font-display text-sm tracking-wide text-foreground">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-5xl border-border/60 bg-card/95 p-2 backdrop-blur-xl">
          <DialogTitle className="sr-only">Gallery image</DialogTitle>
          {active === null ? null : (
            <Image
              src={items[active].image.src}
              alt={items[active].image.alt || items[active].caption}
              width={items[active].image.width}
              height={items[active].image.height}
              sizes="(min-width: 1024px) 64rem, 100vw"
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export { Gallery };
