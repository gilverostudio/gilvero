"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { storeHeader, storeToasts } from "@/content/store";

function ShopNowButton() {
  return (
    <Button variant="gold" size="lg" onClick={() => toast.info(storeToasts.shopNow)}>
      {storeHeader.action}
    </Button>
  );
}

export { ShopNowButton };
