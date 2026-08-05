"use client";

import { useEffect, useState } from "react";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Animates a number from 0 to `target` over `duration` ms once `start` is true.
 * Used for the animated statistics counters.
 */
export function useCounter(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    const begin = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      setValue(Math.round(EASE_OUT(progress) * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}
