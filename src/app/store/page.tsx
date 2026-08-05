import { type Metadata } from "next";

import { ConfigurePrint } from "@/components/sections/store/configure-print";
import { OrderTracking } from "@/components/sections/store/order-tracking";
import { ShopNowButton } from "@/components/sections/store/shop-now-button";
import { StoreProducts } from "@/components/sections/store/store-products";
import { CtaBand } from "@/components/shared/cta-band";
import { PageHeader } from "@/components/shared/page-header";
import { storeCta, storeHeader } from "@/content/store";

export const metadata: Metadata = {
  title: "Print Store — Fine Art Prints, Frames & Albums | Gilvero",
  description:
    "Archival photo prints, canvas, acrylic, luxury frames, albums and passport photos. Upload your image, choose size, paper and frame.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow={storeHeader.eyebrow}
        title={storeHeader.title}
        copy={storeHeader.copy}
        image="store"
        crumbs={[{ label: "Print Store" }]}
        actions={<ShopNowButton />}
      />
      <StoreProducts />
      <ConfigurePrint />
      <OrderTracking />
      <CtaBand
        title={storeCta.title}
        copy={storeCta.copy}
        primary={storeCta.primary}
        secondary={storeCta.secondary}
      />
    </>
  );
}
