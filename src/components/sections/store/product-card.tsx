"use client";

import { FadeImage as Image } from "@/components/shared/fade-image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { type StoreContent } from "@/lib/data/store";
import { focalStyle } from "@/lib/images";

type ProductCardProps = {
  product: StoreContent["products"][number];
  buttonLabel: string;
  toastMessage: string;
};

function ProductCard({ product, buttonLabel, toastMessage }: ProductCardProps) {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40 transition-[translate,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-glow)]">
      <Image
        src={product.image.src}
        alt={product.image.alt || product.name}
        width={product.image.width}
        height={product.image.height}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        style={focalStyle(product.image)}
        className="aspect-[16/10] w-full object-cover opacity-70 light:opacity-95 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="p-6">
        <h3 className="text-lg">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.note}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-primary">{product.from}</span>
          <Button variant="quiet" size="sm" onClick={() => toast.success(toastMessage)}>
            {buttonLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
