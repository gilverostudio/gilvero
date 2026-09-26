import { type Metadata } from "next";

import { ConfigurePrint } from "@/components/sections/store/configure-print";
import { OrderTracking } from "@/components/sections/store/order-tracking";
import { ShopNowButton } from "@/components/sections/store/shop-now-button";
import { StoreProducts } from "@/components/sections/store/store-products";
import { CmsPageHeader } from "@/components/shared/cms-page-header";
import { CtaBand } from "@/components/shared/cta-band";
import { pageDefaults } from "@/content/pages";
import { getPage, pageMetadata } from "@/lib/data/page-meta";
import { getStore } from "@/lib/data/store";

const getThisPage = () => getPage("store", pageDefaults["store"]);

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(await getThisPage());
}

export default async function StorePage() {
  const [page, store] = await Promise.all([getThisPage(), getStore()]);

  return (
    <>
      <CmsPageHeader
        page={page}
        actions={page.header.actionLabel ? <ShopNowButton label={page.header.actionLabel} toast={store.toasts.shopNow} /> : null}
      />
      <StoreProducts />
      <ConfigurePrint />
      <OrderTracking />
      {page.cta ? <CtaBand {...page.cta} /> : null}
    </>
  );
}
