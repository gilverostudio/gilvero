import { ProductCard } from "@/components/sections/store/product-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { getStore } from "@/lib/data/store";

async function StoreProducts() {
  const { products, productsHeading, toasts } = await getStore();
  if (!products.length) return null;

  return (
    <Section>
      <SectionHeading eyebrow={productsHeading.eyebrow} title={productsHeading.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <Reveal key={`${product.name}-${index}`} delay={index * 60}>
            <ProductCard
              product={product}
              buttonLabel={productsHeading.addToBasketLabel}
              toastMessage={toasts.addToBasket.replace("{name}", product.name)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { StoreProducts };
