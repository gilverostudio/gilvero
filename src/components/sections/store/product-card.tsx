"use client";

import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { storeToasts, type StoreProduct } from "@/content/store";
import { images } from "@/lib/images";

function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <div className="group overflow-hidden rounded-[1.5rem] border border-border/60 bg-card/40">
      <Image
        src={images.store}
        alt={product.name}
        width={1600}
        height={1008}
        className="aspect-[16/10] w-full object-cover opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="p-6">
        <h3 className="text-lg">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{product.note}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm text-primary">{product.from}</span>
          <Button
            variant="quiet"
            size="sm"
            onClick={() => toast.success(storeToasts.addToBasket(product.name))}
          >
            Add to Basket
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };
