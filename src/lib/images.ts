/** Central registry of site imagery. Swap paths here to update visuals site-wide. */
export const images = {
  hero: "/images/hero.jpg",
  wedding: "/images/work-wedding.jpg",
  product: "/images/work-product.jpg",
  architecture: "/images/work-architecture.jpg",
  fashion: "/images/work-fashion.jpg",
  academy: "/images/academy.jpg",
  store: "/images/store.jpg",
  studio: "/images/studio.jpg",
} as const;

export type ImageKey = keyof typeof images;

/** Intrinsic dimensions of the bundled JPGs (for next/image). */
export const imageDimensions: Record<ImageKey, { width: number; height: number }> = {
  hero: { width: 1920, height: 1088 },
  wedding: { width: 1200, height: 1504 },
  product: { width: 1200, height: 1504 },
  architecture: { width: 1200, height: 1504 },
  fashion: { width: 1200, height: 1504 },
  academy: { width: 1600, height: 1008 },
  store: { width: 1600, height: 1008 },
  studio: { width: 1600, height: 1200 },
};

/**
 * An image ready for next/image — either a bundled file or one from the CMS
 * media library. `focalX`/`focalY` (0–1) keep the subject in frame when cropped.
 */
export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  focalX: number;
  focalY: number;
};

export function staticImage(key: ImageKey, alt = ""): SiteImage {
  return { src: images[key], ...imageDimensions[key], alt, focalX: 0.5, focalY: 0.5 };
}

/** `object-position` style for an image's focal point. */
export function focalStyle(image: Pick<SiteImage, "focalX" | "focalY">) {
  return { objectPosition: `${image.focalX * 100}% ${image.focalY * 100}%` };
}
