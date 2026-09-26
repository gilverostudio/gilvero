"use client";

import { useState } from "react";

/**
 * State for the print configurator: selected size, paper and frame. Starts on
 * the default size (set in the admin), the first paper and the first frame.
 */
export function usePrintConfigurator(options: { defaultSize: string; papers: string[]; frames: { name: string }[] }) {
  const [size, setSize] = useState(options.defaultSize);
  const [paper, setPaper] = useState(options.papers[0] ?? "");
  const [frame, setFrame] = useState(options.frames[0]?.name ?? "");

  const summary = [size, paper, frame ? `${frame} frame` : ""].filter(Boolean).join(" · ");

  return { size, setSize, paper, setPaper, frame, setFrame, summary };
}
