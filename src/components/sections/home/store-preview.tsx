import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { storePreview } from "@/content/home";
import { images } from "@/lib/images";

export function StorePreview() {
  return (
    <Section>
      <SectionHeading
        eyebrow={storePreview.eyebrow}
        title={storePreview.title}
        copy={storePreview.copy}
        action={
          <Button asChild variant="quiet" size="lg">
            <Link href="/store">
              Shop Prints <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <Reveal className="overflow-hidden rounded-[2rem] border border-border/60">
        <Image
          src={images.store}
          alt={storePreview.imageAlt}
          width={1600}
          height={1008}
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
