"use client";

import { Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { type StoreContent } from "@/lib/data/store";

function UploadPanel({ copy, toastMessage }: { copy: StoreContent["upload"]; toastMessage: string }) {
  return (
    <div className="glass flex h-full flex-col items-center justify-center rounded-[1.75rem] p-12 text-center">
      <Upload className="size-7 text-primary" />
      <p className="mt-6 font-display text-lg">{copy.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{copy.copy}</p>
      <Button variant="gold" size="lg" className="mt-8" onClick={() => toast.info(toastMessage)}>
        {copy.action}
      </Button>
    </div>
  );
}

export { UploadPanel };
