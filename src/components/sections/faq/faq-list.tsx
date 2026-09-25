import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaq } from "@/lib/data/pages";

async function FaqList() {
  const { groups: faqGroups } = await getFaq();

  return (
    <Section>
      <div className="mx-auto max-w-3xl space-y-14">
        {faqGroups.map((group, groupIndex) => (
          <Reveal key={group.topic} delay={groupIndex * 70}>
            <p className="font-display text-xs tracking-[0.28em] text-primary uppercase">
              {group.topic}
            </p>
            <Accordion type="single" collapsible className="mt-4">
              {group.items.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { FaqList };
