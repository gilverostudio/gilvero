import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Site-wide content container: 1320px max width with responsive gutters. */
function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8", className)}
      {...props}
    />
  );
}

export { Container };
