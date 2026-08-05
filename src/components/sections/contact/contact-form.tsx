"use client";

import { type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactForm } from "@/content/contact";
import { siteConfig } from "@/lib/site-config";

/** Enquiry form — client-side confirmation only, no backend. */
function ContactForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success(contactForm.toastMessage);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.75rem] border border-border/60 bg-card/40 p-8 sm:p-10"
    >
      <p className="eyebrow">{contactForm.eyebrow}</p>
      <h2 className="mt-3 text-2xl">{contactForm.title}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">{contactForm.fields.name}</Label>
          <Input id="c-name" required className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">{contactForm.fields.phone}</Label>
          <Input id="c-phone" required className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="c-email">{contactForm.fields.email}</Label>
          <Input
            id="c-email"
            type="email"
            required
            className="h-9 rounded-xl border-input bg-background/50"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="c-msg">{contactForm.fields.message}</Label>
          <Textarea id="c-msg" rows={5} required className="rounded-xl bg-background/50" />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" variant="gold" size="lg">
          {contactForm.submitLabel}
        </Button>
        <Button asChild variant="quiet" size="lg">
          <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
            {contactForm.whatsappLabel}
          </a>
        </Button>
      </div>
    </form>
  );
}

export { ContactForm };
