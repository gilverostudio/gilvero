"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { type StoreContent } from "@/lib/data/store";
import { usePrintConfigurator } from "@/hooks/use-print-configurator";
import { cn } from "@/lib/utils";

type PrintConfiguratorProps = {
  sizes: string[];
  papers: string[];
  frames: { name: string; note: string }[];
  defaultSize: string;
  labels: StoreContent["configurator"];
  checkoutToast: string;
};

function PrintConfigurator({ sizes: printSizes, papers: paperTypes, frames: frameTypes, defaultSize, labels, checkoutToast }: PrintConfiguratorProps) {
  const { size, setSize, paper, setPaper, frame, setFrame, summary } = usePrintConfigurator({
    defaultSize,
    papers: paperTypes,
    frames: frameTypes,
  });

  return (
    <div className="rounded-[1.75rem] border border-border/60 bg-background/40 p-8">
      <p className="eyebrow">{labels.size}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {printSizes.map((option) => (
          <button
            key={option}
            onClick={() => setSize(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs transition-all",
              size === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="eyebrow mt-9">{labels.paper}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {paperTypes.map((option) => (
          <button
            key={option}
            onClick={() => setPaper(option)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs transition-all",
              paper === option
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="eyebrow mt-9">{labels.frame}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {frameTypes.map((option) => (
          <button
            key={option.name}
            onClick={() => setFrame(option.name)}
            className={cn(
              "flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all",
              frame === option.name
                ? "border-primary/60 bg-primary/10"
                : "border-border/60 hover:border-primary/40",
            )}
          >
            <span>
              <span className="block text-sm text-foreground/90">{option.name}</span>
              <span className="block text-xs text-muted-foreground">{option.note}</span>
            </span>
            {frame === option.name ? <Check className="size-4 text-primary" /> : null}
          </button>
        ))}
      </div>
      <div className="mt-9 flex flex-col gap-4 border-t border-border/60 pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">{summary}</p>
        <Button variant="gold" size="lg" onClick={() => toast.success(checkoutToast)}>
          {labels.checkoutLabel}
        </Button>
      </div>
    </div>
  );
}

export { PrintConfigurator };
