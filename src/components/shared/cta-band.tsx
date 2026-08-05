import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";

type CtaLink = {
  label: string;
  href: string;
};

type CtaBandProps = {
  title?: string;
  copy?: string;
  primary?: CtaLink;
  secondary?: CtaLink;
};

/** Closing call-to-action band shown at the bottom of most pages. */
function CtaBand({
  title = "Let's make something worth keeping.",
  copy = "Tell us about the project. You will hear back from a producer within one working day.",
  primary = { label: "Book a Shoot", href: "/booking" },
  secondary = { label: "Get a Quote", href: "/contact" },
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-charcoal py-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl leading-[1.08] sm:text-5xl">{title}</h2>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg">{copy}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild variant="gold" size="lg">
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
            <Button asChild variant="quiet" size="lg">
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export { CtaBand };
