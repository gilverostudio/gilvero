"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";

/**
 * next/image that resolves from a soft blur once loaded (styles in globals.css).
 * Only photos still loading after hydration animate; anything already decoded —
 * or rendered without JavaScript — shows immediately.
 */
function FadeImage({ alt, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState<boolean | null>(null);

  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && !img.complete) setLoaded(false);
  }, []);

  return (
    <Image
      {...props}
      alt={alt}
      ref={ref}
      data-loaded={loaded ?? undefined}
      onLoad={(event) => {
        setLoaded((was) => (was === false ? true : was));
        onLoad?.(event);
      }}
    />
  );
}

export { FadeImage };
