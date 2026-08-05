"use client";

import { useCounter } from "@/hooks/use-counter";
import { useInView } from "@/hooks/use-in-view";

type StatCounterProps = {
  value: number;
  suffix?: string;
};

/** Counts up from 0 once the stat scrolls into view. */
export function StatCounter({ value, suffix = "" }: StatCounterProps) {
  const [ref, inView] = useInView<HTMLSpanElement>();
  const current = useCounter(value, inView);

  return (
    <span ref={ref}>
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}
