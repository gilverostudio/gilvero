"use client";

import { useState } from "react";

import {
  defaultPrintSize,
  frameTypes,
  paperTypes,
  type PaperType,
  type PrintSize,
} from "@/content/store";

/**
 * State for the print configurator: selected size, paper and frame,
 * mirroring the original page (size defaults to 8×10, paper to the first
 * stock, frame to Wood). The summary line is derived from the selections.
 */
export function usePrintConfigurator() {
  const [size, setSize] = useState<PrintSize>(defaultPrintSize);
  const [paper, setPaper] = useState<PaperType>(paperTypes[0]);
  const [frame, setFrame] = useState<string>(frameTypes[0].name);

  const summary = `${size} · ${paper} · ${frame} frame`;

  return { size, setSize, paper, setPaper, frame, setFrame, summary };
}
