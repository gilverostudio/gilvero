"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

function ShopNowButton({ label, toast: message }: { label: string; toast: string }) {
  return (
    <Button variant="gold" size="lg" onClick={() => toast.info(message)}>
      {label}
    </Button>
  );
}

export { ShopNowButton };
