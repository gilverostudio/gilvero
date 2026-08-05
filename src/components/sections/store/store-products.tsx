import { ProductCard } from "@/components/sections/store/product-card";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { productsHeading, storeProducts } from "@/content/store";

function StoreProducts() {
  return (
    <Section>
      <SectionHeading eyebrow={productsHeading.eyebrow} title={productsHeading.title} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {storeProducts.map((product, index) => (
          <Reveal key={product.name} delay={index * 60}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { StoreProducts };
