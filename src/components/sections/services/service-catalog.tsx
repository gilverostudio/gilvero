import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceCategories } from "@/content/services";

function ServiceCatalog() {
  return (
    <Section>
      <Tabs defaultValue={serviceCategories[0].id}>
        <TabsList className="mb-12 h-auto flex-wrap gap-2 rounded-full border border-border/60 bg-card/50 p-2">
          {serviceCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="rounded-full px-6 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {serviceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <SectionHeading eyebrow={category.title} title={category.title} copy={category.intro} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <Reveal key={item} delay={Math.min(index * 25, 300)}>
                  <Link
                    href="/booking"
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card/40 px-6 py-5 transition-all hover:-translate-y-0.5 hover:border-primary/50"
                  >
                    <span className="text-sm text-foreground/85 group-hover:text-primary">
                      {item}
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-primary/60 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}

export { ServiceCatalog };
