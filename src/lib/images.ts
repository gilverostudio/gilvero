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
