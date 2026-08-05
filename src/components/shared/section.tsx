import { type ReactNode } from "react";

import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Standard page section: generous vertical rhythm wrapped in the site container.
 * Pass `bg-charcoal border-y border-border/60` (etc.) via className for tonal bands.
 */
function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 sm:py-28 lg:py-36", className)}>
      <Container>{children}</Container>
    </section>
  );
}

export { Section };
