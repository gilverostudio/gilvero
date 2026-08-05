import { type ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  /** Optional action (e.g. a button) rendered to the right on large screens. */
  action?: ReactNode;
};

/** Eyebrow + headline + optional copy block that opens most sections. */
function SectionHeading({ eyebrow, title, copy, align = "left", action }: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-6 pb-12 sm:pb-16",
        align === "center" && "items-center text-center",
        action && "lg:flex-row lg:items-end lg:justify-between",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-4 text-3xl leading-[1.06] sm:text-5xl lg:text-[3.5rem]">{title}</h2>
        {copy ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {copy}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

export { SectionHeading };
