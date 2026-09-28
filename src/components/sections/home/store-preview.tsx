import { ArrowRight } from "lucide-react";
import { FadeImage as Image } from "@/components/shared/fade-image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { type HomeContent } from "@/lib/data/home";
import { focalStyle } from "@/lib/images";

export function StorePreview({ store: storePreview }: { store: HomeContent["store"] }) {
  return (
    <Section>
      <SectionHeading
        eyebrow={storePreview.eyebrow}
        title={storePreview.title}
        copy={storePreview.copy}
        action={
          <Button asChild variant="quiet" size="lg">
            <Link href="/store">
              {storePreview.linkLabel} <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <Reveal className="overflow-hidden rounded-[2rem] border border-border/60">
        <Image
          src={storePreview.image.src}
          alt={storePreview.image.alt}
          width={storePreview.image.width}
          height={storePreview.image.height}
          sizes="(min-width: 1320px) 1320px, 100vw"
          style={focalStyle(storePreview.image)}
          loading="lazy"
          className="size-full object-cover"
        />
      </Reveal>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {storePreview.products.map((product, index) => (
          <Reveal key={product.name} delay={index * 70}>
            <div className="glass flex items-center justify-between rounded-2xl px-6 py-5">
              <span className="font-display text-sm">{product.name}</span>
              <span className="text-xs text-primary">{product.price}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
