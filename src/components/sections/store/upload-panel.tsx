"use client";

import { Upload } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { storeToasts, uploadPanel } from "@/content/store";

function UploadPanel() {
  return (
    <div className="glass flex h-full flex-col items-center justify-center rounded-[1.75rem] p-12 text-center">
      <Upload className="size-7 text-primary" />
      <p className="mt-6 font-display text-lg">{uploadPanel.title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{uploadPanel.copy}</p>
      <Button
        variant="gold"
        size="lg"
        className="mt-8"
        onClick={() => toast.info(storeToasts.chooseFile)}
      >
        {uploadPanel.action}
      </Button>
    </div>
  );
}

export { UploadPanel };
