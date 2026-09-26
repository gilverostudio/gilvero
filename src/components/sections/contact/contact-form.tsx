"use client";

import { LoaderCircle } from "lucide-react";
import { useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { submitForm } from "@/app/actions/forms";
import { Honeypot } from "@/components/shared/honeypot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ContactCopy } from "@/lib/data/forms-copy";

/** Enquiry form — saved to the studio inbox. */
function ContactForm({ whatsapp, copy: contactForm }: { whatsapp: string; copy: ContactCopy["form"] }) {
  const [pending, startTransition] = useTransition();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");
    startTransition(async () => {
      const result = await submitForm("contact", {
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        message: get("message"),
        company: get("company"),
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(contactForm.toastMessage);
      form.reset();
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[1.75rem] border border-border/60 bg-card/40 p-8 sm:p-10"
    >
      <Honeypot />
      <p className="eyebrow">{contactForm.eyebrow}</p>
      <h2 className="mt-3 text-2xl">{contactForm.title}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">{contactForm.fields.name}</Label>
          <Input id="c-name" name="name" autoComplete="name" required maxLength={200} className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-phone">{contactForm.fields.phone}</Label>
          <Input id="c-phone" name="phone" type="tel" autoComplete="tel" required maxLength={60} className="h-9 rounded-xl border-input bg-background/50" />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="c-email">{contactForm.fields.email}</Label>
          <Input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={200}
            className="h-9 rounded-xl border-input bg-background/50"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="c-msg">{contactForm.fields.message}</Label>
          <Textarea id="c-msg" name="message" rows={5} required maxLength={5000} className="rounded-xl bg-background/50" />
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="submit" variant="gold" size="lg" disabled={pending}>
          {pending ? <LoaderCircle className="animate-spin" /> : null}
          {contactForm.submitLabel}
        </Button>
        <Button asChild variant="quiet" size="lg">
          <a href={whatsapp} target="_blank" rel="noreferrer">
            {contactForm.whatsappLabel}
          </a>
        </Button>
      </div>
    </form>
  );
}

export { ContactForm };
