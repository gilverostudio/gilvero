import { staticImage, type ImageKey, type SiteImage } from "@/lib/images";

/** Gallery entry that references a bundled image (used by static content). */
export type GalleryItem = {
  key: ImageKey;
  caption: string;
};

export type GalleryImage = {
  image: SiteImage;
  caption: string;
};

export function toGalleryImages(items: GalleryItem[]): GalleryImage[] {
  return items.map((item) => ({ image: staticImage(item.key, item.caption), caption: item.caption }));
}
