"use client";

import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useTransition, type FormEvent } from "react";
import { toast } from "sonner";

import { submitForm } from "@/app/actions/forms";
import { Honeypot } from "@/components/shared/honeypot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const labelClassName =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";
const inputClassName = "h-9 rounded-xl border-input bg-background/50";

export type ApplyCopy = { eyebrow: string; title: string; toast: string; backLabel: string };

/** Course application — saved to the studio inbox with the course it was sent from. */
function ApplyForm({ course, copy }: { course: string; copy: ApplyCopy }) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "");
    startTransition(async () => {
      const result = await submitForm("academy", {
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        message: get("message"),
        course,
        company: get("company"),
      });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success(copy.toast);
      form.reset();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="glass relative space-y-5 rounded-[1.75rem] p-8">
      <Honeypot />
      <div>
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2 className="mt-3 text-xl">{copy.title}</h2>
      </div>
      <div className="space-y-2">
        <label htmlFor="name" className={labelClassName}>
          Full name
        </label>
        <Input id="name" name="name" autoComplete="name" required maxLength={200} className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="phone" className={labelClassName}>
          Phone
        </label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={60} className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className={labelClassName}>
          Email
        </label>
        <Input id="email" name="email" type="email" autoComplete="email" required maxLength={200} className={inputClassName} />
      </div>
      <div className="space-y-2">
        <label htmlFor="msg" className={labelClassName}>
          Anything we should know?
        </label>
        <Textarea id="msg" name="message" rows={3} maxLength={3000} className="rounded-xl bg-background/50" />
      </div>
      <Button type="submit" variant="gold" size="lg" className="w-full" disabled={pending}>
        {pending ? <LoaderCircle className="animate-spin" /> : null}
        Submit Application
      </Button>
      <Button asChild variant="quiet" size="lg" className="w-full">
        <Link href="/academy">{copy.backLabel}</Link>
      </Button>
    </form>
  );
}

export { ApplyForm };
