"use client";

import { createElement, type ElementType, type ReactNode } from "react";

import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fades content up (with a subtle blur) the first time it scrolls into view.
 * Matches the site-wide luxury reveal transition.
 */
function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>({
    threshold: 0.12,
    rootMargin: "0px 0px -8% 0px",
  });

  return createElement(
    as,
    {
      ref,
      style: { transitionDelay: `${delay}ms` },
      className: cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        inView ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-[2px]",
        className,
      ),
    },
    children,
  );
}

export { Reveal };
