import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqPreview, journalPreview } from "@/content/home";

export function JournalFaq() {
  return (
    <Section className="border-t border-border/60 bg-charcoal">
      <div className="grid gap-16 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Journal</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Latest writing</h2>
          <ul className="mt-9 space-y-2">
            {journalPreview.map((post, index) => (
              <Reveal key={post.slug} as="li" delay={index * 70}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6 border-b border-border/50 py-5"
                >
                  <div>
                    <p className="text-[0.7rem] tracking-[0.2em] text-primary uppercase">
                      {post.category}
                    </p>
                    <p className="mt-2 font-display text-lg transition-colors group-hover:text-primary">
                      {post.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {post.date} · {post.read}
                    </p>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="mt-6 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Questions</p>
          <h2 className="mt-4 text-3xl sm:text-4xl">Before you enquire</h2>
          <Accordion type="single" collapsible className="mt-9">
            {faqPreview.map((item) => (
              <AccordionItem key={item.question} value={item.question} className="border-border/50">
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button asChild variant="quiet" size="lg" className="mt-8">
            <Link href="/faq">All FAQs</Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
