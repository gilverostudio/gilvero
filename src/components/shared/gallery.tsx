"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type TouchEvent } from "react";

import { FadeImage as Image } from "@/components/shared/fade-image";
import { type GalleryImage } from "@/components/shared/gallery-items";
import { focalStyle } from "@/lib/images";
import { cn } from "@/lib/utils";

export type { GalleryImage, GalleryItem } from "@/components/shared/gallery-items";

type GalleryProps = {
  items: GalleryImage[];
  className?: string;
};

const lightboxButton =
  "grid size-12 cursor-pointer place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-md transition-all hover:border-primary/60 hover:text-primary";

/** Masonry-style gallery grid with a full-screen lightbox. Every 5th tile spans 2×2. */
function Gallery({ items, className }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const step = (by: number) => setActive((i) => (i === null ? i : (i + by + items.length) % items.length));

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") step(1);
    if (event.key === "ArrowLeft") step(-1);
  };
  const onTouchStart = (event: TouchEvent) => {
    touchX.current = event.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (event: TouchEvent) => {
    const start = touchX.current;
    const end = event.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start === null || end === undefined || Math.abs(end - start) < 50) return;
    step(end < start ? 1 : -1);
  };

  const current = active === null ? null : items[active];

  return (
    <>
      <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {items.map((item, index) => (
          <button
            key={`${item.image.src}-${index}`}
            onClick={() => setActive(index)}
            aria-label={`Open image: ${item.caption || item.image.alt}`}
            data-theme="dark"
            className={cn(
              "group relative cursor-pointer overflow-hidden rounded-3xl border border-border/60 transition-[border-color,box-shadow] duration-500 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]",
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
            <span className="absolute bottom-5 left-5 translate-y-1 text-left font-display text-sm tracking-wide text-foreground transition-transform duration-500 group-hover:translate-y-0">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      <DialogPrimitive.Root open={current !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <DialogPrimitive.Content
            data-theme="dark"
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-50 flex flex-col outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
          >
            <DialogPrimitive.Title className="sr-only">{current?.caption || "Gallery image"}</DialogPrimitive.Title>
            <DialogPrimitive.Description className="sr-only">
              Use the left and right arrow keys to move between images.
            </DialogPrimitive.Description>

            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="font-display text-xs tracking-[0.3em] text-white/60 tabular-nums">
                {active === null ? "" : `${String(active + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`}
              </p>
              <DialogPrimitive.Close className={lightboxButton} aria-label="Close">
                <X className="size-5" />
              </DialogPrimitive.Close>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
              {current ? (
                <Image
                  key={current.image.src}
                  src={current.image.src}
                  alt={current.image.alt || current.caption}
                  width={current.image.width}
                  height={current.image.height}
                  sizes="100vw"
                  className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain shadow-2xl"
                />
              ) : null}
              {items.length > 1 ? (
                <>
                  <button
                    onClick={() => step(-1)}
                    aria-label="Previous image"
                    className={cn(lightboxButton, "absolute top-1/2 left-4 hidden -translate-y-1/2 sm:grid sm:left-8")}
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Next image"
                    className={cn(lightboxButton, "absolute top-1/2 right-4 hidden -translate-y-1/2 sm:grid sm:right-8")}
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              ) : null}
            </div>

            <p className="min-h-16 px-6 py-5 text-center font-display text-sm tracking-wide text-white/75">
              {current?.caption}
            </p>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}

export { Gallery };
