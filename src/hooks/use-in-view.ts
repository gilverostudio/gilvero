"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseInViewOptions = {
  /** Fraction of the element that must be visible before it counts as in view. */
  threshold?: number;
  rootMargin?: string;
  /** When true (default) the element stays "in view" after the first intersection. */
  once?: boolean;
};

/**
 * Observes an element and reports when it enters the viewport.
 * Drives the scroll-reveal transitions used across the site.
 */
export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
}: UseInViewOptions = {}): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}
