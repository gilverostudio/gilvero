import "server-only";

import { cache } from "react";

import * as storeStatic from "@/content/store";
import { CMS_TAGS, cmsSelect } from "@/lib/cms";
import { getMediaMap, getSections, imageFrom } from "@/lib/data/site";
import { staticImage, type SiteImage } from "@/lib/images";

export type StoreContent = {
  products: { name: string; from: string; note: string; image: SiteImage }[];
  sizes: string[];
  papers: string[];
  frames: { name: string; note: string }[];
  defaultSize: string;
  productsHeading: { eyebrow: string; title: string; addToBasketLabel: string };
  configurator: { eyebrow: string; title: string; copy: string; size: string; paper: string; frame: string; checkoutLabel: string };
  upload: { title: string; copy: string; action: string };
  tracking: { eyebrow: string; title: string; steps: string[]; note: string; noteLinkLabel: string };
  toasts: { shopNow: string; addToBasket: string; chooseFile: string; checkout: string };
};

const STATIC: StoreContent = {
  products: storeStatic.storeProducts.map((p) => ({ ...p, image: staticImage("store", p.name) })),
  sizes: [...storeStatic.printSizes],
  papers: [...storeStatic.paperTypes],
  frames: storeStatic.frameTypes,
  defaultSize: storeStatic.defaultPrintSize,
  productsHeading: { ...storeStatic.productsHeading, addToBasketLabel: "Add to Basket" },
  configurator: { ...storeStatic.configuratorHeading, size: "Size", paper: "Paper", frame: "Frame", checkoutLabel: "Checkout" },
  upload: storeStatic.uploadPanel,
  tracking: {
    ...storeStatic.trackingHeading,
    steps: [...storeStatic.trackingSteps],
    note: "Existing customers can track live status inside the",
    noteLinkLabel: "Client Area",
  },
  toasts: { ...storeStatic.storeToasts, addToBasket: "{name} added to basket" },
};

type Json = Record<string, unknown>;
const merge = <T extends object>(base: T, value: unknown): T => {
  const patch = Object.fromEntries(Object.entries((value ?? {}) as Json).filter(([, v]) => v !== "" && v != null));
  return { ...base, ...patch } as T;
};

export const getStore = cache(async (): Promise<StoreContent> => {
  const [products, options, sections, media] = await Promise.all([
    cmsSelect<{ name: string; price_from: string; note: string; image_id: string | null }>(
      "store_products?select=name,price_from,note,image_id&is_visible=is.true&order=sort_order.asc",
      [CMS_TAGS.site],
    ),
    cmsSelect<{ kind: "size" | "paper" | "frame"; name: string; note: string; is_default: boolean }>(
      "print_options?select=kind,name,note,is_default&order=sort_order.asc",
      [CMS_TAGS.site],
    ),
    getSections(),
    getMediaMap(),
  ]);
  if (!products || !options || !sections) return STATIC;

  const sizes = options.filter((o) => o.kind === "size");
  return {
    products: products.map((p) => ({ name: p.name, from: p.price_from, note: p.note, image: imageFrom(media, p.image_id, p.name, "store") })),
    sizes: sizes.map((o) => o.name),
    papers: options.filter((o) => o.kind === "paper").map((o) => o.name),
    frames: options.filter((o) => o.kind === "frame").map((o) => ({ name: o.name, note: o.note })),
    defaultSize: sizes.find((o) => o.is_default)?.name ?? sizes[0]?.name ?? "",
    productsHeading: merge(STATIC.productsHeading, sections["store.products"]),
    configurator: merge(STATIC.configurator, sections["store.configurator"]),
    upload: merge(STATIC.upload, sections["store.upload"]),
    tracking: merge(STATIC.tracking, sections["store.tracking"]),
    toasts: merge(STATIC.toasts, sections["store.toasts"]),
  };
});
